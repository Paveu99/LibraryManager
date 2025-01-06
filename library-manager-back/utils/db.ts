import { createPool } from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'libraryapp',
    namedPlaceholders: true,
    decimalNumbers: true,
})