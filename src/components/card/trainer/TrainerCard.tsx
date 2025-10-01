import React from 'react';
import { Language, TrainerCard as TrainerCardType } from '@/types/game';
import { getTrainerTemplate } from '@/lib/cardTemplates';
import './TrainerCard.css';
import { useLocale, useTranslations } from 'next-intl';
import { getTranslatedText } from '@/lib/cardText';
import { EnergyText } from '@/components/ui/EnergyText';

interface TrainerCardProps {
  card: TrainerCardType;
  scale: number;
}

export function TrainerCard({ card, scale }: TrainerCardProps) {
  const currentLocale = useLocale() as Language;
  const tTrainer = useTranslations('trainers');
  const cardTemplate = getTrainerTemplate(card.trainerType);

  return (
    <div
      className="trainer__wrapper"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      <img
        className="trainer__image"
        src={`/assets/cards/${card.set}/${card.id}.png`}
        alt={card.name}
      />
      <div
        className="trainer__content"
        style={{
          backgroundImage: `url(${cardTemplate})`,
        }}
      >
        <div className="trainer__header">
          <div className="trainer__name">{tTrainer(card.name)}</div>
        </div>
        <div className="trainer__effect">
          {getTranslatedText(card.description, currentLocale).map((line, index) => (
            <div key={index}>
              <EnergyText text={line || '\u00A0'} />
            </div>
          ))}
        </div>
        <div className="trainer__bottom"></div>
      </div>
    </div>
  );
}
