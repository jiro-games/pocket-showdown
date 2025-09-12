import React from 'react';

/**
 * Pokemon Artwork Service - Dynamic loading from PokéAPI
 * No local storage needed - uses official Pokemon artwork via API
 */

export interface PokemonArtworkOptions {
  style?: 'official' | 'home' | 'showdown';
  fallback?: boolean;
}

export class PokemonArtworkService {
  private static readonly ARTWORK_BASE =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';
  private static readonly API_BASE = 'https://pokeapi.co/api/v2';
  private static pokemonNameCache = new Map<string, number>();

  /**
   * Get Pokemon artwork URL by name
   */
  static async getArtworkUrl(
    pokemonName: string,
    options: PokemonArtworkOptions = {}
  ): Promise<string> {
    const { style = 'official', fallback = true } = options;

    try {
      const pokemonId = await this.resolvePokemonId(pokemonName);
      return this.buildArtworkUrl(pokemonId, style);
    } catch (error) {
      if (fallback) {
        return this.getFallbackArtwork();
      }
      throw error;
    }
  }

  /**
   * Get multiple Pokemon artwork URLs efficiently
   */
  static async getBatchArtworkUrls(
    pokemonNames: string[],
    options: PokemonArtworkOptions = {}
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();

    await Promise.allSettled(
      pokemonNames.map(async name => {
        try {
          const url = await this.getArtworkUrl(name, options);
          results.set(name, url);
        } catch (error) {
          if (options.fallback) {
            results.set(name, this.getFallbackArtwork());
          }
        }
      })
    );

    return results;
  }

  /**
   * Resolve Pokemon name to ID using PokéAPI
   */
  private static async resolvePokemonId(pokemonName: string): Promise<number> {
    const normalizedName = pokemonName
      .toLowerCase()
      .replace(/_/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Check cache first
    if (this.pokemonNameCache.has(normalizedName)) {
      return this.pokemonNameCache.get(normalizedName)!;
    }

    try {
      const response = await fetch(
        `${this.API_BASE}/pokemon/${normalizedName}`
      );
      if (!response.ok) {
        throw new Error(`Pokemon "${pokemonName}" not found`);
      }

      const data = await response.json();
      const id = data.id;

      // Cache the result
      this.pokemonNameCache.set(normalizedName, id);

      return id;
    } catch (error) {
      throw new Error(`Failed to resolve Pokemon "${pokemonName}": ${error}`);
    }
  }

  /**
   * Build artwork URL based on style preference
   */
  private static buildArtworkUrl(pokemonId: number, style: string): string {
    switch (style) {
      case 'official':
        return `${this.ARTWORK_BASE}/other/official-artwork/${pokemonId}.png`;
      case 'home':
        return `${this.ARTWORK_BASE}/other/home/${pokemonId}.png`;
      case 'showdown':
        return `${this.ARTWORK_BASE}/other/showdown/${pokemonId}.gif`;
      default:
        return `${this.ARTWORK_BASE}/other/official-artwork/${pokemonId}.png`;
    }
  }

  /**
   * Get fallback artwork for unknown Pokemon (simple colored circle)
   */
  static getFallbackArtwork(): string {
    // Simple data URL for a gray circle placeholder
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjE1MCIgZmlsbD0iI2VlZWVlZSIgc3Ryb2tlPSIjY2NjY2NjIiBzdHJva2Utd2lkdGg9IjQiLz48dGV4dCB4PSIyMDAiIHk9IjIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjOTk5OTk5Ij5Qb2vDqW1vbjwvdGV4dD48L3N2Zz4=';
  }

  /**
   * Preload artwork for better UX
   */
  static preloadArtwork(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Get artwork with automatic retry and fallback
   */
  static async getReliableArtworkUrl(
    pokemonName: string,
    retries: number = 2
  ): Promise<string> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const url = await this.getArtworkUrl(pokemonName, {
          style: attempt === 0 ? 'official' : 'home',
          fallback: attempt === retries,
        });

        // Verify the image actually loads
        await this.preloadArtwork(url);
        return url;
      } catch (error) {
        if (attempt === retries) {
          return this.getFallbackArtwork();
        }
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 100 * (attempt + 1)));
      }
    }

    return this.getFallbackArtwork();
  }
}

/**
 * React hook for Pokemon artwork with dynamic loading
 */
export function usePokemonArtwork(
  pokemonName: string,
  options: PokemonArtworkOptions = {}
) {
  const [artworkUrl, setArtworkUrl] = React.useState<string>('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function loadArtwork() {
      if (!pokemonName) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const url = await PokemonArtworkService.getReliableArtworkUrl(
          pokemonName
        );

        if (!cancelled) {
          setArtworkUrl(url);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : 'Failed to load artwork'
          );
          setArtworkUrl(PokemonArtworkService.getFallbackArtwork());
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadArtwork();

    return () => {
      cancelled = true;
    };
  }, [pokemonName, options.style]);

  return { artworkUrl, loading, error };
}
