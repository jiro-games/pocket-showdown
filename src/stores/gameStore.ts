import { create } from 'zustand';
import { Deck, User } from '@/types/game';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface DeckState {
  decks: Deck[];
  currentDeck: Deck | null;
  addDeck: (deck: Deck) => void;
  updateDeck: (id: string, updates: Partial<Deck>) => void;
  deleteDeck: (id: string) => void;
  setCurrentDeck: (deck: Deck | null) => void;
}

interface GameState {
  isInGame: boolean;
  gameMode: 'decktest' | 'battle' | null;
  opponent: User | null;
  setGameMode: (mode: 'decktest' | 'battle' | null) => void;
  setOpponent: (opponent: User | null) => void;
  startGame: () => void;
  endGame: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export const useDeckStore = create<DeckState>((set) => ({
  decks: [],
  currentDeck: null,
  addDeck: (deck) => set((state) => ({ decks: [...state.decks, deck] })),
  updateDeck: (id, updates) => set((state) => ({
    decks: state.decks.map(deck => 
      deck.id === id ? { ...deck, ...updates } : deck
    ),
  })),
  deleteDeck: (id) => set((state) => ({
    decks: state.decks.filter(deck => deck.id !== id),
    currentDeck: state.currentDeck?.id === id ? null : state.currentDeck,
  })),
  setCurrentDeck: (deck) => set({ currentDeck: deck }),
}));

export const useGameStore = create<GameState>((set) => ({
  isInGame: false,
  gameMode: null,
  opponent: null,
  setGameMode: (mode) => set({ gameMode: mode }),
  setOpponent: (opponent) => set({ opponent }),
  startGame: () => set({ isInGame: true }),
  endGame: () => set({ isInGame: false, gameMode: null, opponent: null }),
}));
