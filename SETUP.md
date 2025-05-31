# Woorden Setup Guide

## Prerequisites
- Node.js 18+
- pnpm
- Supabase account

## Initial Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Variables
Copy `.env.local.example` to `.env.local` and update with your Supabase credentials:
```bash
cp .env.local.example .env.local
```

### 3. Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy the entire contents of `packages/db/src/schema.sql`
4. Paste and run it in the SQL Editor

The full schema includes:
- Users table (extends Supabase auth)
- Words table for Dutch vocabulary
- User progress tracking
- User settings
- Sources for word origins (books, chapters)
- Word-source relationships
- Row Level Security policies
- Automatic triggers for updated_at timestamps

### 4. Enable Authentication

In Supabase Dashboard:
1. Go to Authentication → Providers
2. Ensure Email provider is enabled
3. For now, use default Supabase email settings (custom email service will be added later)

### 5. Run the Development Server

```bash
# Run all apps
pnpm dev:open

# Or run individually
pnpm dev:app    # Main app on :3000
pnpm dev:admin  # Admin on :3001
pnpm dev:web    # Marketing on :3002
```

## Local HTTPS Setup (Optional)

For HTTPS development with custom domains:

1. Install mkcert:
   ```bash
   brew install mkcert
   mkcert -install  # Run in terminal, needs sudo
   ```

2. Run setup:
   ```bash
   pnpm setup       # Sets up hosts file and generates certificates
   ```

3. Start development:
   ```bash
   pnpm dev:all     # Starts nginx proxy + all apps
   ```

Access via:
- https://woorden.local
- https://app.woorden.local  
- https://admin.woorden.local

## Test Accounts

After setup, you can create test accounts via the registration page at http://localhost:3000/auth/register (or https://app.woorden.local/auth/register with HTTPS)

## Troubleshooting

### "Failed to sign up" Error
- Check that all tables are created in Supabase
- Verify RLS policies are enabled
- Check Supabase logs for specific errors

### Authentication Issues
- Ensure your Supabase URL and anon key are correct
- Check that email provider is enabled in Supabase

### Database Errors
- Verify all tables exist
- Check that triggers and functions were created
- Ensure RLS is enabled on protected tables