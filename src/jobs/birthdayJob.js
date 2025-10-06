const cron = require('node-cron');
const { listUsersWithBirthdayToday } = require('../models/userModel');
const { sendBirthdayEmail } = require('../services/emailService');

function startBirthdayJob() {
  // Run at 7:00 AM every day, server local time
  cron.schedule('0 7 * * *', async () => {
    try {
      const users = await listUsersWithBirthdayToday();
      for (const user of users) {
        await sendBirthdayEmail({ to: user.email, username: user.username });
      }
      if (users.length > 0) {
        console.log(`Sent ${users.length} birthday email(s).`);
      }
    } catch (err) {
      console.error('Error running birthday job:', err);
    }
  });
}

module.exports = { startBirthdayJob };


