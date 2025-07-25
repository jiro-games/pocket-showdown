import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function drawCards<T>(
  deck: T[],
  count: number
): { drawn: T[]; remaining: T[] } {
  const drawn = deck.slice(0, count);
  const remaining = deck.slice(count);
  return { drawn, remaining };
}

export function calculateDamage(
  baseDamage: number,
  weakness: boolean = false
): number {
  let damage = baseDamage;

  if (weakness) {
    damage *= 2;
  }

  return damage;
}

export function isValidDeck(
  cards: { cardId: string; quantity: number }[]
): boolean {
  const totalCards = cards.reduce((sum, card) => sum + card.quantity, 0);

  if (totalCards !== 20) return false;

  const hasInvalidQuantity = cards.some(card => card.quantity > 2);
  if (hasInvalidQuantity) return false;

  return true;
}

export function formatCardType(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    grass: 'bg-green-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    lightning: 'bg-yellow-500',
    psychic: 'bg-purple-500',
    fighting: 'bg-orange-600',
    darkness: 'bg-gray-800',
    metal: 'bg-gray-500',
    colorless: 'bg-gray-300',
  };

  return colors[type] || 'bg-gray-400';
}

export function getRarityColor(rarity: number): string {
  const colors: Record<number, string> = {
    0: 'bg-yellow-500',
    1: 'bg-gray-400',
    2: 'bg-green-500',
    3: 'bg-blue-500',
    4: 'bg-purple-600',
  };

  return colors[rarity] || 'bg-gray-400';
}
