'use client';

import { useTranslations } from 'next-intl';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { PokemonType, POKEMON_TYPES } from '@/types/game';
import { FilterSelect } from '@/components/dex/FilterSelect';

export type SortOption = 'name' | 'type' | 'rarity' | 'set';

const FILTER_SETS = [
  'all',
  'a1',
  'a1a',
  'a2',
  'a2a',
  'a2b',
  'a3',
  'a3a',
  'a3b',
  'promo_a',
] as const;

export type FilterSet = (typeof FILTER_SETS)[number];

const FILTER_TYPES = [
  'all',
  'pokemon',
  'trainer',
  'item',
  'supporter',
  'tool',
] as const;

export type FilterType = (typeof FILTER_TYPES)[number];

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
  const tSets = useTranslations('sets');
  const tGame = useTranslations('game');

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
              className="w-full pl-10 pr-4 py-1.5 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <FilterSelect
          label="Set"
          value={filters.filterSet}
          onChange={value => updateFilter('filterSet', value)}
          options={FILTER_SETS}
          getOptionLabel={value => (value === 'all' ? 'All' : tSets(value))}
        />

        <FilterSelect
          label="Card Type"
          value={filters.filterType}
          onChange={value => updateFilter('filterType', value)}
          options={FILTER_TYPES}
          getOptionLabel={value =>
            value === 'all' ? 'All' : tGame(`card_types.${value}`)
          }
        />

        <FilterSelect
          label="Pokémon Type"
          value={filters.filterPokemonType}
          onChange={value => updateFilter('filterPokemonType', value)}
          options={['all', ...POKEMON_TYPES]}
          getOptionLabel={value =>
            value === 'all'
              ? 'All'
              : value.charAt(0).toUpperCase() + value.slice(1)
          }
        />

        <FilterSelect
          label="Rarity"
          value={filters.filterRarity}
          onChange={value => updateFilter('filterRarity', value)}
          options={[-1, 1, 2, 3, 4, 0]}
          getOptionLabel={value => {
            switch (value) {
              case -1:
                return 'All';
              case 1:
                return '1 Diamond';
              case 2:
                return '2 Diamond';
              case 3:
                return '3 Diamond';
              case 4:
                return '4 Diamond (EX)';
              case 0:
                return 'Promo';
              default:
                return String(value);
            }
          }}
        />
      </div>
    </div>
  );
}
