# Hungry Habibi — Smart Table System

Static frontend (`index.html`) + serverless API (`/api`) that share one
database, so bookings made on any phone/PC show up for everyone instantly.

## What changed from the old version

- The old file only worked when double-clicked on a PC (`file://` mode used
  browser `localStorage` as a fake backend). Mobile browsers block that mode,
  which is why it opened on PC but not on Android/iPhone.
- The site now always talks to real API routes in `/api`, backed by a shared
  Redis database (via Upstash on Vercel), so it works identically on every
  device and every visitor sees the same table/booking data.

## Deploy to Vercel

1. **Put this project in a Git repo** (GitHub/GitLab/Bitbucket) and import it
   in the Vercel dashboard → **Add New Project**. Vercel auto-detects the
   `index.html` + `/api` structure, no build config needed.

2. **Add a database.** In your Vercel project → **Storage** tab → **Create
   Database / Marketplace** → search **Upstash** → choose **Redis** →
   install and connect it to this project. Vercel will automatically add the
   `KV_REST_API_URL` / `KV_REST_API_TOKEN` environment variables the code
   already expects — no manual copying needed.

3. **(Optional) Set manager credentials.** By default the manager login is
   `manager` / `1234`. To change it, add these Environment Variables in
   Project Settings → Environment Variables, then redeploy:
   - `MANAGER_USER`
   - `MANAGER_PASS`
   - `MANAGER_TOKEN` (any random string — acts as the session token)

4. **Deploy.** Click Deploy. Your app will be live at
   `https://your-project.vercel.app` and will work the same on PC, Android,
   and iPhone.

## Local testing (optional)

```bash
npm install -g vercel
npm install
vercel dev
```

`vercel dev` runs both the static file and the `/api` functions locally, and
will prompt you to link/create the Upstash integration for local env vars too
(`vercel env pull` after connecting storage in the dashboard).
