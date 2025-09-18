export const ENERGY_SYMBOL_MAP = {
  R: 'r', // Fire
  W: 'w', // Water
  G: 'g', // Grass
  L: 'l', // Lightning
  P: 'p', // Psychic
  F: 'f', // Fighting
  D: 'd', // Darkness
  M: 'm', // Metal
  C: 'c', // Colorless
  N: 'n', // Dragon
} as const;

export const SPECIAL_SYMBOL_MAP = {
  ex: 'u', // ex symbol
} as const;

export type EnergySymbol = keyof typeof ENERGY_SYMBOL_MAP;
export type SpecialSymbol = keyof typeof SPECIAL_SYMBOL_MAP;
export type Symbol = EnergySymbol | SpecialSymbol;

export function isEnergySymbol(symbol: string): symbol is EnergySymbol {
  return symbol in ENERGY_SYMBOL_MAP;
}

export function isSpecialSymbol(symbol: string): symbol is SpecialSymbol {
  return symbol in SPECIAL_SYMBOL_MAP;
}

export function getEnergySymbolChar(symbol: string): string {
  if (isEnergySymbol(symbol)) {
    return ENERGY_SYMBOL_MAP[symbol];
  }
  if (isSpecialSymbol(symbol)) {
    return SPECIAL_SYMBOL_MAP[symbol];
  }
  return symbol;
}

export function parseEnergySymbols(text: string) {
  const matches: Array<{
    match: string;
    symbol: string;
    index: number;
    length: number;
    type: 'energy' | 'special';
  }> = [];

  const specialRegex = /\[(ex)\]/gi;
  let specialMatch: RegExpExecArray | null;

  while ((specialMatch = specialRegex.exec(text)) !== null) {
    const [fullMatch, symbol] = specialMatch;
    matches.push({
      match: fullMatch,
      symbol: symbol.toLowerCase(),
      index: specialMatch.index,
      length: fullMatch.length,
      type: 'special',
    });
  }

  const energyRegex = /\[([A-Z])\]/g;
  let energyMatch: RegExpExecArray | null;

  while ((energyMatch = energyRegex.exec(text)) !== null) {
    const [fullMatch, symbol] = energyMatch;
    const hasConflict = matches.some(
      existing =>
        energyMatch!.index >= existing.index &&
        energyMatch!.index < existing.index + existing.length
    );

    if (!hasConflict) {
      matches.push({
        match: fullMatch,
        symbol,
        index: energyMatch.index,
        length: fullMatch.length,
        type: 'energy',
      });
    }
  }

  return matches.sort((a, b) => a.index - b.index);
}
