# Birthday Reminder

Automated birthday email system that sends wishes at 7am daily.

## Features
- Collect user birthdays via web form
- PostgreSQL database storage
- Daily automated emails via Gmail/Nodemailer
- EJS templating for UI and emails

## Tech Stack
- Node.js + Express
- PostgreSQL
- EJS
- node-cron
- Nodemailer

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   Create `.env`:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_gmail_app_password
   ```

3. **Run migration**
   ```bash
   npm run migrate
   ```

4. **Start server**
   ```bash
   npm start
   ```

## Deploy to Render

1. Create PostgreSQL database → copy Internal Database URL
2. Create Web Service from GitHub repo
3. Set environment variables: `DATABASE_URL`, `EMAIL_USER`, `EMAIL_PASS`, `NODE_ENV=production`
4. After deploy, run `npm run migrate` in Shell

See `RENDER_DEPLOY.md` for detailed steps.

## Project Structure
```
src/
├── controllers/    # request handlers
├── models/         # database operations
├── routes/         # express routes
├── services/       # email service
├── jobs/           # cron scheduler
├── views/          # EJS templates
├── db.js           # database connection
└── server.js       # app entry point
```

---

**AltSchool Africa Assessment Project**
