'use client';

import { useTranslations } from 'next-intl';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { PokemonType, POKEMON_TYPES } from '@/types/game';

export type SortOption = 'name' | 'type' | 'rarity' | 'set';
export type FilterSet =
  | 'all'
  | 'a1'
  | 'a1a'
  | 'a2'
  | 'a2a'
  | 'a2b'
  | 'a3'
  | 'a3a'
  | 'a3b'
  | 'promo_a';
export type FilterType =
  | 'all'
  | 'pokemon'
  | 'trainer'
  | 'item'
  | 'supporter'
  | 'tool';

export interface FilterState {
  searchQuery: string;
  filterSet: FilterSet;
  filterType: FilterType;
  filterPokemonType: PokemonType | 'all';
  filterRarity: number;
}

interface SearchFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  const tUI = useTranslations('ui');

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      searchQuery: '',
      filterSet: 'all',
      filterPokemonType: 'all',
      filterType: 'all',
      filterRarity: -1,
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <FunnelIcon className="w-5 h-5" />
          Search
        </h2>
        <button
          onClick={resetFilters}
          className="p-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {tUI('search_placeholder')}
          </label>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={tUI('search_placeholder')}
              value={filters.searchQuery}
              onChange={e => updateFilter('searchQuery', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Set
          </label>
          <select
            value={filters.filterSet}
            onChange={e =>
              updateFilter('filterSet', e.target.value as FilterSet)
            }
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all" className="bg-gray-800 text-white">
              All
            </option>
            <option value="a1" className="bg-gray-800 text-white">
              A1
            </option>
            <option value="a1a" className="bg-gray-800 text-white">
              A1a
            </option>
            <option value="a2" className="bg-gray-800 text-white">
              A2
            </option>
            <option value="a2a" className="bg-gray-800 text-white">
              A2a
            </option>
            <option value="a2b" className="bg-gray-800 text-white">
              A2b
            </option>
            <option value="a3" className="bg-gray-800 text-white">
              A3
            </option>
            <option value="a3a" className="bg-gray-800 text-white">
              A3a
            </option>
            <option value="a3b" className="bg-gray-800 text-white">
              A3b
            </option>
            <option value="promo_a" className="bg-gray-800 text-white">
              Promo A
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Card Type
          </label>
          <select
            value={filters.filterType}
            onChange={e =>
              updateFilter('filterType', e.target.value as FilterType)
            }
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all" className="bg-gray-800 text-white">
              All
            </option>
            <option value="pokemon" className="bg-gray-800 text-white">
              Pokémon
            </option>
            <option value="trainer" className="bg-gray-800 text-white">
              Trainer
            </option>
            <option value="item" className="bg-gray-800 text-white">
              Item
            </option>
            <option value="supporter" className="bg-gray-800 text-white">
              Supporter
            </option>
            <option value="tool" className="bg-gray-800 text-white">
              Tool
            </option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Pokémon Type
          </label>
          <select
            value={filters.filterPokemonType}
            onChange={e =>
              updateFilter(
                'filterPokemonType',
                e.target.value as PokemonType | 'all'
              )
            }
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="all" className="bg-gray-800 text-white">
              All
            </option>
            {POKEMON_TYPES.map(type => (
              <option
                key={type}
                value={type}
                className="bg-gray-800 text-white"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Rarity
          </label>
          <select
            value={filters.filterRarity}
            onChange={e => updateFilter('filterRarity', Number(e.target.value))}
            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value={-1} className="bg-gray-800 text-white">
              All
            </option>
            <option value={1} className="bg-gray-800 text-white">
              1 Diamond
            </option>
            <option value={2} className="bg-gray-800 text-white">
              2 Diamond
            </option>
            <option value={3} className="bg-gray-800 text-white">
              3 Diamond
            </option>
            <option value={4} className="bg-gray-800 text-white">
              4 Diamond (EX)
            </option>
            <option value={0} className="bg-gray-800 text-white">
              Promo
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}
