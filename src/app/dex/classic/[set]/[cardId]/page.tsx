'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCardBySetAndId } from '@/lib/cardLoader';
import { Card as CardType } from '@/types/game';
import { Card as SimpleCard } from '@/components/game/Card';
import { Button } from '@/components/ui/Button';

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
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Button onClick={() => router.back()} className="mb-4">
          ← Back
        </Button>
        <div className="text-white">Card not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="px-8">
        <Button onClick={() => router.back()} className="mb-6">
          ← Back
        </Button>

        <div className="flex justify-center">
          <SimpleCard card={card} className="w-48" />
        </div>
      </div>
    </div>
  );
}
