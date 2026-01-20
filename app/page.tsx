'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import FilterControls from '@/components/FilterControls';
import CastCard from '@/components/CastCard';
import { EnrichedCast } from '@/lib/types';

export default function Home() {
  const [channel, setChannel] = useState('ethos');
  const [casts, setCasts] = useState<EnrichedCast[]>([]);
  const [filteredCasts, setFilteredCasts] = useState<EnrichedCast[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [highTrustOnly, setHighTrustOnly] = useState(false);
  const [hideLowTrust, setHideLowTrust] = useState(false);

  useEffect(() => {
    fetchCasts();
  }, [channel]);

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
      const response = await fetch(`/api/channel?channel=${channel}&limit=25`);
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch casts');
      }

      setCasts(data.casts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching casts:', err);
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
            <p className="text-gray-500">Loading casts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">Error: {error}</p>
            <button
              onClick={fetchCasts}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {filteredCasts.map((cast) => (
              <CastCard key={cast.hash} cast={cast} />
            ))}
          </div>
        )}

        {!loading && !error && filteredCasts.length === 0 && casts.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-500">No casts match your filters</p>
          </div>
        )}
      </div>
    </main>
  );
}
