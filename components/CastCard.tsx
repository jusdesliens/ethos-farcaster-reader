'use client';

import { useState } from 'react';
import { Shield, Heart, Repeat2, ChevronDown, ChevronUp } from 'lucide-react';
import { EnrichedCast, TrustBadge } from '@/lib/types';

function getTrustBadge(score: number): TrustBadge {
  if (score >= 70) {
    return {
      level: 'high',
      label: 'High Trust',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      bgLight: 'bg-green-50',
    };
  }
  if (score >= 40) {
    return {
      level: 'mid',
      label: 'Mid Trust',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      bgLight: 'bg-yellow-50',
    };
  }
  return {
    level: 'low',
    label: 'Low Trust',
    color: 'bg-red-500',
    textColor: 'text-red-700',
    bgLight: 'bg-red-50',
  };
}

interface CastCardProps {
  cast: EnrichedCast;
}

export default function CastCard({ cast }: CastCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const badge = getTrustBadge(cast.ethosScore);
  const isLowTrust = cast.ethosScore < 40;
  const shouldCollapse = isLowTrust && !isExpanded;

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all ${
        shouldCollapse ? 'opacity-75' : ''
      }`}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
            {cast.author.username.slice(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-gray-900 truncate">
                {cast.author.displayName}
              </span>
              <span className="text-gray-500 text-sm truncate">
                @{cast.author.username}
              </span>
              <div
                className={`px-2 py-1 rounded-full text-xs font-semibold ${badge.bgLight} ${badge.textColor} flex items-center gap-1`}
              >
                <Shield className="w-3 h-3" />
                {badge.label}
              </div>
              <span className="text-xs text-gray-400">
                Score: {cast.ethosScore}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1 truncate">
              Trust Rank: {cast.trustRank.toFixed(1)} • {cast.walletAddress.slice(0, 8)}...
            </div>
          </div>
        </div>

        {shouldCollapse ? (
          <div className="mt-3">
            <button
              onClick={() => setIsExpanded(true)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
              Low trust content (click to expand)
            </button>
          </div>
        ) : (
          <>
            <p className="mt-3 text-gray-800 leading-relaxed whitespace-pre-wrap">
              {cast.text}
            </p>

            <div className="flex items-center gap-4 mt-3 text-gray-500">
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{cast.reactions.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                <Repeat2 className="w-4 h-4" />
                <span className="text-sm">{cast.reactions.recasts}</span>
              </div>
            </div>

            {isLowTrust && isExpanded && (
              <button
                onClick={() => setIsExpanded(false)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mt-2"
              >
                <ChevronUp className="w-4 h-4" />
                Collapse
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
