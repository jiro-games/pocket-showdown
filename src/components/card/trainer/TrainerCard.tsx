import React from 'react';
import { TrainerCard as TrainerCardType } from '@/types/game';
import { getTrainerTemplate } from '@/lib/cardTemplates';
import './TrainerCard.css';

interface TrainerCardProps {
  card: TrainerCardType;
  scale: number;
}

export function TrainerCard({ card, scale }: TrainerCardProps) {
  const cardTemplate = getTrainerTemplate(card.trainerType);

  return (
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
  );
}
