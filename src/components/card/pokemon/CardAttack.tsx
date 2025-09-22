import { Attack, Language, PokemonCard } from '@/types/game';
import './CardAttack.css';
import { useLocale } from 'next-intl';
import { EnergyText } from '@/components/ui/EnergyText';
import { getAttackText } from '@/lib/cardText';
import { renderEnergyCost } from '@/lib/energyCost';

interface CardAttackProps {
  card: PokemonCard;
  attack: Attack;
  extraSpace?: boolean;
}

export function CardAttack({ card, attack, extraSpace }: CardAttackProps) {
  const currentLocale = useLocale() as Language;

  return (
    <div className="card__attack">
      <div className="card__attack-header">
        <div className={`card__attack-cost ${extraSpace ? 'card__attack-cost--extra' : ''}`}>
          {renderEnergyCost(attack.cost, 20)}
        </div>
        <div className="card__attack-name">
          {getAttackText(attack.text, currentLocale, attack.name)}
        </div>
        {attack.damage > 0 && <div className="card__attack-damage">{attack.damage}</div>}
      </div>
      {attack.description && (
        <div className="card__attack-text">
          <EnergyText text={getAttackText(attack.description, currentLocale)} />
        </div>
      )}
    </div>
  );
}
