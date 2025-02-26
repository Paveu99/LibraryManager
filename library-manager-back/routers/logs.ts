import { Router } from "express";
import { UserRecord } from "../records/user.record";
import { LogRecord } from "../records/logs.record";

export const logsRouter = Router()

logsRouter
    .get('/', async (req, res) => {
        const userId = req.header('x-user-id') || null;

        try {
            if (!userId) {
                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "Non-existing user.",
                    },
                });
                return;
            }

            const admin = await UserRecord.getOneById(userId);
            if (admin.role !== "admin") {
                res.status(404).json({
                    status: "error",
                    error: {
                        code: 404,
                        message: "User does not have privilages to retrieve data.",
                    },
                });
                return;
            }

            const logs = await LogRecord.listAll();

            res.status(200).json({
                status: "success",
                data: logs,
                message: "Fetched all logs of users' actions."
            })

        } catch (error) {
            res.status(500).json({
                status: "error",
                error: {
                    code: 500,
                    message: "Internal server error.",
                },
            });
        }
    })