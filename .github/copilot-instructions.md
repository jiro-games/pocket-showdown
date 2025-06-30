# Pocket Showdown - Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Pokemon TCG Pocket web simulator called "Pocket Showdown". The application allows users to test decks, simulate battles, and experiment with card combinations from Pokemon TCG Pocket.

## Technology Stack
- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Management**: JSON-based card sets with dynamic loading
- **Authentication**: NextAuth.js (planned)
- **Database**: PostgreSQL with Prisma (planned)
- **Real-time**: Socket.io for battles (planned)

## Key Features
1. **Card Dex**: Browse, search, and filter all available cards
2. **Deck Builder**: Drag-and-drop interface for creating decks (planned)
3. **Battle Simulator**: Full battle simulation with game rules (planned)
4. **Hand Draw Simulator**: Test opening hands and mulligan scenarios (planned)
5. **User Authentication**: Login/register system (planned)
6. **Ranked System**: Matchmaking and ranking for online battles (planned)
7. **Internationalization**: Multi-language support for card text

## Important Game Rules & Constraints
- **NO Energy Cards**: Pokemon TCG Pocket doesn't use separate Energy cards like traditional TCG
- **20-Card Decks**: TCG Pocket uses exactly 20 cards per deck (not 60 like traditional TCG)
- **Card Limits**: Maximum 2 of each card per deck
- **Energy System**: Energy is managed through Pokemon abilities and trainer cards, not separate cards

## Data Architecture
### Card Database Structure - **IMPLEMENTED**
- **Scalable Design**: JSON files per set in `/src/data/sets/` for thousands of cards ✅
- **Dynamic Loading**: CardDataLoader class with on-demand set loading ✅
- **Internationalization**: All text fields use `LocalizedText` interface ✅
- **Type Safety**: Complete TypeScript definitions with Language type ✅
- **Performance**: Singleton pattern with caching and preloading ✅

### Card Data System - **IMPLEMENTED**
- **JSON Sets**: Individual JSON files per card set (e.g., `genetic-apex.json`) ✅
- **Loader Class**: `CardDataLoader` singleton for all card operations ✅
- **Language Support**: Dynamic language switching with `getLocalizedText()` ✅
- **Backward Compatibility**: Legacy `cards.ts` proxies to new system ✅
- **Search & Filter**: Localized search across all loaded sets ✅

### Current Implementation Status
- **Card Types**: Pokemon and Trainer cards only (no Energy cards) ✅
- **Sample Data**: Genetic Apex set with localized content ✅
- **Dex Integration**: Full language-aware browsing interface ✅
- **Component Support**: Card component with internationalization ✅

### Card Data Format
```typescript
interface LocalizedText {
  en: string;
  es?: string;
  ja?: string;
  // ... other languages
}

interface Card {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  // ... other properties
}
```

## Development Guidelines - **UPDATED**
- Use TypeScript for all components and utilities ✅
- Follow React/Next.js best practices ✅
- Implement responsive design for mobile and desktop ✅
- Use Tailwind CSS for styling with component-based approach ✅
- Maintain clean separation between game logic and UI components ✅
- Support internationalization from the start ✅
- Optimize for both mobile and desktop experiences ✅
- **Use JSON-based data loading for scalability** ✅
- **Always use CardDataLoader for card data access** ✅
- **Support Language type and getLocalizedText() everywhere** ✅

## Code Style
- Use functional components with hooks
- Implement proper TypeScript types for all game entities (cards, decks, battles)
- Use meaningful variable and function names
- Add JSDoc comments for complex game logic functions
- Follow Next.js file structure conventions
- Prefer composition over inheritance
- Use the `CardDataLoader` singleton for all card data access

## Important Vision & Goals
- **Educational Focus**: Simulation and testing environment, not a replacement for the official game
- **No Special Artwork**: Only default card artwork to avoid copyright issues
- **Competitive Validity**: Results should transfer to real game knowledge
- **Scalability**: Architecture must support thousands of cards and many users
- **International Audience**: Support multiple languages from day one
- **Mobile-First**: Primary target is mobile users (matching TCG Pocket's audience)
- **Performance**: Fast loading and smooth interactions across all devices

## Legal Compliance
- Only use default card artwork (no special/rare art cards)
- Focus on gameplay simulation, not collectible aspects
- Ensure compliance with fair use (educational/simulation purpose)
- Not affiliated with The Pokémon Company or Nintendo

## Future Architecture Considerations
- Plan for backend API integration when scaling
- Design state management for real-time multiplayer
- Consider caching strategies for card data
- Plan for user-generated content (deck sharing, tournaments)
- Design for analytics and usage tracking
