'use client';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Pokemon TCG Pocket Simulator
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Test your decks, simulate battles, and master your strategy in the
            ultimate Pokemon TCG Pocket training environment.
          </p>

          <div className="flex gap-6 justify-center flex-wrap">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              🎯 Hand Draw Simulator
            </Button>
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              ⚔️ Battle Simulator
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              🏗️ Deck Builder
            </Button>
            <Link href="/dex">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900"
              >
                📚 Card Dex
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900"
            >
              📊 Rankings
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-4">
              🎯 Deck Testing
            </h4>
            <p className="text-gray-300">
              Test your opening hands, mulligan scenarios, and card draw
              consistency to optimize your deck composition.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-4">
              ⚔️ Battle Simulation
            </h4>
            <p className="text-gray-300">
              Practice against AI or other players with full game rules
              implementation and real-time battle mechanics.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h4 className="text-xl font-semibold text-white mb-4">
              📈 Analytics
            </h4>
            <p className="text-gray-300">
              Track your performance, analyze win rates, and discover
              optimization opportunities for your strategies.
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center text-gray-300">
          <p>
            &copy; 2025 Pocket Showdown. Educational simulator for Pokemon TCG
            Pocket.
          </p>
          <p className="text-sm mt-2">
            Not affiliated with The Pokémon Company or Nintendo. For educational
            purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
