'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCardBySetAndId } from '@/lib/cardLoader';
import { Card as CardType } from '@/types/game';
import { Card } from '@/components/card/Card';
import { Button } from '@/components/ui/Button';
import './page.css';

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();

  const [card, setCard] = useState<CardType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setId = params.set as string;
  const cardId = parseInt(params.cardId as string);

  useEffect(() => {
    const loadCard = async () => {
      try {
        const fullSetId = `classic/${setId}`;
        const foundCard = await getCardBySetAndId(fullSetId, cardId);
        setCard(foundCard || null);
      } catch (err) {
        console.error('Error loading card:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (setId && !isNaN(cardId)) {
      loadCard();
    } else {
      setIsLoading(false);
    }
  }, [setId, cardId]);

  if (isLoading) {
    return (
      <div className="card-view card-view--loading">
        <div className="card-view__loading-text">Loading...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="card-view card-view--not-found">
        <Button onClick={() => router.back()} className="card-view__not-found-button">
          ← Back
        </Button>
        <div className="card-view__not-found-text">Card not found</div>
      </div>
    );
  }

  return (
    <div className="card-view">
      <div className="card-view__content">
        <Button onClick={() => router.back()} className="card-view__back-button">
          ← Back
        </Button>

        <div className="card-view__card-container">
          <Card card={card} className="card-view__card" />
        </div>
      </div>
    </div>
  );
}
