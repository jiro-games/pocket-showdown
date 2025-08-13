import { PokemonType, TrainerCard } from '@/types/game';

export function getPokemonTemplate(pokemonType: PokemonType): string {
  const templateMap = {
    grass: 'pokemon_grass.png',
    fire: 'pokemon_fire.png',
    water: 'pokemon_water.png',
    lightning: 'pokemon_lightning.png',
    psychic: 'pokemon_psychic.png',
    fighting: 'pokemon_fighting.png',
    darkness: 'pokemon_darkness.png',
    metal: 'pokemon_metal.png',
    colorless: 'pokemon_colorless.png',
    dragon: 'pokemon_dragon.png',
  };

  return `/assets/cards/templates/${
    templateMap[pokemonType] || templateMap.colorless
  }`;
}

export function getTrainerTemplate(
  trainerType: TrainerCard['trainerType']
): string {
  const templateMap = {
    supporter: 'trainer_supporter.png',
    item: 'trainer_item.png',
    tool: 'trainer_tool.png',
  };

  return `/assets/cards/templates/${
    templateMap[trainerType] || templateMap.item
  }`;
}

export function getEnergyIcon(energyType: string): string {
  return `/assets/icons/energy/${energyType}.webp`;
}

export function getStageIcon(stage: number): string {
  const stageMap: Record<number, string> = {
    0: 'basic.webp',
    1: 'stage1.webp',
    2: 'stage2.webp',
  };
  return `/assets/icons/${stageMap[stage] || 'basic.webp'}`;
}

export function getRarityIcon(rarity: number): string {
  const rarityMap: Record<number, string> = {
    1: 'rarity-star.webp',
    2: 'rarity-diamond.webp',
    3: 'rarity-shiny.webp',
    4: 'rarity-crown.webp',
  };
  return `/assets/icons/${rarityMap[rarity] || 'rarity-star.webp'}`;
}
