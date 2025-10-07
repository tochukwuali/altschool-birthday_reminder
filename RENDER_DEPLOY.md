# Deploy to Render (100% Web-Based)

## Step-by-Step Guide

### Step 1: Sign Up
1. Go to https://render.com
2. Sign up using your GitHub account (easiest)

### Step 2: Create PostgreSQL Database
1. Click **New** → **PostgreSQL**
2. **Name**: `birthday-db`
3. **Database**: `birthday_db` (auto-filled)
4. **User**: `birthday_user` (auto-filled)
5. **Region**: Choose closest to you
6. **PostgreSQL Version**: Latest (default)
7. **Plan**: **Free**
8. Click **Create Database**
9. Wait 1-2 minutes for provisioning
10. **Copy the "Internal Database URL"** (looks like `postgresql://birthday_user:xxxxx@dpg-xxxxx/birthday_db`)

### Step 3: Push Your Code to GitHub
Make sure your latest code is pushed:
```bash
git add .
git commit -m "Switch to PostgreSQL for Render deployment"
git push origin main
```

### Step 4: Create Web Service
1. Click **New** → **Web Service**
2. Connect to your GitHub repository
3. Select `birthday-reminder` repo
4. **Name**: `birthday-reminder` (or your choice)
5. **Region**: Same as database
6. **Branch**: `main`
7. **Root Directory**: (leave blank)
8. **Runtime**: **Node**
9. **Build Command**: `npm install`
10. **Start Command**: `npm start`
11. **Plan**: **Free**

### Step 5: Add Environment Variables
Scroll down to **Environment Variables** section:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | (paste Internal Database URL from Step 2) |
| `EMAIL_USER` | your_gmail@gmail.com |
| `EMAIL_PASS` | your_gmail_app_password |
| `NODE_ENV` | production |

Click **Add** for each variable.

### Step 6: Deploy
1. Click **Create Web Service**
2. Render will automatically:
   - Clone your repo
   - Run `npm install`
   - Run `npm start`
3. Wait 3-5 minutes for first deploy

### Step 7: Run Database Migration
1. Once deploy succeeds, go to your web service dashboard
2. Click **Shell** tab (top right)
3. In the terminal, run:
   ```bash
   npm run migrate
   ```
4. You should see: "Database migrated."

### Step 8: Test Your App
1. Click the URL at the top (e.g., `https://birthday-reminder-xxxx.onrender.com`)
2. Add a test user with today's birthday
3. Check if email sends at 7am the next day!

---

## Troubleshooting

### Database Connection Error
- Make sure `DATABASE_URL` environment variable is set correctly
- Verify you used the **Internal Database URL** (not external)

### App Crashes on Start
- Check logs in Render dashboard
- Verify all environment variables are set
- Make sure you ran `npm run migrate`

### Emails Not Sending
- Check `EMAIL_USER` and `EMAIL_PASS` are correct
- Gmail password must be an **App Password**, not your regular password
- Go to: Google Account → Security → 2-Step Verification → App passwords

### Free Tier Limitations
- Free databases expire after **90 days**
- Web service spins down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds

---

## Keeping Your App Alive (Optional)

Free Render apps sleep after inactivity. To keep it awake:

1. Use [UptimeRobot](https://uptimerobot.com) (free)
2. Add your Render URL
3. Set check interval to 5 minutes
4. Your app stays awake!

---

## Costs
- **$0/month** on free tier
- Database: Free for 90 days (can recreate)
- Web Service: Free forever (with sleep after inactivity)

---

## After 90 Days (Database Expiry)

When free database expires:
1. Export your data (from Render dashboard)
2. Create a new free PostgreSQL database
3. Update `DATABASE_URL` environment variable
4. Import data or start fresh
5. Run `npm run migrate`

Or upgrade to paid ($7/month for persistent database).

---

## Next Steps
- Add more users
- Test the cron job (wait until 7am or temporarily change the schedule)
- Customize the email template in `src/views/emails/birthday.ejs`
- Share your app URL!

🎉 **You're live!**

