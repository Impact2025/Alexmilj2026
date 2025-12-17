# 🚀 Setup Guide - Reis naar het Miljoen

## Prerequisites
- Node.js 18+ installed
- Neon database account (free tier available)
- Clerk account for authentication (free tier available)

## Step 1: Clone & Install

```bash
# Install dependencies
npm install
```

## Step 2: Set up Neon Database

1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Create a new project (free tier works great!)
3. Copy your connection string (looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb`)
4. Save it for the next step

## Step 3: Set up Clerk Authentication

1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application
3. Choose "Email" and/or "Google" as sign-in methods
4. Copy your Publishable Key from the API Keys section
5. Save it for the next step

## Step 4: Configure Environment Variables

1. Copy `.env.local` and fill in your credentials:

```bash
# Neon Database Connection
DATABASE_URL=your_neon_connection_string_here
VITE_DATABASE_URL=your_neon_connection_string_here

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

**Important**: Replace the placeholder values with your actual keys!

## Step 5: Push Database Schema

This will create all necessary tables in your Neon database:

```bash
npm run db:push
```

You should see output confirming tables were created:
- users
- completed_missions
- badges
- daily_logs
- sunday_reviews
- weekly_goals

## Step 6: Run the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in terminal)

## Step 7: Test Everything

1. **Sign Up**: Create an account using Clerk
2. **Morning Ritual**: Complete the morning ritual (+25 XP)
3. **Mission**: Complete a weekly mission
4. **Check Database**: Run `npm run db:studio` to see your data in Drizzle Studio

## 🎯 What's Working Now

### ✅ Cloud-Synced Features
- User authentication (Clerk)
- XP tracking in database
- Mission completion syncing
- Streak tracking
- Money tracking (saved/earned)
- Sunday review submissions
- Badge system

### 🔄 Hybrid Mode
The app now supports both:
- **Cloud Mode**: When signed in, all data syncs to Neon database
- **Local Mode**: When not signed in, data saves to localStorage

### 🎨 Original Features (Still Working)
- Morning ritual with daily quotes
- 52 weekly missions
- Vehicle progression (skateboard → Lamborghini)
- XP and level system
- Responsive design

## 📊 Database Management

### View Database
```bash
npm run db:studio
```
Opens Drizzle Studio at http://localhost:4983 to view/edit data

### Generate Migrations
```bash
npm run db:generate
```

### Push Schema Changes
```bash
npm run db:push
```

## 🐛 Troubleshooting

### Database Connection Error
- Check your `DATABASE_URL` is correct
- Ensure your Neon project is active
- Verify you're using the connection string with `?sslmode=require`

### Clerk Auth Not Working
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Check that your Clerk app has sign-in methods enabled
- Clear browser cache and try again

### App Not Loading User
- Open browser console (F12) for error messages
- Verify both database and Clerk are configured
- Check that tables were created with `npm run db:studio`

## 🚢 Next Steps

### Deploy to Production

1. **Deploy to Vercel** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - DATABASE_URL
# - VITE_DATABASE_URL
# - VITE_CLERK_PUBLISHABLE_KEY
```

2. **Update Clerk Settings**
   - Add your production URL to Clerk's allowed domains
   - Update callback URLs

3. **Test Production**
   - Sign up with a test account
   - Complete a mission
   - Verify data appears in Neon database

## 📱 Mobile / PWA (Future)

To make this a Progressive Web App:
1. Add a service worker
2. Create a manifest.json
3. Add offline support
4. Enable "Add to Home Screen"

## 🎓 Architecture Overview

```
Frontend (React + Vite + Tailwind)
    ↓
Authentication (Clerk)
    ↓
Context/State (AppContext)
    ↓
Services Layer (userService, missionService)
    ↓
ORM (Drizzle)
    ↓
Database (Neon Postgres)
```

## 🔒 Security Notes

- Never commit `.env.local` to git (it's in .gitignore)
- Rotate database password if exposed
- Use Neon's connection pooling for production
- Enable Clerk's security features (2FA, etc.)

## 💡 Tips

- Use `npm run db:studio` to quickly verify data changes
- Check browser console for helpful error messages
- Clerk's dashboard shows user activity and sign-ins
- Neon's dashboard shows database metrics

---

**Ready to make your first million! 🏎️💨**
