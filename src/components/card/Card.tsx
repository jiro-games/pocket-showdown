import React, { useRef, useEffect, useState } from 'react';
import {
  Card as CardType,
  PokemonCard as PokemonCardType,
  TrainerCard as TrainerCardType,
} from '@/types/game';
import { PokemonCard } from './pokemon/PokemonCard';
import { TrainerCard } from './trainer/TrainerCard';
import './Card.css';

interface CardProps {
  card: CardType;
  className?: string;
}

export function Card({ card, className }: CardProps) {
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

  return (
    <div ref={containerRef} className={`card ${className || ''}`}>
      {card.type === 'pokemon' ? (
        <PokemonCard card={card as PokemonCardType} scale={scale} />
      ) : (
        <TrainerCard card={card as TrainerCardType} scale={scale} />
      )}
    </div>
  );
}
