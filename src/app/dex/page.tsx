'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { cardLoader } from '@/lib/cardLoader';
import { useTranslations } from 'next-intl';
import { Card, PokemonCard, TrainerCard } from '@/types/game';
import { SimpleCard } from '@/components/game/SimpleCard';
import { Paginator } from '@/components/ui/Paginator';
import {
  SearchFilters,
  type FilterState,
} from '@/components/dex/SearchFilters';

export default function DexPage() {
  const tUI = useTranslations('ui');
  const router = useRouter();

  const [allCards, setAllCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    filterSet: 'all',
    filterPokemonType: 'all',
    filterType: 'all',
    filterRarity: -1,
  });

  const CARDS_PER_PAGE = 120;

  const handleCardClick = (card: Card) => {
    const setId = card.set.replace('classic/', '');
    router.push(`/dex/classic/${setId}/${card.id}`);
  };

  const filteredCards = useMemo(() => {
    let filtered = allCards;

    if (filters.searchQuery) {
      const formattedQuery = filters.searchQuery
        .trim()
        .toLowerCase()
        .replaceAll(' ', '_');
      filtered = filtered.filter(card =>
        card.name.toLowerCase().includes(formattedQuery)
      );
    }

    if (filters.filterSet !== 'all') {
      filtered = filtered.filter(card => {
        const setId = card.set.split('/').pop();
        return setId === filters.filterSet;
      });
    }

    if (filters.filterType !== 'all') {
      filtered = filtered.filter(card => {
        if (card.type === filters.filterType) {
          return true;
        }
        if (card.type === 'trainer') {
          return (card as TrainerCard).trainerType === filters.filterType;
        }
        return false;
      });
    }

    if (filters.filterPokemonType !== 'all') {
      filtered = filtered.filter(
        card =>
          card.type === 'pokemon' &&
          (card as PokemonCard).pokemonType === filters.filterPokemonType
      );
    }

    if (filters.filterRarity >= 0) {
      filtered = filtered.filter(card => card.rarity === filters.filterRarity);
    }

    return filtered;
  }, [allCards, filters]);

  const totalPages = Math.ceil(filteredCards.length / CARDS_PER_PAGE);

  const paginatedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    const endIndex = startIndex + CARDS_PER_PAGE;
    console.log('card example', filteredCards[0]);
    return filteredCards.slice(startIndex, endIndex);
  }, [filteredCards, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

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
            {filteredCards.length} of {allCards.length} cards
            {totalPages > 1 && (
              <span className="ml-2">
                (Page {currentPage} of {totalPages})
              </span>
            )}
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
            {filteredCards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No cards found</p>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your filters
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {paginatedCards.map(card => (
                    <div
                      key={`${card.set}-${card.id}`}
                      className="transition-transform hover:scale-105 cursor-pointer"
                      onClick={() => handleCardClick(card)}
                    >
                      <SimpleCard card={card} className="w-full" />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mt-8"
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* TODO: Add card detail modal here */}
    </div>
  );
}
