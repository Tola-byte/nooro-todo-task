# To-Do App Setup Guide

## Overview
This guide provides step-by-step instructions to set up the To-Do app, which consists of:
- A **frontend** built with Next.js.
- A **backend** using Express.js with Prisma ORM connected to a MySQL database.

Follow the steps below to get your app running locally.

---

## Frontend Setup (Next.js)

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18.x or later)
- **npm** or **yarn**

### Steps
1. **Clone the frontend repository:**
   ```bash
   git clone <frontend-repo-url>
   cd <frontend-repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory of the project and add the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   Replace `http://localhost:3001/api` with the backend server URL if it's hosted elsewhere.

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at `http://localhost:3000`.

---
Let's Go!