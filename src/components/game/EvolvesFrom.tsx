import React from 'react';
import { PokemonCard } from '@/types/game';
import { getStageIcon } from '@/lib/cardTemplates';

interface EvolvesFromProps {
  card: PokemonCard;
}

export function EvolvesFrom({ card }: EvolvesFromProps) {
  const stageIcon = getStageIcon(card.stage);

  return (
    <div className="absolute top-[22px] left-3 z-10">
      <img
        className="w-54 h-auto"
        src={stageIcon}
        alt={`Stage ${card.stage} Icon`}
      />
      {/* Future: evolution chain text and pre-evolution image will go here */}
    </div>
  );
}
