import React from 'react';
import './CardArtwork.css';

interface CardArtworkProps {
  pokemonName: string;
  isExCard?: boolean;
  className?: string;
}

export function CardArtwork({ pokemonName, isExCard = false, className }: CardArtworkProps) {
  return (
    <div className={`card-artwork ${className || ''}`}>
      <img
        src={`/assets/pokemon/${pokemonName}.png`}
        alt={pokemonName}
        className={`card-artwork__image ${isExCard ? 'card-artwork__image--ex' : ''}`}
      />
    </div>
  );
}
