import React from 'react';
import { PokemonCard } from '@/types/game';
import { getStageIcon } from '@/lib/cardTemplates';
import './EvolvesFrom.css';
import { useTranslations } from 'next-intl';

interface EvolvesFromProps {
  card: PokemonCard;
}

export function EvolvesFrom({ card }: EvolvesFromProps) {
  const tPokemon = useTranslations('pokemon');
  const stageIcon = getStageIcon(card.stage);

  if (!card.preevolution) {
    return null;
  }

  return (
    <div className="evolves-from">
      <div
        className="evolves-from__wrapper"
        style={{ backgroundImage: `url(${stageIcon})` }}
        role="img"
        aria-label={`Stage ${card.stage} Icon`}
      >
        <img
          className="evolves-from__image"
          src={`/assets/pokemon/${card.preevolution}.png`}
          alt={card.preevolution}
        />
        <div className="evolves-from__text">Evolves from {tPokemon(card.preevolution)}</div>
      </div>
    </div>
  );
}
