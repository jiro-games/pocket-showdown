# Pocket Showdown 🎮

A Pokemon TCG Pocket web simulator for testing decks, simulating battles, and mastering your strategy.

## 🚀 Features

- **Hand Draw Simulator**: Test opening hands and mulligan scenarios
- **Battle Simulator**: Full battle simulation with game rules
- **Deck Builder**: Create and customize your decks
- **User System**: Authentication and player profiles
- **Rankings**: Competitive matchmaking system
- **Card Database**: Complete Pokemon TCG Pocket card collection

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Components**: Headless UI
- **Build Tool**: Turbopack

## 🎯 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pocket-showdown
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── game/           # Game-specific components
├── data/               # Static data and card database
├── lib/                # Utility functions
├── stores/             # Zustand state management
└── types/              # TypeScript type definitions
```

## 🎴 Card Types

- **Pokemon Cards**: Basic, Stage 1, and Stage 2 Pokemon with attacks and abilities
- **Trainer Cards**: Supporter and Item cards for strategy
- **Energy Cards**: Basic energy types for powering attacks

## 🎲 Game Features

### Deck Testing
- Import/export deck lists
- Opening hand simulation
- Mulligan testing
- Draw consistency analysis

### Battle System
- Turn-based battle mechanics
- Damage calculation with weakness/resistance
- Status effects (poison, burn, sleep, etc.)
- Prize card system

### Competitive Features
- ELO-based ranking system
- Matchmaking by skill level
- Battle history and statistics
- Leaderboards

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

### Adding New Cards

1. Add card data to `src/data/cards.ts`
2. Include card images in `public/cards/`
3. Update card database with proper typing

## 📝 Legal Notice

This is an educational simulator for Pokemon TCG Pocket. This project is not affiliated with The Pokémon Company, Nintendo, or Creatures Inc. All Pokemon names, images, and game mechanics are trademarks of their respective owners.

This simulator:
- Uses only default card artwork (no special/rare art)
- Is for educational and simulation purposes only
- Does not include any monetization features
- Respects intellectual property rights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is for educational purposes only. Please respect intellectual property rights.

---

Built with ❤️ for the Pokemon TCG Pocket community
