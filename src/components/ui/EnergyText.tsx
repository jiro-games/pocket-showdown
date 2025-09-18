import React from 'react';
import { parseEnergySymbols, getEnergySymbolChar } from '@/lib/energySymbols';
import './EnergyText.css';

interface EnergyTextProps {
  text: string;
  className?: string;
}

export function EnergyText({ text, className = '' }: EnergyTextProps) {
  const symbols = parseEnergySymbols(text);

  if (symbols.length === 0) {
    return <span className={className}>{text}</span>;
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  symbols.forEach((symbol, index) => {
    if (symbol.index > lastIndex) {
      elements.push(<span key={`text-${index}`}>{text.slice(lastIndex, symbol.index)}</span>);
    }

    const titleText =
      symbol.type === 'special'
        ? symbol.symbol === 'ex'
          ? 'ex'
          : symbol.symbol
        : `${symbol.symbol} Energy`;

    elements.push(
      <span
        key={`symbol-${index}`}
        className={`energy-symbol energy-symbol--${symbol.symbol.toLowerCase()}`}
        title={titleText}
      >
        {getEnergySymbolChar(symbol.symbol)}
      </span>
    );

    lastIndex = symbol.index + symbol.length;
  });

  if (lastIndex < text.length) {
    elements.push(<span key="text-end">{text.slice(lastIndex)}</span>);
  }

  return <span className={className}>{elements}</span>;
}
