# Movie4x Deployment Guide

Follow these exact steps to make Movie4x live on the internet!

## Step 1: Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Build a Database (Choose the **FREE** cluster).
3. Under "Security" -> "Network Access", add `0.0.0.0/0` (Allow access from anywhere).
4. Under "Database Access", create a new database user and save the password.
5. Go to "Databases" -> Click "Connect" -> "Drivers" -> Copy the **Connection String** (`mongodb+srv://<username>:<password>@cluster0...`).

## Step 2: Deploy Backend (Render)
1. Go to [Render](https://render.com/) and sign in with GitHub.
2. Click **New +** -> **Web Service**.
3. Connect your GitHub repository where you uploaded this code.
4. Set the following:
   * **Build Command**: `npm install`
   * **Start Command**: `npm start`
5. Click **Advanced** and add these Environment Variables:
   * `MONGO_URI` = Your MongoDB Atlas connection string from Step 1.
   * `JWT_SECRET` = A random secret string (e.g., `movie4x_super_secret_123`).
   * `TMDB_API_KEY` = Your TMDB API Key.
6. Click **Create Web Service**. Wait 2-3 minutes for it to become live. Copy the deployed URL (e.g., `https://movie4x-backend.onrender.com`).

## Step 3: Connect Frontend & Backend
1. Open `frontend/app.js` in your editor.
2. Find line 4 where it says:
   `'https://movie4x-backend.onrender.com/api'`
3. Replace that URL with the exact Render URL you just got in Step 2.
4. **Commit and push** this change to your GitHub repository!

## Step 4: Deploy Frontend (Vercel)
1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Very Important: Open the **"Build and Output Settings"** toggle.
5. Next to **Output Directory**, click override and type: `frontend`
6. Click **Deploy**. Vercel will instantly host your frontend!

## Step 5: Domain Setup (Optional)
If you want a custom domain (like `movie4x.com`):
1. Go to your Vercel Project -> **Settings** -> **Domains**.
2. Add your custom domain.
3. Vercel will give you DNS records to add to your Domain Registrar (like GoDaddy, Namecheap). SSL (HTTPS) will be automatically generated!

✅ Your app is now fully live and accessible from anywhere! Test your live login, search, and watchlist to ensure everything works perfectly.
