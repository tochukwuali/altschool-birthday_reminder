## Birthday Reminder (AltSchool Assessment)

### What this does
- Collects username, email, and date of birth via a simple EJS frontend
- Stores entries in SQLite (via sqlite3)
- At 7:00 AM every day, checks whose birthday is today and sends a personalized email using Nodemailer (Gmail)

### Tech choices and reasons
- **Express + EJS**: Minimal and fast to set up, supports server-rendered pages and email templates (EJS) without extra tooling
- **SQLite (sqlite3)**: Zero-ops embedded DB, reliable transactional writes, simple to ship for a small app
- **Nodemailer (Gmail)**: Free and easy to configure for demos; can be swapped for any SMTP later
- **node-cron**: Declarative cron schedule, no external scheduler required
- **Modular structure**: Controllers, routes, services, jobs, and models improve maintainability and testability

### Project structure
```
src/
  controllers/        # request handlers
  jobs/               # scheduled jobs
  models/             # data access layer
  public/             # static assets
  routes/             # express routers
  services/           # external services (email)
  views/              # EJS templates (pages + emails)
  db.js               # db connection + migration
  server.js           # app bootstrap
```

### Getting started
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Create environment file**
   ```bash
   cp .env.example .env
   # Fill EMAIL_USER and EMAIL_PASS. For Gmail, use an App Password if 2FA is enabled.
   ```
3. **Run database migration** (creates the SQLite database file at `data/app.db`)
   ```bash
   npm run migrate
   ```
4. **Start the server**
   ```bash
   npm run dev
   # open http://localhost:3000
   ```

### Environment variables
Create a `.env` file with:
```
PORT=3000
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Deploying to Render
1. **Set Node version**: Add `"engines": { "node": "20.x" }` in package.json (already included)
2. **Environment variables**: In Render dashboard, add `EMAIL_USER` and `EMAIL_PASS`
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Persistent Disk** (optional): Mount at `/opt/render/project/data` to preserve database across deploys

### Notes
- Emails must be unique; server validates and rejects duplicates.
- Birthday detection matches month-day of `date_of_birth` to today's month-day.
- Cron schedule runs on server local time at 7:00 AM.
- For production, consider migrating to PostgreSQL for better durability on cloud platforms.

