# Dutch Deck

Dutch Deck is a paid, mobile-first flashcard app that helps people learn Dutch vocabulary. It is planned in [Linear](https://linear.app/lukanin/project/dutch-deck-466f5e58e7cd), which is the shared index for its goals, tasks, and progress. This file holds the product decisions worth keeping in Git; it is not a task list.

An earlier prototype lived in this repository (a Next.js/Supabase monorepo). Its code is retired — Dutch Deck is rebuilt from scratch — but the product decisions below carry forward from it.

## Audience

Adults learning Dutch as a second language, starting with Igor, Rita, and Kate Murzina's friends.

## Learning mechanics

- Card-based practice: show the Dutch word, reveal the translation and detail on demand, rate recall, move on.
- Spaced repetition schedules review so words come back before they're forgotten.
- Cards show word accents (stress) and audio pronunciation, and, for nouns and verbs, the de/het article and regular/irregular conjugation.
- A short placement test or a "start from scratch" option sets a new user's starting level.

## Word content

Content is pre-loaded; users are not expected to type in their own words to get started. Sources:

- The Dutch Duolingo course vocabulary.
- A Dutch NT2 coursebook ("the green and blue book") — confirm the exact title/edition with Igor before importing.
- Frequency word lists covering the top 500, 1000, and 5000 most common Dutch words, independent of any coursebook.
- Photo capture: a user can photograph text (a page, a sign) and pull new words into their deck.

## Design

Minimal, card-based, high-contrast black-and-white. Ultra-large typography, generous white space, and a simple bottom control bar over a busy chrome. [Oppie Flashcards](https://linear.app/lukanin/issue/A-49) is the direct visual reference Igor chose.

## Pricing

One-time payment, not a subscription. An individual tier and a 2-person tier priced at 1.5x the individual price. Exact amounts are undecided.

## Feedback

Before public launch, share the app with Rita and Kate Murzina's friends and collect structured feedback.

## Status

See the [Dutch Deck project](https://linear.app/lukanin/project/dutch-deck-466f5e58e7cd) in Linear for current milestones and tasks.
