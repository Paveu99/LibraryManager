import { FieldPacket } from "mysql2";
import { Book } from "../types";
import { pool } from "../utils/db";

type BookRecordsResults = [BookRecord[], FieldPacket[]];

export class BookRecord implements Book {
    id?: string;
    author: string;
    available_copies: number;
    description: string;
    title: string;
    total_copies: number;
    year: number;

    constructor(obj: Book) {
        if (!obj.title || typeof obj.title !== 'string' || obj.title.trim().length === 0) {
            throw new Error('Title must be a non-empty string.');
        }
        if (!obj.author || typeof obj.author !== 'string' || obj.author.trim().length === 0) {
            throw new Error('Author must be a non-empty string.');
        }
        if (!Number.isInteger(obj.total_copies) || obj.total_copies <= 0) {
            throw new Error('Total copies must be a positive integer.');
        }
        if (!Number.isInteger(obj.available_copies) || obj.available_copies < 0 || obj.available_copies > obj.total_copies) {
            throw new Error('Available copies must be a non-negative integer and less than or equal to total copies.');
        }
        if (!Number.isInteger(obj.year) || obj.year <= 0) {
            throw new Error('Year must be a positive integer.');
        }

        this.id = obj.id;
        this.author = obj.author;
        this.title = obj.title;
        this.available_copies = obj.available_copies;
        this.description = obj.description;
        this.total_copies = obj.total_copies;
        this.year = obj.year;
    }


    private static async query(sql: string, params: object): Promise<BookRecordsResults> {
        return pool.execute(sql, params) as Promise<BookRecordsResults>;
    }

    static async getOneById(id: string): Promise<BookRecord | null> {
        const [results] = await this.query("SELECT * FROM `books` WHERE `id` = :id", { id });
        return results.length ? new BookRecord(results[0]) : null;
    }

    static async listAll(filters: { author?: string; year?: number } = {}): Promise<BookRecord[]> {
        const conditions = [];
        const params: any = {};

        if (filters.author) {
            conditions.push('author LIKE :author');
            params.author = `%${filters.author}%`;
        }
        if (filters.year) {
            conditions.push('year = :year');
            params.year = filters.year;
        }

        const sql = `
            SELECT * FROM \`books\`
            ${conditions.length ? 'WHERE ' + conditions.join(' AND ') : ''}
        `;
        const [results] = await this.query(sql, params);
        return results.map(obj => new BookRecord(obj));
    }

    async insert(): Promise<void> {

        await BookRecord.query(
            "INSERT INTO `books` (`id`, `title`, `author`, `total_copies`, `available_copies`, `description`, `year`) VALUES (:id, :title, :author, :total_copies, :available_copies, :description, :year)",
            {
                id: this.id,
                title: this.title,
                author: this.author,
                total_copies: this.total_copies,
                available_copies: this.available_copies,
                description: this.description,
                year: this.year,
            }
        );
    }

    async update(): Promise<void> {
        if (!this.id) {
            throw new Error('Cannot update a book without an ID.');
        }

        await BookRecord.query(
            "UPDATE `books` SET `title` = :title, `author` = :author, `total_copies` = :total_copies, `available_copies` = :available_copies, `description` = :description, `year` = :year WHERE `id` = :id",
            {
                id: this.id,
                title: this.title,
                author: this.author,
                total_copies: this.total_copies,
                available_copies: this.available_copies,
                description: this.description,
                year: this.year,
            }
        );
    }

    async rentBook(): Promise<void> {
        if (this.available_copies <= 0) {
            throw new Error('No copies available for rent.');
        }

        this.available_copies -= 1;

        await BookRecord.query(
            "UPDATE `books` SET `available_copies` = :available_copies WHERE `id` = :id",
            {
                id: this.id,
                available_copies: this.available_copies,
            }
        );
    }

    async returnBook(): Promise<void> {
        if (this.available_copies >= this.total_copies) {
            throw new Error('All copies are already returned.');
        }

        this.available_copies += 1;

        await BookRecord.query(
            "UPDATE `books` SET `available_copies` = :available_copies WHERE `id` = :id",
            {
                id: this.id,
                available_copies: this.available_copies,
            }
        );
    }

    async delete(): Promise<void> {
        await BookRecord.query("DELETE FROM `books` WHERE `id` = :id", { id: this.id });
    }

}