import Router from "express";
import { LogRecord } from "../records/logs.record";
import { BookRecord } from "../records/books.record";

export const bookRouter = Router();

bookRouter
    .get('/', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        try {
            const books = await BookRecord.listAll();
            await LogRecord.add(
                "BOOKS_LIST_VIEW",
                "Viewed the list of all books.",
                userId
            );

            res.status(200).json({
                status: "success",
                data: books,
                message: "Fetched list of all books successfully.",
            });
        } catch (error) {
            await LogRecord.add(
                "BOOKS_LIST_ERROR",
                `Error fetching book list: ${error.message}`,
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
            const book = await BookRecord.getOneById(id);

            if (!book) {
                await LogRecord.add(
                    "BOOK_VIEW_FAILED",
                    `Book with ID: ${id} not found.`,
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

            await LogRecord.add(
                "BOOK_VIEW_SUCCESS",
                `Book with ID: ${id} viewed successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: book,
                message: `Book with ID: ${id} fetched successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "BOOK_VIEW_ERROR",
                `Error fetching book with ID ${req.params.id}: ${error.message}`,
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
            const newBook = new BookRecord(req.body);
            await newBook.insert();

            await LogRecord.add(
                "BOOK_ADD_SUCCESS",
                `Book titled "${newBook.title}" added successfully.`,
                userId
            );

            res.status(201).json({
                status: "success",
                data: {
                    id: newBook.id,
                    title: newBook.title,
                    author: newBook.author,
                },
                message: `Book titled "${newBook.title}" added successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "BOOK_ADD_ERROR",
                `Error adding book: ${error.message}`,
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
            const book = await BookRecord.getOneById(id);

            if (!book) {
                await LogRecord.add(
                    "BOOK_DELETE_FAILED",
                    `Attempted to delete non-existing book with ID: ${id}`,
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

            await book.delete();
            await LogRecord.add(
                "BOOK_DELETE_SUCCESS",
                `Book with ID: ${id} deleted successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                message: `Book with ID: ${id} deleted successfully.`,
            });
        } catch (error) {
            await LogRecord.add(
                "BOOK_DELETE_ERROR",
                `Error deleting book with ID ${req.params.id}: ${error.message}`,
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
