import React from 'react';
import { PokemonCard } from '@/types/game';
import { getStageIcon } from '@/lib/cardTemplates';
import { usePokemonArtwork } from '@/lib/pokemonArtwork';
import './EvolvesFrom.css';
import { useTranslations } from 'next-intl';

interface EvolvesFromProps {
  card: PokemonCard;
}

export function EvolvesFrom({ card }: EvolvesFromProps) {
  const tPokemon = useTranslations('pokemon');
  const stageIcon = getStageIcon(card.stage);
  const { artworkUrl: preEvolutionArtwork, loading } = usePokemonArtwork(card.preevolution || '', {
    style: 'official',
    fallback: true,
  });

  const fallbackSvg =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE1MCIgZmlsbD0iI2VlZWVlZSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjQiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5Ij5Qb2vDqW1vbjwvdGV4dD48L3N2Zz4=';

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
        {loading ? (
          <div className="evolves-from__loading" />
        ) : (
          <img
            className="evolves-from__image"
            src={preEvolutionArtwork}
            alt={card.preevolution}
            onError={e => {
              (e.target as HTMLImageElement).src = fallbackSvg;
            }}
          />
        )}
        <div className="evolves-from__text">Evolves from {tPokemon(card.preevolution)}</div>
      </div>
    </div>
  );
}
