import { FieldPacket } from "mysql2";
import { Rental } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type RentalRecordsResults = [RentalRecord[], FieldPacket[]];

export class RentalRecord implements Rental {
    id?: number;
    user_id: string;
    book_id: string;
    rental_date: string;
    return_date: string;
    status: "rented" | "returned" | "overdue";

    constructor(obj: Rental) {
        if (!obj.user_id || !obj.book_id || !obj.rental_date || !obj.status) {
            throw new ValidationError('All required fields must be provided.');
        }

        this.id = obj.id;
        this.user_id = obj.user_id;
        this.book_id = obj.book_id;
        this.rental_date = obj.rental_date;
        this.return_date = obj.return_date;
        this.status = obj.status;
    }

    private static async query(sql: string, params: object): Promise<RentalRecordsResults> {
        return pool.execute(sql, params) as Promise<RentalRecordsResults>;
    }

    static async getOneById(id: number): Promise<RentalRecord | null> {
        const [results] = await this.query(
            "SELECT * FROM `rentals` WHERE `id` = :id",
            { id }
        );
        return results.length ? new RentalRecord(results[0]) : null;
    }

    static async listAll(): Promise<RentalRecord[]> {
        const [results] = await this.query("SELECT * FROM `rentals`", {});
        return results.map(obj => new RentalRecord(obj));
    }

    static async listByUser(user_id: string): Promise<RentalRecord[]> {
        const [results] = await this.query(
            "SELECT * FROM `rentals` WHERE `user_id` = :user_id",
            { user_id }
        );
        return results.map(obj => new RentalRecord(obj));
    }

    static async listByBook(book_id: string): Promise<RentalRecord[]> {
        const [results] = await this.query(
            "SELECT * FROM `rentals` WHERE `book_id` = :book_id",
            { book_id }
        );
        return results.map(obj => new RentalRecord(obj));
    }

    async insert(): Promise<void> {
        await RentalRecord.query(
            "INSERT INTO `rentals` (`user_id`, `book_id`, `rental_date`, `return_date`, `status`) VALUES (:user_id, :book_id, :rental_date, :return_date, :status)",
            {
                user_id: this.user_id,
                book_id: this.book_id,
                rental_date: this.rental_date,
                return_date: this.return_date,
                status: this.status,
            }
        );
    }

    async updateStatus(newStatus: "rented" | "returned" | "overdue"): Promise<void> {
        if (!this.id) {
            throw new ValidationError('Cannot update status for a rental without an ID.');
        }
        this.status = newStatus;

        await RentalRecord.query(
            "UPDATE `rentals` SET `status` = :status WHERE `id` = :id",
            {
                status: this.status,
                id: this.id,
            }
        );
    }

    async setReturnDate(return_date: string): Promise<void> {
        if (!this.id) {
            throw new ValidationError('Cannot set return date for a rental without an ID.');
        }
        this.return_date = return_date;

        await RentalRecord.query(
            "UPDATE `rentals` SET `return_date` = :return_date WHERE `id` = :id",
            {
                return_date: this.return_date,
                id: this.id,
            }
        );
    }

    async delete(): Promise<void> {
        if (!this.id) {
            throw new ValidationError('Cannot delete a rental without an ID.');
        }

        await RentalRecord.query(
            "DELETE FROM `rentals` WHERE `id` = :id",
            { id: this.id }
        );
    }
}
