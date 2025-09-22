import { Attack, Language, PokemonCard } from '@/types/game';
import './CardAttack.css';
import { useLocale } from 'next-intl';
import { EnergyText } from '@/components/ui/EnergyText';
import { getAttackText } from '@/lib/cardText';
import { renderEnergyCost } from '@/lib/energyCost';
import { useEffect, useRef } from 'react';

interface CardAttackProps {
  attack: Attack;
  extraSpace?: boolean;
}

export function CardAttack({ attack, extraSpace }: CardAttackProps) {
  const currentLocale = useLocale() as Language;
  const damageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  // Code needed to shrink long attack names
  const totalSpace = 328 - (extraSpace ? 80 : 100);

  // Minimum width needed for damage section is around 38px (for "10")
  let spaceAvailable = totalSpace - 38;

  useEffect(() => {
    if (damageRef.current) {
      const damageWidth = damageRef.current.offsetWidth;
      spaceAvailable = totalSpace - damageWidth;
    }
  }, [attack.damage, extraSpace]);

  useEffect(() => {
    if (nameRef.current) {
      const nameWidth = nameRef.current.offsetWidth;

      if (nameWidth > spaceAvailable) {
        const transformScaleX = spaceAvailable / nameWidth;
        nameRef.current.style.transform = `scaleX(${transformScaleX})`;

        const negativeMargin = nameWidth * (1 - transformScaleX);
        nameRef.current.style.marginRight = `-${negativeMargin}px`;
      }
    }
  }, [attack.text, attack.name, extraSpace]);

  return (
    <div className="card__attack">
      <div className="card__attack-header">
        <div className={`card__attack-cost ${extraSpace ? 'card__attack-cost--extra' : ''}`}>
          {renderEnergyCost(attack.cost, 20)}
        </div>
        <div className="card__attack-name" ref={nameRef}>
          {getAttackText(attack.text, currentLocale, attack.name)}
        </div>
        {attack.damage > 0 && (
          <div className="card__attack-damage" ref={damageRef}>
            {attack.damage}
          </div>
        )}
      </div>
      {attack.description && (
        <div className="card__attack-text">
          <EnergyText text={getAttackText(attack.description, currentLocale)} />
        </div>
      )}
    </div>
  );
}
