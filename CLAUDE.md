# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

DutchDeck is a mobile-focused Dutch language learning flashcard app built as a monorepo with pnpm workspaces. The app provides intelligent spaced repetition learning with pre-loaded vocabulary from Duolingo and Nederlands in gang coursebook.

## Architecture

### Monorepo Structure
- `apps/app` - Main learning app (app.dutchdeck.com) - Next.js on port 3000
- `apps/admin` - Admin dashboard (admin.dutchdeck.com) - Next.js on port 3001  
- `apps/web` - Marketing website (dutchdeck.com) - Next.js on port 3002
- `packages/ui` - Shared UI components with shadcn/ui
- `packages/db` - Database types, queries, and Supabase client
- `packages/utils` - Shared utilities

### Tech Stack
- Frontend: React 19 + TypeScript + Next.js 15 + Tailwind CSS 4 + shadcn/ui
- Database: Supabase (PostgreSQL with Row Level Security)
- Authentication: Supabase Auth
- Package Manager: pnpm with workspaces

## Development Commands

### Quick Start
```bash
# Install dependencies
pnpm install

# Run all apps in development
pnpm dev

# Run with HTTPS proxy and auto-open browsers
pnpm dev:all
```

### Individual Apps
```bash
pnpm dev:app     # Main app on localhost:3000
pnpm dev:admin   # Admin on localhost:3001
pnpm dev:web     # Marketing on localhost:3002
```

### Build & Quality
```bash
pnpm build       # Build all apps
pnpm lint        # Lint all apps
pnpm typecheck   # TypeScript checking across all apps
pnpm clean       # Clean build artifacts
```

### Local HTTPS Setup
```bash
pnpm setup       # Setup hosts file + generate SSL certificates
pnpm proxy:start # Start nginx Docker proxy
pnpm proxy:stop  # Stop nginx proxy
```

After HTTPS setup, access via:
- https://dutchdeck.local (marketing)
- https://app.dutchdeck.local (main app)
- https://admin.dutchdeck.local (admin)

## Database

Uses Supabase with schema in `packages/db/src/schema.sql`. Key tables:
- `users` - User profiles (extends Supabase auth.users)
- `words` - Dutch vocabulary with translations, CEFR levels, gender
- `user_progress` - Learning progress tracking per word
- `user_settings` - User preferences and daily goals
- `sources` - Word sources (Duolingo, books, chapters)
- `word_sources` - Many-to-many word-source relationships

## Development Workflow

1. **Check existing code patterns** - Look at neighboring files for conventions
2. **Use shared packages** - UI components from `@dutchdeck/ui`, DB utilities from `@dutchdeck/db`
3. **Follow TypeScript strictly** - All apps have strict TypeScript configs
4. **Test with real data** - Database has comprehensive schema for flashcard learning
5. **Run quality checks** - Always run `pnpm lint` and `pnpm typecheck` before committing
6. **Before committing to Git, always run linter and fix all found errors**

## Key Features in Development

- Flashcard system with swipe gestures
- Spaced repetition algorithm (SM-2)
- Multi-language support (Dutch → English/Russian/etc)
- Progress tracking and streaks
- Assessment test for initial placement
- Admin dashboard for user analytics

## Environment Setup

Requires `.env.local` with Supabase credentials. See `SETUP.md` for complete setup instructions including database schema installation.