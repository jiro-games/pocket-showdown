'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card } from '@/components/game/Card';
import { Button } from '@/components/ui/Button';
import { cardLoader, getLocalizedText, type Language } from '@/data/cardLoader';
import { Card as CardType, PokemonCard } from '@/types/game';
import { MagnifyingGlassIcon, FunnelIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

type SortOption = 'name' | 'type' | 'rarity' | 'set';
type FilterType = 'all' | 'pokemon' | 'trainer';
type FilterRarity = 'all' | 'common' | 'uncommon' | 'rare' | 'ultra-rare';

export default function DexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterRarity, setFilterRarity] = useState<FilterRarity>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [allCards, setAllCards] = useState<CardType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cards on component mount
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

  // Update language in card loader when changed
  useEffect(() => {
    cardLoader.setLanguage(currentLanguage);
  }, [currentLanguage]);

  // Filter and search logic
  const filteredAndSortedCards = useMemo(() => {
    let filtered = allCards;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((card: CardType) => {
        const name = getLocalizedText(card.name, currentLanguage).toLowerCase();
        const description = getLocalizedText(card.description, currentLanguage).toLowerCase();
        return name.includes(query) || 
               description.includes(query) ||
               card.set.toLowerCase().includes(query);
      });
    }

    // Apply type filter
    if (filterType !== 'all') {
      filtered = filtered.filter((card: CardType) => card.type === filterType);
    }

    // Apply rarity filter  
    if (filterRarity !== 'all') {
      filtered = filtered.filter((card: CardType) => card.rarity === filterRarity);
    }

    // Apply sorting
    filtered.sort((a: CardType, b: CardType) => {
      switch (sortBy) {
        case 'name':
          const nameA = getLocalizedText(a.name, currentLanguage);
          const nameB = getLocalizedText(b.name, currentLanguage);
          return nameA.localeCompare(nameB);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'rarity':
          const rarityOrder = { 'common': 1, 'uncommon': 2, 'rare': 3, 'ultra-rare': 4 };
          return rarityOrder[a.rarity] - rarityOrder[b.rarity];
        case 'set':
          return a.set.localeCompare(b.set);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filterType, filterRarity, sortBy, allCards, currentLanguage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading cards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="text-white hover:bg-white/10"
              >
                ← Back
              </Button>
              <h1 className="text-2xl font-bold text-white">Card Dex</h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center gap-2">
                <GlobeAltIcon className="w-5 h-5 text-white" />
                <select 
                  value={currentLanguage} 
                  onChange={(e) => setCurrentLanguage(e.target.value as Language)}
                  className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
              <div className="text-sm text-gray-300">
                {filteredAndSortedCards.length} of {allCards.length} cards
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FunnelIcon className="w-5 h-5" />
                Filters & Search
              </h2>

              {/* Search Bar */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Search Cards
                  </label>
                  <div className="relative">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by name, description, or set..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Card Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value as FilterType)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all" className="bg-gray-800 text-white">All Types</option>
                    <option value="pokemon" className="bg-gray-800 text-white">Pokémon</option>
                    <option value="trainer" className="bg-gray-800 text-white">Trainer</option>
                  </select>
                </div>

                {/* Rarity Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rarity
                  </label>
                  <select
                    value={filterRarity}
                    onChange={(e) => setFilterRarity(e.target.value as FilterRarity)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all" className="bg-gray-800 text-white">All Rarities</option>
                    <option value="common" className="bg-gray-800 text-white">Common</option>
                    <option value="uncommon" className="bg-gray-800 text-white">Uncommon</option>
                    <option value="rare" className="bg-gray-800 text-white">Rare</option>
                    <option value="ultra-rare" className="bg-gray-800 text-white">Ultra Rare</option>
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="name" className="bg-gray-800 text-white">Name</option>
                    <option value="type" className="bg-gray-800 text-white">Type</option>
                    <option value="rarity" className="bg-gray-800 text-white">Rarity</option>
                    <option value="set" className="bg-gray-800 text-white">Set</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setFilterType('all');
                    setFilterRarity('all');
                    setSortBy('name');
                  }}
                  className="w-full mt-4 border-white/20 text-white hover:bg-white/10"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex-1">
            {filteredAndSortedCards.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No cards found matching your criteria.</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredAndSortedCards.map((card: CardType) => (
                  <div 
                    key={card.id}
                    className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
                    onClick={() => setSelectedCard(card)}
                  >
                    <Card card={card} language={currentLanguage} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Detail Modal */}
      {selectedCard && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-white">
                {getLocalizedText(selectedCard.name, currentLanguage)}
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCard(null)}
                className="text-white hover:bg-white/10"
              >
                ✕
              </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <Card card={selectedCard} language={currentLanguage} />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Details</h3>
                  <div className="space-y-2 text-gray-300">
                    <p><span className="font-medium">Type:</span> {selectedCard.type}</p>
                    <p><span className="font-medium">Rarity:</span> {selectedCard.rarity}</p>
                    <p><span className="font-medium">Set:</span> {selectedCard.set}</p>
                    {selectedCard.cardNumber && (
                      <p><span className="font-medium">Card Number:</span> {selectedCard.cardNumber}</p>
                    )}
                    {selectedCard.artist && (
                      <p><span className="font-medium">Artist:</span> {selectedCard.artist}</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300">
                    {getLocalizedText(selectedCard.description, currentLanguage)}
                  </p>
                </div>                {selectedCard.type === 'pokemon' && 'attacks' in selectedCard && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Attacks</h3>
                    <div className="space-y-2">
                      {(selectedCard as PokemonCard).attacks.map((attack, index) => (
                        <div key={index} className="bg-white/5 rounded p-3">
                          <h4 className="font-medium text-white">
                            {getLocalizedText(attack.name, currentLanguage)}
                          </h4>
                          <p className="text-sm text-gray-300">
                            Damage: {attack.damage}
                          </p>
                          {attack.effect && (
                            <p className="text-sm text-gray-300 mt-1">
                              {getLocalizedText(attack.effect, currentLanguage)}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
