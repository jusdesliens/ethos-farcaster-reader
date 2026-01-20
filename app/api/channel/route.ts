import { NextRequest, NextResponse } from 'next/server';
import { getChannelFeed, getVerifiedAddress } from '@/lib/neynar';
import { getEthosScore } from '@/lib/ethos';
import { EnrichedCast } from '@/lib/types';

function calculateTrustRank(ethosScore: number, likes: number, recasts: number): number {
  const social = Math.log(1 + likes + recasts);
  return 0.75 * ethosScore + 0.25 * (social * 20);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const channel = searchParams.get('channel') || 'ethos';
    const limit = parseInt(searchParams.get('limit') || '25');

    const casts = await getChannelFeed(channel, limit);

    const enrichedCasts: EnrichedCast[] = await Promise.all(
      casts.map(async (cast) => {
        const walletAddress = getVerifiedAddress(cast.author);
        const ethosScore = await getEthosScore(walletAddress);
        const trustRank = calculateTrustRank(
          ethosScore,
          cast.reactions.likes,
          cast.reactions.recasts
        );

        return {
          ...cast,
          ethosScore,
          trustRank,
          walletAddress,
        };
      })
    );

    enrichedCasts.sort((a, b) => b.trustRank - a.trustRank);

    return NextResponse.json({
      success: true,
      channel,
      casts: enrichedCasts,
    });
  } catch (error) {
    console.error('Channel API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
