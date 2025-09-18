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

  const totalHeaderWidth = 300; // It's actually 352px, but we subtract the stage icon
  const exIconWidth = isExCard ? 40 : 0; // width is 36px, plus 4px from margin
  const margins = 4 + 32; // pokemon-name margin + hp margin-right

  // Minimum width needed for HP section is around 38px (for "HP 0")
  let pokemonNameAvailable = totalHeaderWidth - exIconWidth - margins - 38;

  useEffect(() => {
    if (hpRef.current) {
      const hpWidth = hpRef.current.offsetWidth;

      pokemonNameAvailable = totalHeaderWidth - hpWidth - margins - exIconWidth;
    }
  }, [card.hp, isExCard]);

  useEffect(() => {
    if (nameRef.current) {
      const nameWidth = nameRef.current.offsetWidth;

      if (nameWidth > pokemonNameAvailable) {
        const transformScaleX = pokemonNameAvailable / nameWidth;
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
