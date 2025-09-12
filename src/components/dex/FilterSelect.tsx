'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import './FilterSelect.css';

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
      <label className="filter-select__label">{label}</label>
      <Listbox value={value} onChange={onChange}>
        <ListboxButton className="filter-select__button">
          <span>{getOptionLabel(value)}</span>
          <ChevronDownIcon className="filter-select__icon" />
        </ListboxButton>
        <ListboxOptions anchor="bottom" className="filter-select__options">
          {options.map(option => (
            <ListboxOption key={String(option)} value={option} className="filter-select__option">
              {getOptionLabel(option)}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </div>
  );
}
