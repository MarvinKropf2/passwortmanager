const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // User-Tabelle für Master-Passwort
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        master_hash TEXT NOT NULL
    )`);

    // Passwort-Tabelle für die gespeicherten Credentials
    db.run(`CREATE TABLE IF NOT EXISTS passwords (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        service TEXT NOT NULL,
        username TEXT,
        encrypted_password TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

module.exports = db;
