import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import { Cast, FarcasterUser } from './types';

// Initialiser avec la clé (sans vérification du format)
const apiKey = process.env.NEYNAR_API_KEY || '';
console.log('Neynar API Key présente:', apiKey ? 'Oui' : 'Non');

const client = new NeynarAPIClient(apiKey);

export async function getChannelFeed(
  channelId: string,
  limit: number = 25
): Promise<Cast[]> {
  try {
    console.log(`Fetching channel: ${channelId}, limit: ${limit}`);
    
    const response = await client.fetchFeedByChannelIds([channelId], {
      limit,
      withRecasts: false,
    });

    console.log(`Received ${response.casts.length} casts`);

    return response.casts.map(cast => ({
      hash: cast.hash,
      text: cast.text,
      author: {
        fid: cast.author.fid,
        username: cast.author.username,
        displayName: cast.author.display_name || cast.author.username,
        pfpUrl: cast.author.pfp_url || '',
        custodyAddress: cast.author.custody_address,
        verifiedAddresses: cast.author.verified_addresses?.eth_addresses && cast.author.verified_addresses.eth_addresses.length > 0
          ? { ethAddresses: cast.author.verified_addresses.eth_addresses }
          : undefined,
      },
      timestamp: cast.timestamp,
      reactions: {
        likes: cast.reactions?.likes_count || 0,
        recasts: cast.reactions?.recasts_count || 0,
      },
      embeds: cast.embeds || [],
    }));
  } catch (error) {
    console.error('Error fetching channel feed:', error);
    // Afficher plus de détails sur l'erreur
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    throw new Error('Failed to fetch channel feed');
  }
}

export function getVerifiedAddress(user: FarcasterUser): string {
  if (user.verifiedAddresses?.ethAddresses && user.verifiedAddresses.ethAddresses.length > 0) {
    return user.verifiedAddresses.ethAddresses[0];
  }
  return user.custodyAddress;
}

export function getReactionCounts(cast: Cast): { likes: number; recasts: number } {
  return {
    likes: cast.reactions.likes,
    recasts: cast.reactions.recasts,
  };
}
