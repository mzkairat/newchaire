# 🚀 Deploy CreatorAssets to GitHub + Netlify

## STEP 1 — Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `creator-assets`
3. Set to **Private**
4. Click **Create repository**
5. Copy the repository URL (e.g. `https://github.com/YOURUSERNAME/creator-assets.git`)

## STEP 2 — Upload Files to GitHub

1. On the GitHub repository page, click **"uploading an existing file"**
2. Drag and drop ALL files from `C:\Users\azerty\Desktop\digital\` into GitHub
   - ✅ Include: all `.html`, `.css`, `.js`, `server.js`, `netlify.toml`, `.gitignore`, `package.json`
   - ✅ Include the `public/`, `netlify/` folders
   - ❌ Do NOT upload: `node_modules/`, `orders.json`, `.env`, `database.db`
3. Click **"Commit changes"**

## STEP 3 — Deploy to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select your `creator-assets` repository
4. Build settings:
   - Build command: *(leave empty)*
   - Publish directory: `public`
5. Click **"Deploy site"**

## STEP 4 — Set Environment Variables on Netlify

In Netlify dashboard → **Site settings** → **Environment variables** → Add:

| Key | Value |
|-----|-------|
| `USDT_WALLET` | `TLGKLmdZTgXRivF41X4DJiLGWA8Rrf7v49` |
| `ADMIN_PASSWORD` | `admin2024` |

Then go to **Deploys** → **Trigger deploy** → **Deploy site**

## STEP 5 — Enable Netlify Blobs (for order storage)

Netlify Blobs is enabled automatically on all plans. No action needed.

## ✅ Done!

Your site will be live at: `https://YOUR-SITE-NAME.netlify.app`
Admin panel: `https://YOUR-SITE-NAME.netlify.app/admin.html`

---

## Running Locally

Double-click **START.bat** — keep the window open while using the site.
Access at: http://localhost:4000
