import { cardLoader } from './cardLoader';
import { Card, PokemonCard, TrainerCard } from '@/types/game';

cardLoader.preloadCoreSets().catch(err => console.warn('Failed to preload card sets:', err));

export function getCardById(id: number): Card | undefined {
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

export const pokemonCards: PokemonCard[] = [];
export const trainerCards: TrainerCard[] = [];
export const allCards: Card[] = [];

cardLoader.preloadCoreSets().then(() => {
  const loadedCards = cardLoader.getAllCards();

  pokemonCards.length = 0;
  trainerCards.length = 0;
  allCards.length = 0;

  pokemonCards.push(...(loadedCards.filter(c => c.type === 'pokemon') as PokemonCard[]));
  trainerCards.push(...(loadedCards.filter(c => c.type === 'trainer') as TrainerCard[]));
  allCards.push(...loadedCards);
});
