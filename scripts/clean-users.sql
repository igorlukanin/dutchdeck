-- Script to remove all test users from Supabase
-- Run this in Supabase SQL Editor

-- First, delete from dependent tables
DELETE FROM public.user_settings;
DELETE FROM public.user_progress;
DELETE FROM public.users;

-- Also delete from auth schema
DELETE FROM auth.users;

-- Reset any sequences if needed
-- (Add any sequence resets here if you want to start IDs from beginning)

-- Verify cleanup
SELECT 'Auth users:', COUNT(*) FROM auth.users
UNION ALL
SELECT 'Public users:', COUNT(*) FROM public.users
UNION ALL
SELECT 'User settings:', COUNT(*) FROM public.user_settings
UNION ALL
SELECT 'User progress:', COUNT(*) FROM public.user_progress;