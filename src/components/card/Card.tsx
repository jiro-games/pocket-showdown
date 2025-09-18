import React, { useRef, useEffect, useState } from 'react';
import { Card as CardType, PokemonCard, TrainerCard } from '@/types/game';
import { getPokemonTemplate, getStageIcon, getTrainerTemplate } from '@/lib/cardTemplates';
import { useTranslations } from 'next-intl';
import { EvolvesFrom } from './EvolvesFrom';
import { CardArtwork } from './CardArtwork';
import './Card.css';

interface CardProps {
  card: CardType;
  className?: string;
}

export function Card({ card, className }: CardProps) {
  const tPokemon = useTranslations('pokemon');
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const baseCardWidth = 384;
        setScale(containerWidth / baseCardWidth);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  if (card.type === 'pokemon') {
    const pokemonCard = card as PokemonCard;
    const cardTemplate = getPokemonTemplate(pokemonCard.pokemonType);
    const basicIcon = getStageIcon(0);
    const stage = pokemonCard.stage;

    const isExCard = card.name.endsWith('_ex');
    const basePokemonName = isExCard ? card.name.slice(0, -3) : card.name;
    const pokemonNameForArtwork = card.form ? `${basePokemonName}-${card.form}` : basePokemonName;
    const textColorClass =
      pokemonCard.pokemonType === 'darkness' ? 'card__content--dark' : 'card__content--light';

    const nameRef = useRef<HTMLDivElement>(null);
    const nameTextRef = useRef<HTMLSpanElement>(null);
    const shrinkName = () => {
      if (!nameTextRef.current) return;
      nameTextRef.current.style.removeProperty("--shrink-factor");

      if (!nameRef.current) return;

      const availableWidth = nameRef.current.getBoundingClientRect().width;
      const requiredWidth = nameTextRef.current.getBoundingClientRect().width;

      const shrinkFactor = availableWidth / requiredWidth;
      if (shrinkFactor && shrinkFactor < 1) {
        nameTextRef.current.style.setProperty("--shrink-factor", String(shrinkFactor));
      }

      console.log({ availableWidth, requiredWidth, shrinkFactor });
    };

    useEffect(shrinkName);

    return (
      <div ref={containerRef} className={`card ${className || ''}`}>
        <div
          className={`card__content ${textColorClass}`}
          style={{
            backgroundImage: `url(${cardTemplate})`,
            transform: `scale(${scale})`,
          }}
        >
          {stage > 0 && <EvolvesFrom card={pokemonCard} />}
          {card.tags?.includes('ultra_beast') && (
            <img
              src="/assets/icons/ultra-beast.webp"
              alt="Ultra Beast"
              className="card__ultra-beast"
            />
          )}
          <div className="card__header">
            <img
              onLoad={shrinkName}
              className={`card__stage-icon ${stage > 0 ? 'card__stage-icon--invisible' : ''}`}
              src={basicIcon}
              alt="Stage Icon"
            />
            <div ref={nameRef} className="card__pokemon-name">
              <span ref={nameTextRef} className="card__pokemon-name-text">
                {card.prefix && <span className="card__pokemon-prefix">{card.prefix}</span>}
                {tPokemon(basePokemonName)}
              </span>
            </div>
            <div className="card__info">
              {isExCard && (
                <img onLoad={shrinkName} src="/assets/icons/ex-icon.webp" alt="EX" className="card__ex-icon" />
              )}
              <div className="card__hp">
                <span className="card__hp-label">HP</span>
                {card.hp}
              </div>
            </div>
          </div>

          <CardArtwork pokemonName={pokemonNameForArtwork} isExCard={isExCard} />
        </div>
      </div>
    );
  } else {
    const trainerCard = card as TrainerCard;
    const cardTemplate = getTrainerTemplate(trainerCard.trainerType);

    return (
      <div ref={containerRef} className={`card ${className || ''}`}>
        <div
          className="card__trainer-content"
          style={{
            backgroundImage: `url(${cardTemplate})`,
            transform: `scale(${scale})`,
          }}
        >
          <div className="card__header">
            <div className="card__trainer-name">Potion</div>
          </div>
        </div>
      </div>
    );
  }
}
