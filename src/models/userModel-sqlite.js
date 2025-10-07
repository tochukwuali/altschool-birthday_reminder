const { getDb } = require('../db');

function createUser({ username, email, dateOfBirth }) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.run(
      'INSERT INTO users (username, email, date_of_birth) VALUES (?, ?, ?)',
      [username, email.toLowerCase(), dateOfBirth],
      function(err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username, email: email.toLowerCase(), dateOfBirth });
      }
    );
  });
}

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function listUsers() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all('SELECT * FROM users ORDER BY created_at DESC', (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function listUsersWithBirthdayToday() {
  return new Promise((resolve, reject) => {
    const db = getDb();
    db.all(`
      SELECT * FROM users
      WHERE strftime('%m-%d', date_of_birth) = strftime('%m-%d', 'now')
    `, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = {
  createUser,
  findUserByEmail,
  listUsers,
  listUsersWithBirthdayToday,
};

