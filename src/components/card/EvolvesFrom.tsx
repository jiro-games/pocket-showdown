import React from 'react';
import { PokemonCard } from '@/types/game';
import { getStageIcon } from '@/lib/cardTemplates';
import './EvolvesFrom.css';

interface EvolvesFromProps {
  card: PokemonCard;
}

export function EvolvesFrom({ card }: EvolvesFromProps) {
  const stageIcon = getStageIcon(card.stage);

  return (
    <div className="evolves-from">
      <img className="evolves-from__icon" src={stageIcon} alt={`Stage ${card.stage} Icon`} />
    </div>
  );
}
