'use client';

import { useState, useEffect } from 'react';
import { cardLoader, type Language } from '@/lib/cardLoader';
import { useTranslations, useLocale } from 'next-intl';
import { Card } from '@/types/game';
import {
  SearchFilters,
  type FilterState,
} from '@/components/dex/SearchFilters';

export default function DexPage() {
  const tUI = useTranslations('ui');
  const currentLanguage = useLocale() as Language;

  const [allCards, setAllCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    filterSet: 'all',
    filterPokemonType: 'all',
    filterType: 'all',
    filterRarity: -1,
  });

  // TODO: Add filtered cards state and logic
  // const [filteredCards, setFilteredCards] = useState<Card[]>([]);

  // TODO: Add selected card state for modal
  // const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  // Load cards on mount
  useEffect(() => {
    const loadCards = async () => {
      try {
        setIsLoading(true);
        await cardLoader.preloadCoreSets();
        setAllCards(cardLoader.getAllCards());
      } catch (error) {
        console.error('Failed to load cards:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  // TODO: Add useEffect or useMemo for filtering and sorting cards
  // This will watch filters state and update filteredCards

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">{tUI('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {tUI('card_dex')}
          </h1>
          <div className="text-sm text-gray-300">
            {/* TODO: Show filtered count vs total count */}
            {allCards.length} cards total
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Content Area */}
          <div className="flex-1">
            {/* TODO: Add card grid component here */}
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">Card grid goes here</p>
              <p className="text-gray-500 text-sm mt-2">
                You'll implement the card display logic next
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* TODO: Add card detail modal here */}
    </div>
  );
}
