import React from 'react';
import { Card as CardType, PokemonCard, TrainerCard } from '@/types/game';
import {
  getPokemonTemplate,
  getStageIcon,
  getTrainerTemplate,
} from '@/lib/cardTemplates';
import { useTranslations } from 'next-intl';
import { EvolvesFrom } from './EvolvesFrom';

interface CardProps {
  card: CardType;
  className?: string;
}

export function Card({ card, className }: CardProps) {
  const tPokemon = useTranslations('pokemon');

  if (card.type === 'pokemon') {
    const pokemonCard = card as PokemonCard;
    const cardTemplate = getPokemonTemplate(pokemonCard.pokemonType);
    const basicIcon = getStageIcon(0);
    const stage = pokemonCard.stage;

    return (
      <div
        className="relative w-96 aspect-[18/25] bg-cover bg-center p-4 text-black font-pokemon"
        style={{ backgroundImage: `url(${cardTemplate})` }}
      >
        {stage > 0 && <EvolvesFrom card={pokemonCard} />}
        <div className="flex font-bold text-2xl tracking-tight">
          <img
            className={`w-15 h-6 -ml-2 mt-1 ${
              stage === 0 ? 'visible' : 'invisible'
            }`}
            src={basicIcon}
            alt="Stage Icon"
          />
          <div className="ml-1 text-left">{tPokemon(card.name)}</div>
          <div className="ml-auto mr-8 self-end">
            <span className="text-xs mr-1">HP</span>
            {card.hp}
          </div>
        </div>
      </div>
    );
  } else {
    const trainerCard = card as TrainerCard;
    const cardTemplate = getTrainerTemplate(trainerCard.trainerType);

    return (
      <div
        className="w-96 aspect-[18/25] bg-cover bg-center p-4 text-black font-pokemon"
        style={{ backgroundImage: `url(${cardTemplate})` }}
      >
        <div className="flex font-bold text-2xl tracking-tight">
          <div className="ml-14 text-left">Potion</div>
        </div>
      </div>
    );
  }
}
