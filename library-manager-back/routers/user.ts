import Router from "express";
import { UserRecord } from "../records/user.record";
import { compare } from "bcrypt";
import { UserDto } from "../types";
import { LogRecord } from "../records/logs.record";

export const userRouter = Router();

userRouter
    .post('/login', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        try {
            const { library_card_code, password } = req.body;

            if (!library_card_code || !password) {
                await LogRecord.add(
                    "USER_LOGIN_FAILED",
                    "Missing library card code or password.",
                    userId
                );
                res.status(400).json({
                    status: "error",
                    error: {
                        code: 400,
                        message: "Library card code and password are required.",
                    }
                });
                return;
            }

            const user = await UserRecord.getOneByLibraryCardCode(library_card_code);
            if (!user) {
                await LogRecord.add(
                    "USER_LOGIN_FAILED",
                    `Login attempt failed for non-existing library card code: ${library_card_code}`,
                    userId
                );
                res.status(401).json({
                    status: "error",
                    error: {
                        code: 401,
                        message: "Invalid library card code or password.",
                    }
                });
                return;
            }

            const isPasswordValid = await compare(password, user.password);
            if (!isPasswordValid) {
                await LogRecord.add(
                    "USER_LOGIN_FAILED",
                    `Invalid password attempt for user ID: ${user.id}`,
                    user.id
                );
                res.status(401).json({
                    status: "error",
                    error: {
                        code: 401,
                        message: "Invalid library card code or password.",
                    }
                });
                return;
            }

            await LogRecord.add(
                "USER_LOGIN_SUCCESS",
                `User ID: ${user.id} logged in successfully.`,
                user.id
            );

            res.status(200).json({
                status: "success",
                data: user,
                message: "Login successful."
            });
        } catch (error) {
            await LogRecord.add(
                "USER_LOGIN_ERROR",
                `Error during login process: ${error.message}`,
                userId
            );
            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                }
            });
        }
    })

    .post('/reg', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        try {
            const newUser = new UserRecord(req.body as UserDto);

            const existingUser = await UserRecord.getOneByEmail(newUser.email);
            if (existingUser) {
                await LogRecord.add(
                    "USER_REGISTRATION_FAILED",
                    `Email ${newUser.email} is already registered.`,
                    userId
                );
                res.status(409).json({
                    status: "error",
                    error: {
                        code: 409,
                        message: `Email ${newUser.email} is already registered.`,
                    }
                });
                return;
            }

            await newUser.insert();
            await LogRecord.add(
                "USER_REGISTRATION_SUCCESS",
                `User ${newUser.first_name} ${newUser.last_name} registered successfully.`,
                newUser.id
            );

            res.status(201).json({
                status: "success",
                data: {
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    email: newUser.email,
                    library_card_code: newUser.library_card_code
                },
                message: "User registered successfully."
            });
        } catch (error) {
            await LogRecord.add(
                "USER_REGISTRATION_ERROR",
                `Error during registration process: ${error.message}`,
                userId
            );
            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                }
            });
        }
    })

    .post('/logout', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            if (!userId) {
                await LogRecord.add(
                    "USER_LOGOUT_FAILED",
                    "Logout attempt without user ID.",
                    null
                );
                res.status(400).json({
                    status: "error",
                    error: {
                        code: 400,
                        message: "User ID is required to logout.",
                    }
                });
                return;
            }

            const user = await UserRecord.getOneById(userId);
            if (!user) {
                await LogRecord.add(
                    "USER_LOGOUT_FAILED",
                    `Logout attempt for non-existing user ID: ${userId}`,
                    userId
                );
                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "User not found.",
                    }
                });
                return;
            }

            await LogRecord.add(
                "USER_LOGOUT_SUCCESS",
                `User ID: ${userId} logged out successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                message: "Logout successful."
            });
        } catch (error) {
            await LogRecord.add(
                "USER_LOGOUT_ERROR",
                `Error during logout process: ${error.message}`,
                userId
            );
            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                }
            });
        }
    })

    .delete('/:id', async (req, res) => {
        const userId = req.header('x-user-id') || null;
        try {
            const { id } = req.params;
            const user = await UserRecord.getOneById(id);

            if (!user) {
                await LogRecord.add(
                    "USER_DELETE_FAILED",
                    `Attempted to delete non-existing user with ID: ${id}`,
                    userId
                );
                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "User not found.",
                    }
                });
                return;
            }

            await user.delete();
            await LogRecord.add(
                "USER_DELETE_SUCCESS",
                `User ID: ${id} deleted successfully.`,
                userId
            );

            res.status(200).json({
                status: "success",
                data: `User ${id} deleted`,
                message: "User deleted successfully."
            });
        } catch (error) {
            await LogRecord.add(
                "USER_DELETE_ERROR",
                `Error during user deletion: ${error.message}`,
                userId
            );
            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                }
            });
        }
    });
