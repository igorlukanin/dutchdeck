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

### 4. Configure Email with Resend

1. **Create a Resend account** at https://resend.com
2. **Get your API key** from Resend dashboard
3. **Add and verify your domain** in Resend (or use their testing domain)

4. **Configure Supabase to use Resend:**
   - Go to Supabase Dashboard → Project Settings → Auth
   - Scroll to "SMTP Settings"
   - Enable "Enable Custom SMTP"
   - Enter these settings:
     - **Sender email**: noreply@yourdomain.com (or your verified email)
     - **Sender name**: Woorden (or your app name)
     - **Host**: smtp.resend.com
     - **Port**: 465
     - **Username**: resend
     - **Password**: Your Resend API key (starts with re_)
     - **Secure**: Yes (SSL)
   - Click "Save"

5. **Test the configuration:**
   - Send a test email from Supabase
   - Try signing up with a new account

### 5. Enable Authentication

In Supabase Dashboard:
1. Go to Authentication → Providers
2. Ensure Email provider is enabled
3. Customize email templates:
   - Go to Authentication → Email Templates
   - For each template type (Confirm signup, Reset password, Magic Link):
     - Copy the HTML from the corresponding file in `/email-templates/`
     - Paste into the template editor
     - Save changes

### 5. Run the Development Server

```bash
# Run all apps
pnpm dev:open

# Or run individually
pnpm dev:app    # Main app on :3000
pnpm dev:admin  # Admin on :3001
pnpm dev:web    # Marketing on :3002
```

## Test Accounts

After setup, you can create test accounts via the registration page at http://localhost:3000/auth/register

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