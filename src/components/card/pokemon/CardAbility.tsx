import { PokemonCard } from '@/types/game';
import { useTranslations } from 'next-intl';
import { EnergyText } from '@/components/ui/EnergyText';
import './CardAbility.css';

interface CardAbilityProps {
  card: PokemonCard;
}

export function CardAbility({ card }: CardAbilityProps) {
  const tAbility = useTranslations('abilities');

  if (!card.ability) {
    return null;
  }

  const abilityId = card.ability.name;

  return (
    <div className="card__ability">
      <div className="card__ability-header">
        <div className="card__ability-icon">
          <span className="card__ability-icon-text">Ability</span>
        </div>
        <div className="card__ability-name">{tAbility(`${abilityId}.name`)}</div>
      </div>
      <div className="card__ability-text">
        <EnergyText text={tAbility(`${abilityId}.text`)} />
      </div>
    </div>
  );
}
