const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const { migrate } = require('./db');
const userRoutes = require('./routes/userRoutes');
const { startBirthdayJob } = require('./jobs/birthdayJob');

dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes
app.use('/', userRoutes);

// db migration and cron start
migrate();
startBirthdayJob();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


