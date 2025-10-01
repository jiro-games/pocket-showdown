import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
