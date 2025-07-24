'use client';

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FilterSelectProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
  getOptionLabel: (value: T) => string;
}

export function FilterSelect<T extends string | number>({
  label,
  value,
  onChange,
  options,
  getOptionLabel,
}: FilterSelectProps<T>) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="flex items-center justify-between px-3 py-1.5 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-full">
          <span>{getOptionLabel(value)}</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="z-10 mt-1 w-[--button-width] bg-gray-800 border border-white/20 rounded-lg shadow-lg max-h-60 overflow-auto focus:outline-none"
        >
          {options.map(option => (
            <ListboxOption
              key={String(option)}
              value={option}
              className="px-3 py-2 cursor-pointer text-white data-focus:bg-gray-700"
            >
              {getOptionLabel(option)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
