const express = require('express');
const { body } = require('express-validator');
const { getHome, postUser } = require('../controllers/userController');

const router = express.Router();

router.get('/', getHome);

router.post(
  '/users',
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
    body('dateOfBirth')
      .isISO8601({ strict: true })
      .withMessage('Date of birth must be a valid date (YYYY-MM-DD)'),
  ],
  postUser
);

module.exports = router;

