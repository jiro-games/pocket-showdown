import React from 'react';
import { PokemonCard as PokemonCardType } from '@/types/game';
import { getPokemonTemplate } from '@/lib/cardTemplates';
import { EvolvesFrom } from './EvolvesFrom';
import { CardArtwork } from '../CardArtwork';
import { PokemonHeader } from './PokemonHeader';
import './PokemonCard.css';
import { useTranslations } from 'next-intl';
import { CardAbility } from './CardAbility';
import { CardAttack } from './CardAttack';

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
  const pokemonNameForArtwork = card.form ? `${basePokemonName}_${card.form}` : basePokemonName;
  const textColorClass =
    card.pokemonType === 'darkness' ? 'card__content--dark' : 'card__content--light';
  const extraMoveSpace = card.attacks.some(attack => attack.cost.length > 4);

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

      <div className="card__body">
        {card.ability && <CardAbility card={card} />}
        {card.attacks.map((attack, index) => (
          <CardAttack key={index} attack={attack} extraSpace={extraMoveSpace} />
        ))}
      </div>
      <div className="card__weakness-retreat">
        {card.weakness && (
          <div className="card__weakness">
            <img
              src={`/assets/icons/energy/${card.weakness}.webp`}
              alt={card.weakness}
              className="card__weakness-icon"
            />
            +20
          </div>
        )}
        {card.retreatCost > 0 && (
          <div className="card__retreat">
            {Array.from({ length: card.retreatCost }).map((_, idx) => (
              <img
                key={idx}
                src={`/assets/icons/energy/colorless.webp`}
                alt="Colorless Energy"
                className="card__retreat-icon"
              />
            ))}
          </div>
        )}
      </div>
      <div className="card__bottom">
        {/*<div className="card__illustrator">{card.artist}</div>*/}
        {isExCard && (
          <img src="/assets/icons/ex-rule.webp" alt="EX Rule" className="card__ex-rule" />
        )}
      </div>
    </div>
  );
}
