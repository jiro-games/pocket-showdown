export type Language = 'en' | 'es' | 'ja' | 'fr' | 'de';

export interface CardSetInfo {
  id: string;
  name: string;
  releaseDate: string;
  totalCards: number;
  description: string;
}

export interface Card {
  id: number;
  set: string;
  name: string;
  type: CardType;
  rarity: number;
  hp?: number;
  tags?: string[];
  imageUrl?: string;
  artist?: string;
  packs?: string[];
}

export interface PokemonCard extends Card {
  type: 'pokemon';
  hp: number;
  pokemonType: PokemonType;
  stage: PokemonStage;
  preevolution?: string;
  ability?: Ability;
  attacks: Attack[];
  weakness?: PokemonType;
  retreatCost: number;
}

export interface TrainerCard extends Card {
  type: 'trainer';
  trainerType: TrainerType;
  effect: Effect[];
  flipFor?: string;
  target?: string;
}

export interface Ability {
  name: string;
  activate?: string;
  effect: Effect[];
}

export interface Attack {
  name: string;
  cost: PokemonType[];
  damage: number;
  effect?: Effect[];
}

export interface Effect {
  type: string;
  amount?: number | string;
  target?: string;
  source?: string;
  energyType?: PokemonType;
  [key: string]: any;
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
  energy: number;
}

export interface PokemonSlot {
  pokemon?: PokemonCard;
  attachedEnergy: PokemonType[];
  damage: number;
  statusEffects: StatusEffect[];
}

export type CardType = 'pokemon' | 'trainer';

export const POKEMON_TYPES = [
  'grass',
  'fire',
  'water',
  'lightning',
  'psychic',
  'fighting',
  'darkness',
  'metal',
  'colorless',
] as const;

export type PokemonType = (typeof POKEMON_TYPES)[number];

export type PokemonStage = 'basic' | 'stage1' | 'stage2';

export type TrainerType = 'supporter' | 'item' | 'tool';

export type GameStatus = 'waiting' | 'active' | 'finished' | 'cancelled';

export type StatusEffect =
  | 'poisoned'
  | 'burned'
  | 'asleep'
  | 'paralyzed'
  | 'confused';

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
  duration: number;
  createdAt: Date;
}
