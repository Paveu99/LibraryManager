import Router from "express";
import { LogRecord } from "../records/logs.record";
import { RentalRecord } from "../records/rentals.record";
import { BookRecord } from "../records/books.record";
import { Rental } from "../types";

export const rentalRouter = Router();

rentalRouter
    .get('/', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const rentals = await RentalRecord.listAll();

            await LogRecord.add(
                "RENTALS_LIST_VIEW",
                `User ${userId} viewed the list of all rentals.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: rentals,
                message: "Fetched list of all rentals successfully.",
            });
        } catch (error) {
            await LogRecord.add(
                "RENTALS_LIST_ERROR",
                `User ${userId} encountered an error while fetching the rental list: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .get('/user', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        const { year, month } = req.query

        try {
            if (!userId) {
                await LogRecord.add(
                    "RENTAL_VIEW_FAILED",
                    `User ${userId} attempted to view rentals.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Non-existing user.",
                    },
                });
                return;
            }

            const rentals = await RentalRecord.listByUser(userId);

            await LogRecord.add(
                "RENTALS_LIST_VIEW",
                `User ${userId} viewed the list of their rentals.`,
                userId
            );

            let filteredData: Rental[] = rentals;

            if (year) {
                filteredData = filteredData.filter(el =>
                    new Date(el.rental_date).getFullYear() === Number(year)
                );
                if (month) {
                    filteredData = filteredData.filter(el =>
                        new Date(el.rental_date).getMonth() + 1 === Number(month)
                    );
                }
            }

            res.status(200).json({
                status: "success",
                data: filteredData.sort((a, b) => {
                    if (a.return_date > b.return_date) {
                        return -1;
                    } else if (a.return_date < b.return_date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }).sort((a, b) => {
                    if (!a.return_date && b.return_date) {
                        return -1;
                    } else if (a.return_date && !b.return_date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }),
                message: "Fetched list of their rentals successfully.",
            });

        } catch (error) {
            await LogRecord.add(
                "RENTALS_LIST_ERROR",
                `User ${userId} encountered an error while fetching the rental list: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .get('/stats', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            if (!userId) {
                await LogRecord.add(
                    "RENTAL_VIEW_FAILED",
                    `User ${userId} attempted to view stats.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Non-existing user.",
                    },
                });
                return;
            }

            const stats = await RentalRecord.getStatsByUserId(userId);

            await LogRecord.add(
                "RENTALS_LIST_VIEW",
                `User ${userId} viewed the list of their rentals.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: stats,
                message: "Fetched list of their rentals successfully.",
            });

        } catch (error) {
            await LogRecord.add(
                "RENTALS_LIST_ERROR",
                `User ${userId} encountered an error while fetching the statistics list: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .get('/user_stats', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        const year = req.query.year ? parseInt(req.query.year as string) : undefined;
        const month = req.query.month ? parseInt(req.query.month as string) : undefined;

        try {
            if (!userId) {
                await LogRecord.add(
                    "RENTAL_VIEW_FAILED",
                    `User ${userId} attempted to view stats.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Non-existing user."
                    }
                });
                return;
            }

            const stats = await RentalRecord.getStatsByUserIdPrecise(userId, year, month);

            await LogRecord.add(
                "RENTALS_LIST_VIEW",
                `User ${userId} viewed the list of their rentals.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: stats,
                message: "Fetched list of rentals successfully."
            });
        } catch (error) {
            await LogRecord.add(
                "RENTALS_LIST_ERROR",
                `User ${userId} encountered an error while fetching the statistics list: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error."
                }
            });
        }
    })

    .get('/:id', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const { id } = req.params;
            const rental = await RentalRecord.getOneById(Number(id));

            if (!rental) {
                await LogRecord.add(
                    "RENTAL_VIEW_FAILED",
                    `User ${userId} attempted to view a non-existing rental with ID: ${id}.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Rental not found.",
                    },
                });
                return;
            }

            await LogRecord.add(
                "RENTAL_VIEW_SUCCESS",
                `User ${userId} viewed rental with ID: ${id} successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: rental,
                message: `Rental with ID: ${id} fetched successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "RENTAL_VIEW_ERROR",
                `User ${userId} encountered an error while fetching rental with ID ${req.params.id}: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .post('/rent', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const { bookId } = req.body;

            const book = await BookRecord.getOneById(bookId);

            if (!book) {
                await LogRecord.add(
                    "BOOK_NOT_FOUND",
                    `User ${userId} tried to rent a non-existing book with ID: ${bookId}.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Book not found.",
                    },
                });
                return;
            }

            if (book.available_copies <= 0) {
                await LogRecord.add(
                    "BOOK_RENT_NO_COPIES",
                    `User ${userId} tried to rent a book with ID: ${bookId}, but no copies are available.`,
                    userId
                );

                res.status(400).json({
                    status: "error",
                    error: {
                        code: 400,
                        message: "No copies available for rent.",
                    },
                });
                return;
            }

            const rental = new RentalRecord({
                user_id: userId,
                book_id: bookId,
                rental_date: new Date().toISOString().split('T')[0],
                return_date: null,
                status: "rented",
            });

            await rental.insert();

            await book.rentBook();

            await LogRecord.add(
                "BOOK_RENT_SUCCESS",
                `User ${userId} successfully rented a book with ID: ${bookId}.`,
                userId
            );

            res.status(201).json({
                status: "success",
                message: `Book with ID ${bookId} rented successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "RENTAL_PROCESS_ERROR",
                `User ${userId} encountered an error during renting: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .post('/return', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const { rentalId } = req.body;

            const rental = await RentalRecord.getOneById(rentalId);

            if (!rental) {
                await LogRecord.add(
                    "RENTAL_RETURN_FAILED",
                    `User ${userId} tried to return a non-existing rental with ID: ${rentalId}.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Rental not found.",
                    },
                });
                return;
            }

            const book = await BookRecord.getOneById(rental.book_id);

            if (!book) {
                await LogRecord.add(
                    "BOOK_NOT_FOUND_ON_RETURN",
                    `User ${userId} tried to return a rental for a non-existing book with ID: ${rental.book_id}.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Book not found.",
                    },
                });
                return;
            }

            await rental.updateStatus("returned");

            await rental.setReturnDate(new Date().toISOString().split('T')[0]);

            await book.returnBook();

            await LogRecord.add(
                "RENTAL_RETURN_SUCCESS",
                `User ${userId} successfully returned a rental with ID: ${rentalId}.`,
                userId
            );

            res.status(200).json({
                status: "success",
                message: `Book with rental ID ${rentalId} returned successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "RETURN_PROCESS_ERROR",
                `User ${userId} encountered an error during return: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })

    .delete('/:id', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const { id } = req.params;
            const rental = await RentalRecord.getOneById(Number(id));

            if (!rental) {
                await LogRecord.add(
                    "RENTAL_DELETE_FAILED",
                    `User ${userId} attempted to delete a non-existing rental with ID: ${id}.`,
                    userId
                );

                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Rental not found.",
                    },
                });
                return;
            }

            await rental.delete();
            await LogRecord.add(
                "RENTAL_DELETE_SUCCESS",
                `User ${userId} deleted rental with ID: ${id} successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                message: `Rental with ID: ${id} deleted successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "RENTAL_DELETE_ERROR",
                `User ${userId} encountered an error while deleting rental with ID ${req.params.id}: ${error.message}`,
                userId
            );

            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    });
