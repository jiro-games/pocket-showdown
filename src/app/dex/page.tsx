'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { cardLoader } from '@/lib/cardLoader';
import { useTranslations } from 'next-intl';
import { Card as CardType, PokemonCard, TrainerCard } from '@/types/game';
import { Card } from '@/components/card/Card';
import { Paginator } from '@/components/ui/Paginator';
import { SearchFilters, type FilterState } from '@/components/dex/SearchFilters';
import './page.css';

export default function DexPage() {
  const tUI = useTranslations('ui');
  const router = useRouter();

  const [allCards, setAllCards] = useState<CardType[]>([]);
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

  const handleCardClick = (card: CardType) => {
    const setId = card.set.replace('classic/', '');
    router.push(`/dex/classic/${setId}/${card.id}`);
  };

  const filteredCards = useMemo(() => {
    let filtered = allCards;

    if (filters.searchQuery) {
      const formattedQuery = filters.searchQuery.trim().toLowerCase().replaceAll(' ', '_');
      filtered = filtered.filter(card => card.name.toLowerCase().includes(formattedQuery));
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
          card.type === 'pokemon' && (card as PokemonCard).pokemonType === filters.filterPokemonType
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
      <div className="dex__loading">
        <div className="dex__loading-text">{tUI('loading')}</div>
      </div>
    );
  }

  return (
    <div className="dex">
      <div className="dex__container">
        {/* Header */}
        <div className="dex__header">
          <h1 className="dex__title">{tUI('card_dex')}</h1>
          <div className="dex__stats">
            {filteredCards.length} of {allCards.length} cards
            {totalPages > 1 && (
              <span className="dex__stats-pagination">
                (Page {currentPage} of {totalPages})
              </span>
            )}
          </div>
        </div>

        {/* Main Layout */}
        <div className="dex__layout">
          {/* Filters Sidebar */}
          <div className="dex__filters">
            <SearchFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Content Area */}
          <div className="dex__content">
            {filteredCards.length === 0 ? (
              <div className="dex__no-results">
                <p className="dex__no-results-title">No cards found</p>
                <p className="dex__no-results-subtitle">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="dex__cards-grid">
                  {paginatedCards.map(card => (
                    <div
                      key={`${card.set}-${card.id}`}
                      className="dex__card-item"
                      onClick={() => handleCardClick(card)}
                    >
                      <Card card={card} className="dex__card-wrapper" />
                    </div>
                  ))}
                </div>

                {/* Pagination Controls */}
                <Paginator
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="dex__pagination"
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
