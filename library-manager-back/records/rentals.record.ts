import { FieldPacket } from "mysql2";
import { Rental } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";
import { RowDataPacket } from 'mysql2/promise';

type RentalRecordsResults = [RentalRecord[], FieldPacket[]];

type StatsResults = [{ status: string; count: number }[], FieldPacket[]];
type RentalStatus = 'rented' | 'overdue' | 'returned';

interface RentalStatsRow extends RowDataPacket {
    year?: number;
    month?: number;
    status: RentalStatus;
    count: number;
}

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

    static async getStatsByUserId(user_id: string): Promise<{ status: string; count: number }[]> {
        const [results]: StatsResults = await pool.execute(
            "SELECT `status`, COUNT(*) as `count` FROM `rentals` WHERE `user_id` = :user_id GROUP BY `status`",
            { user_id }
        ) as StatsResults;

        return results.map(row => ({
            status: row.status,
            count: row.count,
        }));
    }

    static async getStatsByUserIdPrecise(
        user_id: string,
        year?: number,
        month?: number
    ): Promise<
        { year?: number; month?: string; rented: number; overdue: number; returned: number }[]
    > {
        let query = `
        SELECT 
            ${year ? "MONTH(`rental_date`) as `month`, " : "YEAR(`rental_date`) as `year`, "}
            \`status\`,
            COUNT(*) as \`count\`
        FROM 
            \`rentals\` 
        WHERE 
            \`user_id\` = :user_id
            ${year ? "AND YEAR(`rental_date`) = :year" : ""}
            ${month ? "AND MONTH(`rental_date`) = :month" : ""}
        GROUP BY 
            ${year ? "MONTH(`rental_date`), " : "YEAR(`rental_date`), "}
            \`status\`
        ORDER BY 
            ${year ? "MONTH(`rental_date`) ASC" : "YEAR(`rental_date`) ASC"}
    `;

        const params: { user_id: string; year?: number; month?: number } = { user_id };
        if (year) params.year = year;
        if (month) params.month = month;

        const [results]: [RentalStatsRow[], any[]] = await pool.execute(query, params);

        const stats: Record<string, { rented: number; overdue: number; returned: number }> = {};

        results.forEach(row => {
            const key = year
                ? month
                    ? ""
                    : `${row.month}`
                : `${row.year}`;

            if (!stats[key]) {
                stats[key] = { rented: 0, overdue: 0, returned: 0 };
            }

            stats[key][row.status as RentalStatus] = row.count;
        });

        if (year && month) {
            return [
                {
                    rented: stats[""]?.rented || 0,
                    overdue: stats[""]?.overdue || 0,
                    returned: stats[""]?.returned || 0
                }
            ];
        } else if (year) {
            return Object.keys(stats).map(month => ({
                month: new Date(0, parseInt(month) - 1).toLocaleString('en', { month: 'long' }),
                rented: stats[month]?.rented || 0,
                overdue: stats[month]?.overdue || 0,
                returned: stats[month]?.returned || 0
            }));
        } else {
            return Object.keys(stats).map(year => ({
                year: parseInt(year),
                rented: stats[year]?.rented || 0,
                overdue: stats[year]?.overdue || 0,
                returned: stats[year]?.returned || 0
            }));
        }
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
