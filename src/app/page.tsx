'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import './page.css';

export default function Home() {
  return (
    <div className="home">
      <main className="home__main">
        <div className="home__hero">
          <h2 className="home__title">Pokemon TCG Pocket Simulator</h2>
          <p className="home__subtitle">
            Test your decks, simulate battles, and master your strategy in the ultimate Pokemon TCG
            Pocket training environment.
          </p>

          <div className="home__buttons">
            <Button size="lg" className="home__button--green">
              🎯 Hand Draw Simulator
            </Button>
            <Button size="lg" className="home__button--red">
              ⚔️ Battle Simulator
            </Button>
            <Button size="lg" variant="outline" className="home__button--outline-white">
              🏗️ Deck Builder
            </Button>
            <Link href="/dex">
              <Button size="lg" variant="outline" className="home__button--outline-white">
                📚 Card Dex
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="home__button--outline-white">
              📊 Rankings
            </Button>
          </div>
        </div>

        <div className="home__features">
          <div className="home__feature-card">
            <h4 className="home__feature-title">🎯 Deck Testing</h4>
            <p className="home__feature-description">
              Test your opening hands, mulligan scenarios, and card draw consistency to optimize
              your deck composition.
            </p>
          </div>

          <div className="home__feature-card">
            <h4 className="home__feature-title">⚔️ Battle Simulation</h4>
            <p className="home__feature-description">
              Practice against AI or other players with full game rules implementation and real-time
              battle mechanics.
            </p>
          </div>

          <div className="home__feature-card">
            <h4 className="home__feature-title">📈 Analytics</h4>
            <p className="home__feature-description">
              Track your performance, analyze win rates, and discover optimization opportunities for
              your strategies.
            </p>
          </div>
        </div>
      </main>

      <footer className="home__footer">
        <div className="home__footer-container">
          <p className="home__footer-copyright">
            &copy; 2025 Pocket Showdown. Educational simulator for Pokemon TCG Pocket.
          </p>
          <p className="home__footer-disclaimer">
            Not affiliated with The Pokémon Company or Nintendo. For educational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
