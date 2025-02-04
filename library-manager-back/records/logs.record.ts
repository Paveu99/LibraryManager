import { FieldPacket } from "mysql2";
import { Log } from "../types";
import { pool } from "../utils/db";

type LogRecordsResults = [LogRecord[], FieldPacket[]];

export class LogRecord implements Log {
    id?: number;
    action: string;
    details: string;
    timestamp: string;
    user_id: string;

    constructor(obj: LogRecord) {
        this.id = obj.id,
            this.action = obj.action,
            this.details = obj.details,
            this.timestamp = obj.timestamp
        this.user_id = obj.user_id
    }

    private static async query(sql: string, params: object): Promise<LogRecordsResults> {
        return pool.execute(sql, params) as Promise<LogRecordsResults>;
    }

    static async listAll(): Promise<LogRecord[]> {
        const [results] = await this.query("SELECT * FROM `logs`", {});
        return results.map(obj => new LogRecord(obj));
    }

    static async add(action: string, details: string, user_id: string): Promise<void> {
        const timestamp = new Date().toISOString();
        await this.query(
            "INSERT INTO `logs` (`action`, `details`, `timestamp`, `user_id`) VALUES (:action, :details, :timestamp, :user_id)",
            { action, details, timestamp, user_id }
        );
    }

    static async listByUser(user_id: string): Promise<LogRecord[]> {
        const [results] = await this.query(
            "SELECT * FROM `logs` WHERE `user_id` = :user_id",
            { user_id }
        );
        return results.map(obj => new LogRecord(obj));
    }

    static async listByDateRange(startDate: string, endDate: string): Promise<LogRecord[]> {
        const [results] = await this.query(
            "SELECT * FROM `logs` WHERE `timestamp` BETWEEN :startDate AND :endDate",
            { startDate, endDate }
        );
        return results.map(obj => new LogRecord(obj));
    }

    static async deleteOldLogs(olderThan: string): Promise<void> {
        await this.query(
            "DELETE FROM `logs` WHERE `timestamp` < :olderThan",
            { olderThan }
        );
    }
}