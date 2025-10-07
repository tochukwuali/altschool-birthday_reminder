# Deploy to Fly.io via Web Dashboard (No CLI)

Unfortunately, **Fly.io doesn't have a web-only deployment option** - it requires the CLI.

But here are **actual web-based alternatives** that work 100% from the browser:

---

## **Option 1: Render (Easiest - 100% Web-Based)**

### Steps:
1. **Sign up**: https://render.com (use GitHub to login)
2. **Create PostgreSQL Database** (free):
   - Click "New" → "PostgreSQL"
   - Name: `birthday-db`
   - Choose "Free" tier
   - Click "Create Database"
   - Copy the **Internal Database URL**

3. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Name: `birthday-reminder`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Choose "Free" tier

4. **Add Environment Variables**:
   - `DATABASE_URL` = (paste Internal Database URL from step 2)
   - `EMAIL_USER` = your_gmail@gmail.com
   - `EMAIL_PASS` = your_gmail_app_password
   - `NODE_ENV` = production

5. **Deploy**: Click "Create Web Service"

6. **Run Migration** (one-time):
   - After deploy, go to "Shell" tab
   - Run: `npm run migrate`

✅ **Done!** Your app will be live at `https://birthday-reminder.onrender.com`

---

## **Option 2: Railway (100% Web-Based)**

### Steps:
1. **Sign up**: https://railway.app (use GitHub)
2. **New Project** → **Deploy from GitHub repo**
3. Select your `birthday-reminder` repo
4. Railway auto-detects Node.js and deploys
5. **Add Variables** (in Settings):
   - `EMAIL_USER` = your_gmail@gmail.com
   - `EMAIL_PASS` = your_app_password
6. **Generate Domain** (in Settings → Networking)

✅ **Done!** Railway keeps SQLite by default with persistent storage.

**Bonus:** Railway gives you 500 hours/month free (enough for always-on)

---

## **Option 3: Vercel (Web-Based, BUT...)**

⚠️ **Vercel is serverless** - cron jobs won't work properly. Skip this for your app.

---

## **Recommended: Use Render (PostgreSQL)**

Since you want web-only deployment, **Render is your best bet**. But you need to switch to PostgreSQL.

### Quick Setup:

I already created the PostgreSQL files for you:
- `src/db-postgres.js`
- `src/models/userModel-postgres.js`

**To switch:**

1. Update `package.json` - replace `sqlite3` with `pg`:
```json
"dependencies": {
  "pg": "^8.11.3",
  "dotenv": "^16.4.5",
  "ejs": "^3.1.10",
  "express": "^4.19.2",
  "express-validator": "^7.1.0",
  "node-cron": "^3.0.3",
  "nodemailer": "^6.9.14"
}
```

2. Rename files:
```bash
# Backup SQLite
mv src/db.js src/db-sqlite.js
mv src/models/userModel.js src/models/userModel-sqlite.js

# Use PostgreSQL
mv src/db-postgres.js src/db.js
mv src/models/userModel-postgres.js src/models/userModel.js
```

3. Commit and push to GitHub

4. Follow Render steps above

---

## **If You Want to Keep SQLite + Web Deploy:**

Use **Railway** - it's the only web-based platform that properly supports SQLite with persistent storage.

1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub"
3. Select repo
4. Add environment variables
5. Done!

---

## **Summary:**

| Platform | SQLite Support | Web Deploy | Free Tier | Recommendation |
|----------|---------------|------------|-----------|----------------|
| **Render** | ❌ (needs PostgreSQL) | ✅ | 90 days DB | ⭐⭐⭐ Best for assessment |
| **Railway** | ✅ | ✅ | 500 hrs/month | ⭐⭐⭐ Keep SQLite |
| **Fly.io** | ✅ | ❌ (needs CLI) | Forever free | ⭐⭐ Best storage, but CLI only |

**My recommendation for web-only:** Use **Railway** (keeps SQLite, 100% web-based, super simple)

