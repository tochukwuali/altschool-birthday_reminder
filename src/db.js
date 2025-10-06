const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '..', 'data', 'app.db');

let db;

function getDb() {
  if (!db) {
    db = new sqlite3.Database(dbPath);
  }
  return db;
}

function migrate() {
  const database = getDb();
  database.serialize(() => {
    database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        date_of_birth TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now'))
      );
    `);
  });
}

// Run migrations if called directly via npm run migrate
if (require.main === module) {
  const fs = require('fs');
  const dir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  migrate();
  console.log('Database migrated.');
}

module.exports = {
  getDb,
  migrate,
};


