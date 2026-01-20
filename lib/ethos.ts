import { EthosScore } from './types';

interface CacheEntry {
  score: number;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_TTL = 10 * 60 * 1000;

export async function getEthosScore(address: string): Promise<number> {
  const cached = cache.get(address.toLowerCase());
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.score;
  }

  try {
    const endpoint = process.env.ETHOS_ENDPOINT_URL;
    
    if (!endpoint || endpoint.includes('mock')) {
      const mockScore = getMockScore(address);
      cache.set(address.toLowerCase(), { score: mockScore, timestamp: Date.now() });
      return mockScore;
    }

    const response = await fetch(`${endpoint}/${address}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Ethos API error: ${response.status}`);
    }

    const data: EthosScore = await response.json();
    const score = data.score || 50;

    cache.set(address.toLowerCase(), { score, timestamp: Date.now() });

    return score;
  } catch (error) {
    console.error('Error fetching Ethos score:', error);
    
    const mockScore = getMockScore(address);
    cache.set(address.toLowerCase(), { score: mockScore, timestamp: Date.now() });
    return mockScore;
  }
}

function getMockScore(address: string): number {
  const hash = address.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  return 20 + (hash % 76);
}

export function clearExpiredCache(): void {
  const now = Date.now();
  for (const [key, entry] of cache.entries()) {
    if (now - entry.timestamp >= CACHE_TTL) {
      cache.delete(key);
    }
  }
}
