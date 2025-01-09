import Router from "express";
import { LogRecord } from "../records/logs.record";
import { RentalRecord } from "../records/rentals.record";

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

    .post('/', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            const newRental = new RentalRecord(req.body);
            await newRental.insert();

            await LogRecord.add(
                "RENTAL_ADD_SUCCESS",
                `User ${userId} created a new rental with ID: ${newRental.id}.`,
                userId
            );

            res.status(201).json({
                status: "success",
                data: {
                    id: newRental.id,
                    ...req.body,
                },
                message: `Rental created successfully with ID: ${newRental.id}.`,
            });
        } catch (error) {
            await LogRecord.add(
                "RENTAL_ADD_ERROR",
                `User ${userId} encountered an error while adding a rental: ${error.message}`,
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
