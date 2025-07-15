# Production Database Setup Guide

This app currently uses local storage for the v0 preview. For production deployment, follow these steps:

## Option 1: MySQL Database (Recommended)

### 1. Set up MySQL Database
\`\`\`sql
-- Run the SQL script from scripts/01-create-database.sql
CREATE DATABASE vehicle_handover_db;
-- ... (rest of the SQL from the script)
\`\`\`

### 2. Update lib/database.ts
Replace the local storage implementation with:

\`\`\`typescript
import mysql from "mysql2/promise"

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function query(sql: string, params: any[] = []) {
  try {
    const [results] = await connection.execute(sql, params)
    return results as any[]
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
\`\`\`

### 3. Environment Variables
\`\`\`env
DB_HOST=your-mysql-host
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_NAME=vehicle_handover_db
\`\`\`

## Option 2: PostgreSQL with Vercel Postgres

### 1. Install Vercel Postgres
\`\`\`bash
npm install @vercel/postgres
\`\`\`

### 2. Update lib/database.ts
\`\`\`typescript
import { sql } from '@vercel/postgres'

export async function query(sqlQuery: string, params: any[] = []) {
  try {
    const result = await sql.query(sqlQuery, params)
    return result.rows
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
\`\`\`

## Option 3: Supabase

### 1. Install Supabase
\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

### 2. Update lib/database.ts
\`\`\`typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function query(table: string, operation: string, data?: any) {
  // Implement Supabase queries based on your needs
}
\`\`\`

## File Storage for Images

### Option 1: Vercel Blob Storage
\`\`\`bash
npm install @vercel/blob
\`\`\`

### Option 2: AWS S3
\`\`\`bash
npm install aws-sdk
\`\`\`

### Option 3: Cloudinary
\`\`\`bash
npm install cloudinary
\`\`\`

## Deployment Steps

1. Choose your database provider
2. Set up environment variables
3. Update the database implementation
4. Deploy to Vercel, Netlify, or your preferred platform
5. Run database migrations
6. Test the application

## Security Considerations

1. Use proper password hashing (bcrypt)
2. Implement rate limiting
3. Add CSRF protection
4. Use HTTPS in production
5. Sanitize user inputs
6. Implement proper session management
