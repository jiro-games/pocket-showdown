// Core game types for Pokemon TCG Pocket simulator

// Internationalization support
export interface LocalizedText {
  en: string;
  es?: string;
  ja?: string;
  fr?: string;
  de?: string;
  [key: string]: string | undefined;
}

// Language types for better type safety
export type Language = 'en' | 'es' | 'ja' | 'fr' | 'de';

// Card set metadata
export interface CardSetInfo {
  id: string;
  name: LocalizedText;
  releaseDate: string;
  totalCards: number;
  description?: LocalizedText;
}

export interface Card {
  id: string;
  name: LocalizedText;
  type: CardType;
  rarity: Rarity;
  set: string;
  cost?: number; // Energy cost
  hp?: number; // For Pokemon cards
  damage?: number; // For attack damage
  description: LocalizedText;
  imageUrl: string;
  // Metadata for better organization
  cardNumber?: string;
  artist?: string;
  releaseDate?: string;
}

export interface PokemonCard extends Card {
  type: 'pokemon';
  hp: number;
  pokemonType: PokemonType;
  stage: PokemonStage;
  attacks: Attack[];
  weakness?: PokemonType;
  resistance?: PokemonType;
  retreatCost: number;
  evolvesFrom?: string; // Card ID
}

export interface TrainerCard extends Card {
  type: 'trainer';
  trainerType: TrainerType;
  effect: LocalizedText;
}

// Note: Pokemon TCG Pocket doesn't use separate Energy cards
// Energy is managed through Pokemon abilities and trainer cards

export interface Attack {
  name: LocalizedText;
  cost: PokemonType[];
  damage: number;
  effect?: LocalizedText;
}

export interface Deck {
  id: string;
  name: string;
  cards: DeckCard[];
  userId: string;
  isValid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeckCard {
  cardId: string;
  quantity: number;
}

export interface GameState {
  id: string;
  players: Player[];
  currentPlayer: string;
  phase: GamePhase;
  turn: number;
  winner?: string;
  status: GameStatus;
}

export interface Player {
  id: string;
  name: string;
  deck: Card[];
  hand: Card[];
  field: PokemonSlot[];
  bench: PokemonSlot[];
  discardPile: Card[];
  prizeCards: Card[];
  energy: number; // Total energy points in TCG Pocket
}

export interface PokemonSlot {
  pokemon?: PokemonCard;
  attachedEnergy: number; // In TCG Pocket, energy is just a count
  damage: number;
  statusEffects: StatusEffect[];
}

export type CardType = 'pokemon' | 'trainer';
// Note: Pokemon TCG Pocket doesn't use separate Energy cards

export type PokemonType = 
  | 'grass' | 'fire' | 'water' | 'lightning' | 'psychic' 
  | 'fighting' | 'darkness' | 'metal' | 'colorless';

export type PokemonStage = 'basic' | 'stage1' | 'stage2';

export type TrainerType = 'supporter' | 'item' | 'stadium';

export type Rarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare';

export type GamePhase = 
  | 'setup' | 'draw' | 'main' | 'attack' | 'end';

export type GameStatus = 
  | 'waiting' | 'active' | 'finished' | 'cancelled';

export type StatusEffect = 
  | 'poisoned' | 'burned' | 'asleep' | 'paralyzed' | 'confused';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  ranking: number;
  wins: number;
  losses: number;
  createdAt: Date;
}

export interface BattleResult {
  id: string;
  winner: string;
  loser: string;
  gameState: GameState;
  duration: number; // in seconds
  createdAt: Date;
}
