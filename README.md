# UniDiscover — College Discovery Platform

UniDiscover is a high-performance web platform built with Next.js 15, TypeScript, Tailwind CSS, and Prisma, connected to a Neon PostgreSQL database. It allows students to explore premier engineering colleges across India, compare colleges side-by-side, save their favorites, and predict admission chances based on final cutoff ranks.

## Features

1. **Interactive College Catalog**: Browsable grid featuring 60 top-tier colleges (IITs, NITs, IIITs, state-run institutes, and private universities) with full search and filtering controls (by State, College Type, Annual Fees, and Minimum Rating).
2. **Side-by-Side Comparison**: Select up to 3 colleges to compare location, type, pricing, student ratings, placement rates, packages, and courses side-by-side. Best-value metrics are highlighted in green automatically.
3. **Cutoff Rank Predictor**: Predict admission probability (High, Medium, Low) for exams like JEE Main, JEE Advanced, AP EAPCET, TS EAPCET, MHT CET, and KCET based on category and optional state quotas.
4. **Favorites System**: Secure bookmarking of colleges to a user dashboard, saved directly in PostgreSQL with optimistic client-side updates.
5. **Secure Authentication**: Authentication powered by NextAuth Credentials Provider, bcrypt password hashing, and session management.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database ORM**: Prisma 5
- **Database**: Neon PostgreSQL
- **Authentication**: NextAuth.js
- **State Management & Caching**: TanStack React Query v5

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `DATABASE_URL` | Neon PostgreSQL Connection URL | `postgresql://user:pass@ep-sunset.aws.neon.tech/neondb` |
| `NEXTAUTH_SECRET` | Secret key used to encrypt NextAuth JWTs | `college-discovery-secret-key-2024` |
| `NEXTAUTH_URL` | Base canonical URL of the application | `http://localhost:3000` |

---

## Local Setup Steps

1. **Clone & Install Dependencies**:
   ```bash
   git clone <repo-url>
   cd college-discovery
   npm install
   ```

2. **Setup Database Schema**:
   Push the Prisma schema to your Neon PostgreSQL database:
   ```bash
   npx prisma db push
   ```

3. **Seed Database**:
   Populate the database with the pre-configured 60 colleges, courses, cutoffs, and student reviews:
   ```bash
   npx prisma db seed
   ```

4. **Run Development Server**:
   Start the local dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment Guide

### 1. Database Setup (Neon PostgreSQL)
1. Sign up on [Neon](https://neon.tech) and create a new project.
2. Retrieve your connection string from the dashboard (ensure pooled connection or direct connection URL is selected).
3. Set `DATABASE_URL` in your deployment environment variables.

### 2. Application Deployment (Vercel)
1. Push your code to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Add the following Environment Variables in Vercel settings:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET` (generate a secure random 32-character string)
   - `NEXTAUTH_URL` (set to your custom domain or Vercel deployment URL, e.g. `https://your-app.vercel.app`)
4. Vercel will build the Next.js bundle and deploy the app.
