import React, { useRef, useEffect, use } from 'react';
import { PokemonCard } from '@/types/game';
import { getStageIcon } from '@/lib/cardTemplates';
import './PokemonHeader.css';

interface PokemonHeaderProps {
  card: PokemonCard;
  name: string;
  isExCard: boolean;
}

export function PokemonHeader({ card, name, isExCard }: PokemonHeaderProps) {
  const basicIcon = getStageIcon(0);
  const stage = card.stage;
  const hpRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  // Code needed to shrink long Pokemon names
  const totalSpace = 264 - (isExCard ? 40 : 0);

  // Minimum width needed for HP section is around 38px (for "HP 0")
  let spaceAvailable = totalSpace - 38;

  useEffect(() => {
    if (hpRef.current) {
      const hpWidth = hpRef.current.offsetWidth;

      spaceAvailable = totalSpace - hpWidth;
    }
  }, [card.hp, isExCard]);

  useEffect(() => {
    if (nameRef.current) {
      const nameWidth = nameRef.current.offsetWidth;

      if (nameWidth > spaceAvailable) {
        const transformScaleX = spaceAvailable / nameWidth;
        nameRef.current.style.transform = `scaleX(${transformScaleX})`;

        const negativeMargin = nameWidth * (1 - transformScaleX);
        nameRef.current.style.marginRight = `-${negativeMargin}px`;
      }
    }
  }, [name, card.prefix, isExCard]);

  return (
    <div className="card__header">
      <img
        className={`card__stage-icon ${stage > 0 ? 'card__stage-icon--invisible' : ''}`}
        src={basicIcon}
        alt="Stage Icon"
      />
      <div className="card__pokemon-name">
        <div className="card__pokemon-name-text" ref={nameRef}>
          {card.prefix && <span className="card__pokemon-prefix">{card.prefix}</span>}
          {name}
        </div>
        {isExCard && <img src="/assets/icons/ex-icon.webp" alt="EX" className="card__ex-icon" />}
      </div>
      <div className="card__hp" ref={hpRef}>
        <span className="card__hp-label">HP</span>
        {card.hp}
      </div>
    </div>
  );
}
