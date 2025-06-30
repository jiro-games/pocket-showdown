import { Card, LocalizedText, Language, CardSetInfo } from '@/types/game';

// Re-export Language for convenience
export type { Language } from '@/types/game';

// Helper function to get localized text
export function getLocalizedText(text: LocalizedText, language: Language = 'en'): string {
  return text[language] || text.en || Object.values(text)[0] || '';
}

// Card data loader interface
export interface CardSet {
  setInfo: CardSetInfo;
  cards: Card[];
}

// Data loader class for managing card sets
export class CardDataLoader {
  private static instance: CardDataLoader;
  private loadedSets: Map<string, CardSet> = new Map();
  private currentLanguage: Language = 'en';
  
  private constructor() {}
  
  static getInstance(): CardDataLoader {
    if (!CardDataLoader.instance) {
      CardDataLoader.instance = new CardDataLoader();
    }
    return CardDataLoader.instance;
  }
  
  setLanguage(language: Language): void {
    this.currentLanguage = language;
  }
  
  getCurrentLanguage(): Language {
    return this.currentLanguage;
  }
  
  // Load a specific card set
  async loadSet(setId: string): Promise<CardSet> {
    if (this.loadedSets.has(setId)) {
      return this.loadedSets.get(setId)!;
    }
    
    try {
      // Dynamic import of JSON files
      const setData = await import(`@/data/sets/${setId}.json`);
      const cardSet: CardSet = setData.default;
      
      this.loadedSets.set(setId, cardSet);
      return cardSet;
    } catch (error) {
      console.error(`Failed to load card set: ${setId}`, error);
      throw new Error(`Card set "${setId}" not found`);
    }
  }
  
  // Get all cards from loaded sets
  getAllCards(): Card[] {
    const allCards: Card[] = [];
    for (const cardSet of this.loadedSets.values()) {
      allCards.push(...cardSet.cards);
    }
    return allCards;
  }
  
  // Find card by ID across all loaded sets
  getCardById(cardId: string): Card | undefined {
    for (const cardSet of this.loadedSets.values()) {
      const card = cardSet.cards.find(c => c.id === cardId);
      if (card) return card;
    }
    return undefined;
  }
  
  // Search cards with localized text
  searchCards(query: string, language?: Language): Card[] {
    const searchLang = language || this.currentLanguage;
    const lowercaseQuery = query.toLowerCase();
    
    return this.getAllCards().filter(card => {
      const name = getLocalizedText(card.name, searchLang).toLowerCase();
      const description = getLocalizedText(card.description, searchLang).toLowerCase();
      
      return name.includes(lowercaseQuery) || 
             description.includes(lowercaseQuery);
    });
  }
  
  // Filter cards by type
  getCardsByType(type: 'pokemon' | 'trainer'): Card[] {
    return this.getAllCards().filter(card => card.type === type);
  }
  
  // Get available sets
  getLoadedSets(): string[] {
    return Array.from(this.loadedSets.keys());
  }
  
  // Preload essential sets
  async preloadCoreSets(): Promise<void> {
    const coreSets = ['genetic-apex']; // Add more as needed
    
    await Promise.all(
      coreSets.map(setId => this.loadSet(setId).catch(err => 
        console.warn(`Failed to preload set ${setId}:`, err)
      ))
    );
  }
}

// Convenience functions for backward compatibility
export const cardLoader = CardDataLoader.getInstance();

// Initialize with core sets
export async function initializeCardData(): Promise<void> {
  await cardLoader.preloadCoreSets();
}

// Helper functions that maintain current API
export function getAllCards(): Card[] {
  return cardLoader.getAllCards();
}

export function getCardById(id: string): Card | undefined {
  return cardLoader.getCardById(id);
}

export function searchCards(query: string): Card[] {
  return cardLoader.searchCards(query);
}

export function getCardsByType(type: 'pokemon' | 'trainer'): Card[] {
  return cardLoader.getCardsByType(type);
}
