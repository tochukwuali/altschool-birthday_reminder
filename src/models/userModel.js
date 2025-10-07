const { getDb } = require('../db');

async function createUser({ username, email, dateOfBirth }) {
  const pool = getDb();
  const result = await pool.query(
    'INSERT INTO users (username, email, date_of_birth) VALUES ($1, $2, $3) RETURNING *',
    [username, email.toLowerCase(), dateOfBirth]
  );
  return result.rows[0];
}

async function findUserByEmail(email) {
  const pool = getDb();
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email.toLowerCase()]
  );
  return result.rows[0];
}

async function listUsers() {
  const pool = getDb();
  const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
  return result.rows;
}

async function listUsersWithBirthdayToday() {
  const pool = getDb();
  const result = await pool.query(`
    SELECT * FROM users
    WHERE TO_CHAR(date_of_birth, 'MM-DD') = TO_CHAR(NOW(), 'MM-DD')
  `);
  return result.rows;
}

module.exports = {
  createUser,
  findUserByEmail,
  listUsers,
  listUsersWithBirthdayToday,
};

