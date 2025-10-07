# Deploy to Fly.io - Simple Steps (No Docker)

## Prerequisites
- A Fly.io account (free): https://fly.io/app/sign-up
- flyctl CLI installed

## Step 1: Install Fly CLI

**Windows (PowerShell):**
```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

**Mac/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Or via npm:**
```bash
npm install -g flyctl
```

## Step 2: Login to Fly.io
```bash
fly auth login
```

## Step 3: Create Your App
```bash
fly launch
```

When prompted:
- **App name**: Press Enter (auto-generated) or type your own
- **Region**: Choose closest to you (e.g., `iad` for US East)
- **Database**: Choose "No" (we're using SQLite)
- **Deploy now**: Choose "No" (we need to set up volume first)

## Step 4: Create Persistent Volume for Database
```bash
fly volumes create birthday_data --size 1 --region iad
```
(Replace `iad` with your chosen region from Step 3)

## Step 5: Set Environment Secrets
```bash
fly secrets set EMAIL_USER=your_gmail@gmail.com
fly secrets set EMAIL_PASS=your_gmail_app_password
```

## Step 6: Deploy!
```bash
fly deploy
```

Fly will:
- Detect it's a Node.js app
- Install dependencies
- Run `npm start`
- Your app will be live at `https://your-app-name.fly.dev`

## Step 7: Check Status
```bash
fly status
fly logs
```

## Step 8: Access Your App
```bash
fly open
```

---

## Useful Commands

**View logs in real-time:**
```bash
fly logs -a your-app-name
```

**SSH into your app:**
```bash
fly ssh console
```

**Run migration manually (if needed):**
```bash
fly ssh console
cd /app
npm run migrate
```

**Update app after code changes:**
```bash
git add .
git commit -m "Update"
fly deploy
```

**Check volume:**
```bash
fly volumes list
```

**Scale down to save resources:**
```bash
fly scale count 1
```

---

## Troubleshooting

### Issue: App not starting
Check logs: `fly logs`

### Issue: Database not persisting
Ensure volume is mounted: `fly volumes list`

### Issue: Email not sending
Check secrets are set: `fly secrets list`
Verify Gmail app password is correct

### Issue: Build fails
Ensure `package.json` has all dependencies and `npm start` works locally

---

## Free Tier Limits
- ✅ 3 shared-cpu-1x VMs
- ✅ 3GB persistent volume storage (we use 1GB)
- ✅ 160GB outbound data transfer

Your birthday reminder app will easily fit in the free tier!

---

## Update .gitignore
Make sure `.env` and `data/` are in `.gitignore` (already done).

---

## Cost: $0/month (Free Tier)
Your app will use:
- 1 VM (256MB RAM)
- 1GB volume
- Minimal bandwidth

All within Fly.io's generous free tier! 🎉

