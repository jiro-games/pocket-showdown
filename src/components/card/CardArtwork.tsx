import React from 'react';
import { usePokemonArtwork } from '@/lib/pokemonArtwork';
import { useTranslations } from 'next-intl';
import './CardArtwork.css';

interface CardArtworkProps {
  pokemonName: string;
  isExCard?: boolean;
  className?: string;
}

export function CardArtwork({ pokemonName, isExCard = false, className }: CardArtworkProps) {
  const tPokemon = useTranslations('pokemon');

  const { artworkUrl, loading } = usePokemonArtwork(pokemonName, {
    style: 'official',
    fallback: true,
  });

  const fallbackSvg =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE1MCIgZmlsbD0iI2VlZWVlZSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjQiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5Ij5Qb2vDqW1vbjwvdGV4dD48L3N2Zz4=';

  return (
    <div className={`card-artwork ${className || ''}`}>
      {loading ? (
        <div className="card-artwork__loading">
          <div className="card-artwork__loading-text">Loading...</div>
        </div>
      ) : (
        <img
          src={artworkUrl}
          alt={pokemonName}
          className={`card-artwork__image ${isExCard ? 'card-artwork__image--ex' : ''}`}
          onError={e => {
            (e.target as HTMLImageElement).src = fallbackSvg;
          }}
        />
      )}
    </div>
  );
}
