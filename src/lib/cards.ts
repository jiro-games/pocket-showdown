// Legacy compatibility layer for the new JSON-based card system
// This file is kept for backward compatibility but uses the new CardDataLoader

import { cardLoader } from './cardLoader';
import { Card, PokemonCard, TrainerCard } from '@/types/game';

// Initialize the card loader
cardLoader.preloadCoreSets().catch(err => 
  console.warn('Failed to preload card sets:', err)
);

// Export functions that match the old API
export function getCardById(id: string): Card | undefined {
  return cardLoader.getCardById(id);
}

export function getCardsByType(type: 'pokemon' | 'trainer'): Card[] {
  return cardLoader.getCardsByType(type);
}

export function getCardsBySet(set: string): Card[] {
  return cardLoader.getAllCards().filter(card => card.set === set);
}

export function searchCards(query: string): Card[] {
  return cardLoader.searchCards(query);
}

// Computed properties for backward compatibility
export const pokemonCards: PokemonCard[] = [];
export const trainerCards: TrainerCard[] = [];
export const allCards: Card[] = [];

// Update these arrays when cards are loaded
cardLoader.preloadCoreSets().then(() => {
  const loadedCards = cardLoader.getAllCards();
  
  // Clear and populate arrays
  pokemonCards.length = 0;
  trainerCards.length = 0;
  allCards.length = 0;
  
  pokemonCards.push(...loadedCards.filter(c => c.type === 'pokemon') as PokemonCard[]);
  trainerCards.push(...loadedCards.filter(c => c.type === 'trainer') as TrainerCard[]);
  allCards.push(...loadedCards);
});
