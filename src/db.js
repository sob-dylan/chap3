import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(':memory:');

// execute SQL statements from strings
// setup sqlite database

db.exec(`
    CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

// todos table
db.exec(`
    CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER ,
    task TEXT,
    completed BOOEAN DEFAULT 0,
    FOREIGN KEY(user_id) REFERENCES users(id)
    )
`);

export default db;