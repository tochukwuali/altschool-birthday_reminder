const { validationResult } = require('express-validator');
const { createUser, listUsers, findUserByEmail } = require('../models/userModel');

async function getHome(req, res) {
  try {
    const users = await listUsers();
    res.render('index', { users, errors: [], values: {} });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.render('index', { users: [], errors: [{ msg: 'Failed to load users' }], values: {} });
  }
}

async function postUser(req, res) {
  const errors = validationResult(req);
  const values = {
    username: req.body.username || '',
    email: req.body.email || '',
    dateOfBirth: req.body.dateOfBirth || '',
  };
  
  try {
    const users = await listUsers();
    
    if (!errors.isEmpty()) {
      return res.status(400).render('index', { users, errors: errors.array(), values });
    }
    
    const existing = await findUserByEmail(req.body.email);
    if (existing) {
      return res.status(400).render('index', {
        users,
        errors: [{ msg: 'Email already exists' }],
        values,
      });
    }
    
    await createUser({
      username: req.body.username,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
    });
    
    return res.redirect('/');
  } catch (err) {
    console.error('Error creating user:', err);
    const users = await listUsers().catch(() => []);
    return res.status(500).render('index', {
      users,
      errors: [{ msg: 'Failed to save user' }],
      values,
    });
  }
}

module.exports = { getHome, postUser };

