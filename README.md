# Dutch Learning Flashcards App

## Overview

A mobile-focused web application designed exclusively for Dutch language learners. The app provides an intelligent flashcard system with pre-loaded vocabulary from popular learning resources, adaptive learning algorithms, and comprehensive word information.

## Key Features

### Core Functionality
- **Pre-loaded Content**: All vocabulary from Duolingo Dutch course and Nederlands in gang coursebook
- **Smart Placement**: Initial test to determine user's starting level
- **Adaptive Learning**: Automatic progression based on performance
- **Rich Word Information**:
  - Dutch word display
  - Translation on reveal
  - De/het articles for nouns
  - Regular/irregular verb indicators
  - Usage examples in context

### User Experience
- Mobile-first design optimized for on-the-go learning
- No manual word entry required - everything pre-loaded
- Sync with Duolingo progress (chapter/word count)
- Performance-based automatic advancement

### Business Model
- One-time payment model
- Free SEO-optimized website for marketing and conversion
- Content marketing strategy to attract organic traffic

## Tech Stack
- **Frontend**: React + TypeScript + Tailwind CSS + shadcn/ui
- **Hosting**: Vercel
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payment Processing**: Paddle (future phase)
- **AI/ML**: OpenAI API or similar for translations, audio generation, and content enrichment
- **Analytics**: PostHog + custom metrics tracking

## Target Audience
Dedicated Dutch language learners who want a comprehensive, structured approach to vocabulary acquisition with minimal setup effort.

## Pricing
- **Individual**: €39 one-time payment
- **Family (5 accounts)**: €79 one-time payment

## TODO

### Development

#### Phase 1: MVP (Core Learning Experience)
- [ ] **Project Setup**
  - [ ] Initialize monorepo structure with pnpm workspaces
  - [ ] Create three Next.js apps:
    - [ ] `/apps/app` - Main learning app (app.woorden.nl)
    - [ ] `/apps/admin` - Admin dashboard (admin.woorden.nl)
    - [ ] `/apps/web` - Marketing website (woorden.nl)
  - [ ] Set up shared packages:
    - [ ] `/packages/ui` - Shared UI components
    - [ ] `/packages/db` - Database types and queries
    - [ ] `/packages/utils` - Shared utilities
  - [ ] Configure Tailwind CSS + shadcn/ui across all apps
  - [ ] Set up Supabase project and authentication
  - [ ] Set up Vercel deployment pipeline with preview URLs
  - [ ] Configure PostHog for analytics
  - [ ] Set up development environment and Git repository

- [ ] **Admin Dashboard**
  - [ ] Simple admin authentication (your account only)
  - [ ] User statistics (total users, active users)
  - [ ] Learning metrics (words learned, time spent)
  - [ ] User activity feed
  - [ ] Basic analytics charts

- [ ] **Database Schema Design**
  - [ ] Users table (email, name, languages, created_at)
  - [ ] Words table (dutch, english, russian, gender, verb_type, cefr_level, source)
  - [ ] User progress table (user_id, word_id, familiarity_score, last_reviewed, times_reviewed)
  - [ ] User settings (active_word_count, daily_goal, interface_language)
  - [ ] Sources table (books, chapters, Duolingo buckets)
  - [ ] Word-source relationships

- [ ] **Authentication System**
  - [ ] Email/password registration and login
  - [ ] Password reset functionality
  - [ ] Session management
  - [ ] Protected routes

- [ ] **Assessment Test**
  - [ ] Random selection of 20 words with increasing difficulty
  - [ ] Swipe up = know, tap/hold = show translation
  - [ ] Algorithm to determine starting level based on responses
  - [ ] Skip test option ("start from scratch")

- [ ] **Core Flashcard System**
  - [ ] Flashcard UI with Dutch word display
  - [ ] Tap to reveal translations (multiple languages)
  - [ ] Tap-and-hold for extended info (de/het, verb type, examples)
  - [ ] Swipe gestures for navigation
  - [ ] Mobile-optimized touch interactions

- [ ] **Spaced Repetition Algorithm**
  - [ ] Implement SM-2 or similar algorithm
  - [ ] Track familiarity scores per word
  - [ ] Calculate next review dates
  - [ ] Daily word queue generation

- [ ] **Multi-language Support**
  - [ ] Language selection during onboarding
  - [ ] Store user's known languages
  - [ ] Display translations in all selected languages
  - [ ] Quick language add/change from flashcard view

- [ ] **Progress Tracking**
  - [ ] Words learned counter
  - [ ] Current streak tracking
  - [ ] Daily/weekly statistics
  - [ ] Accuracy metrics
  - [ ] CEFR level progress indicator

- [ ] **Basic UI/UX**
  - [ ] Clean black-and-white design with Dutch flag accents
  - [ ] Mobile-first responsive design
  - [ ] Loading states and error handling
  - [ ] Offline mode basics (practice without saving)

#### Phase 2: Content & Data Tools
- [ ] **Word Extraction Scripts**
  - [ ] OCR tool for book page screenshots
  - [ ] Duolingo screenshot parser
  - [ ] Word deduplication and normalization
  - [ ] Manual review interface for extracted words
  
- [ ] **Word Data Management**
  - [ ] Build word import tool for bulk loading
  - [ ] Duolingo word list processor (2500 words)
  - [ ] Nederlands in gang word processor
  - [ ] CEFR level assignment tool
  - [ ] De/het gender detection and storage

- [ ] **AI Content Generation Pipeline**
  - [ ] Translation generation for all supported languages
  - [ ] Usage example generation
  - [ ] Audio pronunciation generation
  - [ ] Batch processing capabilities
  - [ ] Quality validation tools

- [ ] **Content Enrichment**
  - [ ] Add word categories/themes
  - [ ] Link words to source materials and chapters
  - [ ] Generate contextual sentences
  - [ ] Add common collocations

#### Phase 3: Social Features
- [ ] **User Profiles**
  - [ ] Public profile pages
  - [ ] Avatar/photo upload
  - [ ] Privacy settings

- [ ] **Friends System**
  - [ ] Friend invitations via link/email
  - [ ] Friend list management
  - [ ] Activity feed

- [ ] **Social Progress Sharing**
  - [ ] View friends' streaks and progress
  - [ ] Congratulation messages
  - [ ] Progress milestones sharing

- [ ] **Leaderboards**
  - [ ] Friends leaderboard
  - [ ] Language-specific leaderboards (English speakers, Russian speakers, etc.)
  - [ ] Weekly/monthly/all-time views

#### Phase 4: Advanced Features
- [ ] **Enhanced Metrics**
  - [ ] Time spent learning (5-10 min daily goal)
  - [ ] Consistency score with calendar visualization
  - [ ] Words mastered vs learned distinction
  - [ ] Review efficiency tracking
  - [ ] Detailed progress charts

- [ ] **Gamification**
  - [ ] Achievement badges system
  - [ ] Milestone celebrations (100 words, A1 complete, etc.)
  - [ ] Badge image generation
  - [ ] Progress animations

- [ ] **Additional Word Sources**
  - [ ] Nederlands in actie series
  - [ ] Additional coursebook integrations
  - [ ] Chapter-based organization

#### Phase 5: Topics & Advanced Content
- [ ] **Dialogue/Phrase System**
  - [ ] Situational dialogues (plane, train, gemeente, etc.)
  - [ ] Searchable phrase database
  - [ ] Topic-based organization
  - [ ] Add to active learning list functionality

- [ ] **Advanced Search**
  - [ ] Multi-language search
  - [ ] Search in Dutch and all user languages
  - [ ] Filter by source, topic, CEFR level
  - [ ] Search history

- [ ] **User-Generated Content**
  - [ ] Add custom words
  - [ ] Photo upload for word extraction
  - [ ] AI-powered word detection from images
  - [ ] Personal word lists

#### Phase 6: Extended Features
- [ ] **Payment Integration**
  - [ ] Paddle account setup and configuration
  - [ ] Checkout flow implementation
  - [ ] License key system for family accounts
  - [ ] Payment confirmation emails
  - [ ] Subscription management UI

- [ ] **Premium Features (Future Tiers)**
  - [ ] Unlimited custom words
  - [ ] Advanced statistics
  - [ ] Export capabilities
  - [ ] Priority AI processing
  - [ ] Voice recognition for pronunciation practice
  - [ ] Reverse flashcards (non-Dutch to Dutch with voice input)

- [ ] **External Content Links**
  - [ ] YouTube video suggestions
  - [ ] Wikipedia article links
  - [ ] External resource curation

- [ ] **Additional Languages**
  - [ ] Polish, Turkish, German, Italian, Ukrainian, Spanish, French, Portuguese
  - [ ] Language addition tools
  - [ ] Automated translation pipeline

### Marketing

#### Phase 1: Foundation
- [ ] **Brand Development**
  - [ ] Research Dutch-friendly app names
    - [ ] Check domain availability for: Woordje, Taalmaatje, Dutchly, Woordly, Kaartje
    - [ ] Check domain availability for: Woorden, Taal, Leren, Kaartjes
    - [ ] Check domain availability for: Woordkaart, Leerhulp, Nederlandje
    - [ ] Check domain availability for: LerenNL, SpreekNL
    - [ ] Research trademark availability
    - [ ] Test name pronunciation with non-Dutch speakers
    - [ ] Get feedback from beta testers on name preferences
  - [ ] Domain registration (.nl and .com)
  - [ ] Logo and visual identity
  - [ ] Brand guidelines

- [ ] **Marketing Website Structure**
  - [ ] Landing page with value proposition
  - [ ] Features overview
  - [ ] Pricing page
  - [ ] About/story page
  - [ ] Blog setup

#### Phase 2: SEO Content (Priority Order)
- [ ] **CEFR Level Word Lists**
  - [ ] A1 Dutch words page
  - [ ] A2 Dutch words page
  - [ ] B1 Dutch words page
  - [ ] B2 Dutch words page
  - [ ] Interactive filtering and search

- [ ] **De/Het Checker Tool**
  - [ ] Search functionality
  - [ ] Common de/het mistakes
  - [ ] Rules and patterns explanation
  - [ ] Practice exercises

- [ ] **Verb Conjugation Tables**
  - [ ] Regular verbs conjugation tool
  - [ ] Irregular verbs database
  - [ ] Tense explanations
  - [ ] Search by infinitive or conjugated form

- [ ] **Situational Phrases**
  - [ ] Travel Dutch phrases
  - [ ] Business Dutch
  - [ ] Daily conversations
  - [ ] Government/gemeente Dutch

- [ ] **Grammar Guides**
  - [ ] Word order rules
  - [ ] Common mistakes
  - [ ] Pronunciation guide
  - [ ] Dutch vs English comparisons

#### Phase 3: Content Marketing
- [ ] **Blog Content Strategy**
  - [ ] Learning tips and tricks
  - [ ] Success stories
  - [ ] Dutch culture articles
  - [ ] App updates and features

- [ ] **Email Marketing**
  - [ ] Newsletter setup
  - [ ] Welcome email series
  - [ ] Learning tips automation
  - [ ] Re-engagement campaigns

#### Phase 4: Growth Marketing
- [ ] **Analytics Setup**
  - [ ] Google Analytics
  - [ ] Conversion tracking
  - [ ] User behavior analysis
  - [ ] A/B testing framework

- [ ] **Social Media Presence**
  - [ ] Instagram for daily Dutch words
  - [ ] Twitter/X for quick tips
  - [ ] YouTube for pronunciation guides
  - [ ] TikTok for viral Dutch content

- [ ] **Community Building**
  - [ ] Discord/Slack community
  - [ ] User testimonials
  - [ ] Referral program
  - [ ] Ambassador program

- [ ] **Partnerships**
  - [ ] Dutch language schools
  - [ ] Expat communities
  - [ ] Integration with other learning tools
  - [ ] Affiliate partnerships

#### Phase 5: Optimization
- [ ] **SEO Optimization**
  - [ ] Technical SEO audit
  - [ ] Link building strategy
  - [ ] Local SEO for Netherlands
  - [ ] International SEO expansion

- [ ] **Conversion Optimization**
  - [ ] Landing page A/B tests
  - [ ] Pricing experiments
  - [ ] Onboarding flow optimization
  - [ ] Retention analysis

## Notes for Future Consideration
- Challenges between friends feature
- Topic-based spaced repetition methodology
- Regional Dutch variations (if demand exists)
- API for third-party integrations
- White-label solutions for schools
- Desktop app version
- Native mobile apps (iOS/Android)

## Beta Testing Plan
- **Phase 1**: 5 friends (personal network)
- **Phase 2**: 5 colleagues 
- **Feedback collection**: Weekly surveys + in-app feedback button
- **Iteration cycle**: 2-week sprints with updates

## App Name Ideas
Need to research availability and catchiness:
- **Single Dutch words**: Woorden, Woordje, Taal, Leren, Kaartjes
- **Compound words**: Woordkaart, Taalmaatje, Leerhulp
- **Made-up/Playful**: Woordly, Dutchie, Nederlandje
- **Action-oriented**: LerenNL, SpreekNL

## Technical Notes
- Offline mode: Practice without progress saving (PWA with service workers)
- Word extraction: Use Tesseract.js for OCR or cloud OCR services
- Admin dashboard: Separate /admin route with Supabase RLS