import { PokemonType } from '@/types/game';

interface EnergyCostProps {
  cost: PokemonType[];
}

export function renderEnergyCost(cost: PokemonType[], size?: number) {
  const iconStyle = size ? { width: size, height: size } : undefined;

  if (cost.length === 0) {
    return (
      <img
        key="empty"
        src="/assets/icons/energy/empty.webp"
        alt="No energy cost"
        className="energy-icon"
        style={iconStyle}
      />
    );
  }

  // Show max 5 energy icons, ignore the rest
  const limitedCost = cost.slice(0, 5);

  return limitedCost.map((energyType, index) => (
    <img
      key={`${energyType}-${index}`}
      src={`/assets/icons/energy/${energyType}.webp`}
      alt={energyType}
      className="energy-icon"
      style={iconStyle}
    />
  ));
}
