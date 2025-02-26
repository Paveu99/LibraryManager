import { User } from "../types";
import { ValidationError } from "../utils/errors";
import { FieldPacket } from "mysql2";
import { v4 as uuid } from "uuid";
import { pool } from "../utils/db";
import { genSalt, hash } from "bcrypt";

type UserRecordsResults = [UserRecord[], FieldPacket[]];

export class UserRecord implements User {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    private _password: string;
    role: "client" | "admin" | "guest";
    library_card_code?: string;

    constructor(obj: User) {

        if (!obj.first_name || !obj.last_name || !obj.email || !obj.password || !obj.role) {
            throw new ValidationError('All required fields must be provided.');
        }

        this.id = obj.id || uuid();
        this.first_name = obj.first_name;
        this.last_name = obj.last_name;
        this.email = obj.email;
        this._password = obj.password;
        this.role = obj.role;
        this.library_card_code = obj.library_card_code;
    }

    private static async query(sql: string, params: object): Promise<UserRecordsResults> {
        return pool.execute(sql, params) as Promise<UserRecordsResults>;
    }

    static async getOneByEmail(email: string): Promise<UserRecord | null> {
        const [results] = await this.query("SELECT * FROM `users` WHERE `email` = :email", { email });
        return results.length ? new UserRecord(results[0]) : null;
    }

    static async getOneByLibraryCardCode(library_card_code: string): Promise<UserRecord | null> {
        const [results] = await this.query("SELECT * FROM `users` WHERE `library_card_code` = :library_card_code", { library_card_code });
        return results.length ? new UserRecord(results[0]) : null;
    }

    static async getOneById(id: string): Promise<UserRecord | null> {
        const [results] = await this.query("SELECT * FROM `users` WHERE `id` = :id", { id });
        return results.length ? new UserRecord(results[0]) : null;
    }

    static async listAll(): Promise<UserRecord[]> {
        const [results] = await this.query("SELECT * FROM `users`", {});
        return results.map(obj => new UserRecord(obj));
    }

    private async hashPassword(): Promise<void> {
        this._password = await hash(this._password, await genSalt(10));
    }

    private generateUniqueCodeWithTimestamp(): string {
        return Date.now().toString().slice(-8);
    }

    private async setLibraryCardCode(): Promise<void> {
        if (!this.library_card_code) {
            this.library_card_code = this.generateUniqueCodeWithTimestamp();
        }
    }

    async insert(): Promise<void> {
        await this.hashPassword();
        await this.setLibraryCardCode();

        await UserRecord.query(
            "INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `role`, `library_card_code`, `password`) VALUES (:id, :first_name, :last_name, :email, :role, :library_card_code, :password)",
            {
                id: this.id,
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                role: this.role,
                library_card_code: this.library_card_code,
                password: this._password,
            }
        );
    }

    async delete(): Promise<void> {
        await UserRecord.query("DELETE FROM `users` WHERE `id` = :id", { id: this.id });
    }

    get password(): string {
        return this._password;
    }
}
