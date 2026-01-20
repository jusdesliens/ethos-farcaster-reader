'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterControls from '@/components/FilterControls';
import CastCard from '@/components/CastCard';
import { EnrichedCast } from '@/lib/types';

export default function Home() {
  const [channel, setChannel] = useState('demo');
  const [casts, setCasts] = useState<EnrichedCast[]>([]);
  const [filteredCasts, setFilteredCasts] = useState<EnrichedCast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highTrustOnly, setHighTrustOnly] = useState(false);
  const [hideLowTrust, setHideLowTrust] = useState(false);

  useEffect(() => {
    fetchCasts();
  }, []);

  useEffect(() => {
    let filtered = [...casts];

    if (highTrustOnly) {
      filtered = filtered.filter((c) => c.ethosScore >= 70);
    }

    if (hideLowTrust) {
      filtered = filtered.filter((c) => c.ethosScore >= 40);
    }

    setFilteredCasts(filtered);
  }, [casts, highTrustOnly, hideLowTrust]);

  async function fetchCasts() {
    setLoading(true);
    setError(null);

    try {
      const url = '/api/channel?channel=demo&limit=25';
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Erreur lors du chargement');
      }

      if (data.casts && Array.isArray(data.casts)) {
        setCasts(data.casts);
      } else {
        throw new Error('Format de données invalide');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <Header channel={channel} onChannelChange={setChannel} />
        
        <FilterControls
          highTrustOnly={highTrustOnly}
          hideLowTrust={hideLowTrust}
          onHighTrustChange={setHighTrustOnly}
          onHideLowTrustChange={setHideLowTrust}
        />

        {loading && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4">Chargement des casts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <p className="text-red-700 font-bold text-lg mb-2">⚠️ Erreur</p>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchCasts}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              🔄 Réessayer
            </button>
          </div>
        )}

        {!loading && !error && filteredCasts.length > 0 && (
          <div className="space-y-4">
            {filteredCasts.map((cast) => (
              <CastCard key={cast.hash} cast={cast} />
            ))}
          </div>
        )}

        {!loading && !error && filteredCasts.length === 0 && casts.length === 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">😕 Aucun cast trouvé</p>
          </div>
        )}

        {!loading && !error && filteredCasts.length === 0 && casts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500 text-lg">🔍 Aucun cast ne correspond aux filtres</p>
            <p className="text-gray-400 text-sm mt-2">Essayez de décocher les filtres</p>
          </div>
        )}

        {!loading && !error && casts.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-700 text-sm">
              ✅ {casts.length} casts chargés • {filteredCasts.length} affichés
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
