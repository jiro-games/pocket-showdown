import React from 'react';
import {
  Card as CardType,
  PokemonCard,
  TrainerCard,
  Language,
} from '@/types/game';
import { cn, getTypeColor, getRarityColor } from '@/lib/utils';

interface CardProps {
  card: CardType;
  language?: Language;
  className?: string;
  onClick?: () => void;
  isSelected?: boolean;
  showDetails?: boolean;
}

export function SimpleCard({
  card,
  className,
  onClick,
  isSelected,
  showDetails = true,
}: CardProps) {
  const isPokemon = card.type === 'pokemon';
  const isTrainer = card.type === 'trainer';

  const getPlaceholderContent = () => {
    if (isPokemon) {
      const pokemonCard = card as PokemonCard;
      const typeEmoji =
        {
          grass: '🌱',
          fire: '🔥',
          water: '💧',
          lightning: '⚡',
          psychic: '🔮',
          fighting: '👊',
          darkness: '🌙',
          metal: '⚙️',
          colorless: '⭐',
        }[pokemonCard.pokemonType] || '⭐';

      return (
        <div
          className={cn(
            'w-full h-full flex items-center justify-center',
            getTypeColor(pokemonCard.pokemonType)
          )}
        >
          <div className="text-center text-white">
            <div className="text-2xl mb-1">{typeEmoji}</div>
            <div className="text-xs font-bold truncate px-1">
              {pokemonCard.name}
            </div>
            <div className="text-xs">{pokemonCard.hp} HP</div>
          </div>
        </div>
      );
    } else if (isTrainer) {
      return (
        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs font-bold truncate px-1">{card.name}</div>
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={cn(
        'relative bg-white rounded-lg shadow-md border-2 transition-all duration-200 cursor-pointer hover:shadow-lg',
        isSelected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-300',
        'w-32 h-44',
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-24 bg-gray-100 rounded-t-lg overflow-hidden">
        {getPlaceholderContent()}

        <div
          className={cn(
            'absolute top-1 right-1 w-3 h-3 rounded-full',
            getRarityColor(card.rarity)
          )}
        />
      </div>

      <div className="p-2 h-20 flex flex-col justify-between">
        <h3 className="text-xs font-bold text-gray-800 truncate">
          {card.name}
        </h3>

        {isPokemon && showDetails && (
          <PokemonCardDetails card={card as PokemonCard} />
        )}

        {isTrainer && showDetails && (
          <TrainerCardDetails card={card as TrainerCard} />
        )}

        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-xs px-2 py-1 rounded text-white font-medium',
              card.type === 'pokemon'
                ? getTypeColor((card as PokemonCard).pokemonType)
                : 'bg-purple-500'
            )}
          >
            {card.type === 'pokemon'
              ? (card as PokemonCard).pokemonType
              : 'trainer'}
          </span>

          {isPokemon && (
            <span className="text-xs font-bold text-red-600">
              {(card as PokemonCard).hp} HP
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PokemonCardDetails({ card }: { card: PokemonCard }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-600">{card.stage}</span>
        {card.attacks.length > 0 && (
          <span className="text-xs font-semibold text-orange-600">
            {card.attacks[0].damage} dmg
          </span>
        )}
      </div>
    </div>
  );
}

function TrainerCardDetails({ card }: { card: TrainerCard }) {
  return (
    <div className="space-y-1">
      <span className="text-xs text-gray-600 capitalize">
        {card.trainerType}
      </span>
    </div>
  );
}
