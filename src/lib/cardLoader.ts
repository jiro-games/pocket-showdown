import { Card, Language, CardSetInfo } from '@/types/game';

export type { Language } from '@/types/game';

export interface CardSet {
  setInfo: CardSetInfo;
  cards: Card[];
}

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

  async loadSet(setId: string): Promise<CardSet> {
    if (this.loadedSets.has(setId)) {
      return this.loadedSets.get(setId)!;
    }

    try {
      const setData = await import(`../../data/sets/${setId}.json`);
      const rawData = setData.default;

      const cardSet: CardSet = this.convertRawDataToCardSet(rawData, setId);

      this.loadedSets.set(setId, cardSet);
      return cardSet;
    } catch (error) {
      console.error(`Failed to load card set: ${setId}`, error);
      throw new Error(`Card set "${setId}" not found`);
    }
  }

  private convertRawDataToCardSet(rawData: any, setId: string): CardSet {
    const setInfo: CardSetInfo = {
      id: setId,
      name: rawData.setInfo?.name || setId,
      releaseDate: rawData.setInfo?.releaseDate || '',
      totalCards: rawData.cards?.length || 0,
      description: `Card set ${setId}`,
    };

    const cards: Card[] = (rawData.cards || []).map((rawCard: any) => {
      const baseCard: Card = {
        id: Number(rawCard.id),
        set: setId,
        name: String(rawCard.name || 'unknown'),
        type: rawCard.card_type === 'pokemon' ? 'pokemon' : 'trainer',
        rarity: rawCard.rarity || 0,
        hp: rawCard.hp,
        tags: rawCard.tags || [],
        imageUrl: rawCard.imageUrl,
        artist: rawCard.artist,
        packs: rawCard.packs || [],
      };

      if (baseCard.type === 'pokemon') {
        const pokemonCard: any = {
          ...baseCard,
          pokemonType: rawCard.pokemon_type,
          stage: rawCard.stage,
          attacks: this.convertAttacks(rawCard.attacks || []),
          weakness: rawCard.weakness,
          retreatCost: rawCard.retreat_cost || 0,
          preevolution: rawCard.preevolution,
        };

        if (rawCard.ability) {
          pokemonCard.ability = this.convertAbility(rawCard.ability);
        }

        return pokemonCard;
      } else {
        const trainerCard: any = {
          ...baseCard,
          trainerType: rawCard.trainer_type || 'item',
          effect: rawCard.effect || [],
          flipFor: rawCard.flip_for,
          target: rawCard.target,
        };

        return trainerCard;
      }
    });

    return { setInfo, cards };
  }

  private convertAttacks(attacks: any[]): any[] {
    return attacks.map(attack => ({
      name: attack.name || 'Unknown Attack',
      cost: attack.cost || [],
      damage: attack.damage || 0,
      effect: attack.effect || [],
    }));
  }

  private convertAbility(ability: any): any {
    return {
      name: ability.name || 'Unknown Ability',
      activate: ability.activate,
      effect: ability.effect || [],
    };
  }

  getAllCards(): Card[] {
    const allCards: Card[] = [];
    for (const cardSet of this.loadedSets.values()) {
      allCards.push(...cardSet.cards);
    }
    return allCards;
  }

  getCardById(cardId: number): Card | undefined {
    for (const cardSet of this.loadedSets.values()) {
      const card = cardSet.cards.find(c => c.id === cardId);
      if (card) return card;
    }
    return undefined;
  }

  searchCards(query: string, language?: Language): Card[] {
    const searchLang = language || this.currentLanguage;
    const lowercaseQuery = query.toLowerCase();

    return this.getAllCards().filter(card => {
      const name = card.name.toLowerCase();

      return name.includes(lowercaseQuery);
    });
  }

  getCardsByType(type: 'pokemon' | 'trainer'): Card[] {
    return this.getAllCards().filter(card => card.type === type);
  }

  getLoadedSets(): string[] {
    return Array.from(this.loadedSets.keys());
  }

  async preloadCoreSets(): Promise<void> {
    const coreSets = [
      'classic/a1',
      'classic/a1a',
      'classic/a2',
      'classic/a2a',
      'classic/a2b',
      'classic/a3',
      'classic/a3a',
      'classic/a3b',
      'classic/promo_a',
    ];

    await Promise.all(
      coreSets.map(setId =>
        this.loadSet(setId).catch(err =>
          console.warn(`Failed to preload set ${setId}:`, err)
        )
      )
    );
  }
}

export const cardLoader = CardDataLoader.getInstance();

export async function initializeCardData(): Promise<void> {
  await cardLoader.preloadCoreSets();
}

export function getAllCards(): Card[] {
  return cardLoader.getAllCards();
}

export function getCardById(id: number): Card | undefined {
  return cardLoader.getCardById(id);
}

export function searchCards(query: string): Card[] {
  return cardLoader.searchCards(query);
}

export function getCardsByType(type: 'pokemon' | 'trainer'): Card[] {
  return cardLoader.getCardsByType(type);
}
