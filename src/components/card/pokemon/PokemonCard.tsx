import React from 'react';
import { PokemonCard as PokemonCardType } from '@/types/game';
import { getPokemonTemplate } from '@/lib/cardTemplates';
import { EvolvesFrom } from './EvolvesFrom';
import { CardArtwork } from '../CardArtwork';
import { PokemonHeader } from './PokemonHeader';
import './PokemonCard.css';
import { useTranslations } from 'next-intl';

interface PokemonCardProps {
  card: PokemonCardType;
  scale: number;
}

export function PokemonCard({ card, scale }: PokemonCardProps) {
  const tPokemon = useTranslations('pokemon');
  const cardTemplate = getPokemonTemplate(card.pokemonType);
  const stage = card.stage;

  const isExCard = card.name.endsWith('_ex');
  const basePokemonName = isExCard ? card.name.slice(0, -3) : card.name;
  const pokemonNameForArtwork = card.form ? `${basePokemonName}-${card.form}` : basePokemonName;
  const textColorClass =
    card.pokemonType === 'darkness' ? 'card__content--dark' : 'card__content--light';

  return (
    <div
      className={`card__content ${textColorClass}`}
      style={{
        backgroundImage: `url(${cardTemplate})`,
        transform: `scale(${scale})`,
      }}
    >
      {stage > 0 && <EvolvesFrom card={card} />}
      {card.tags?.includes('ultra_beast') && (
        <img src="/assets/icons/ultra-beast.webp" alt="Ultra Beast" className="card__ultra-beast" />
      )}
      <PokemonHeader card={card} name={tPokemon(basePokemonName)} isExCard={isExCard} />

      <CardArtwork pokemonName={pokemonNameForArtwork} isExCard={isExCard} />
    </div>
  );
}
