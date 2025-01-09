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
            const { email, password } = req.body;

            if (!email || !password) {
                await LogRecord.add(
                    "USER_LOGIN_FAILED",
                    "Missing email or password.",
                    userId
                );
                res.status(400).json({
                    status: "error",
                    error: {
                        code: 400,
                        message: "Email and password are required.",
                    }
                });
                return;
            }

            const user = await UserRecord.getOneByEmail(email);
            if (!user) {
                await LogRecord.add(
                    "USER_LOGIN_FAILED",
                    `Login attempt failed for non-existing email: ${email}`,
                    userId
                );
                res.status(401).json({
                    status: "error",
                    error: {
                        code: 401,
                        message: "Invalid email or password.",
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
                        message: "Invalid email or password.",
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
                    id: newUser.id,
                    firstName: newUser.first_name,
                    lastName: newUser.last_name,
                    email: newUser.email,
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
