import { NextRequest, NextResponse } from 'next/server';

// MODE TEST ACTIVÉ - Données de démonstration
function calculateTrustRank(ethosScore: number, likes: number, recasts: number): number {
  const social = Math.log(1 + likes + recasts);
  return 0.75 * ethosScore + 0.25 * (social * 20);
}

function getMockCasts() {
  return [
    {
      hash: '0xtest1',
      text: 'GM! Just shipped a major update to our protocol. The future of decentralized social is here! 🚀',
      author: {
        fid: 1,
        username: 'vitalik',
        displayName: 'Vitalik Buterin',
        pfpUrl: '',
        custodyAddress: '0x1234567890abcdef1234567890abcdef12345678',
        verifiedAddresses: { ethAddresses: ['0x1234567890abcdef1234567890abcdef12345678'] }
      },
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      reactions: { likes: 245, recasts: 89 },
      embeds: [],
      ethosScore: 92,
      trustRank: 0,
      walletAddress: '0x1234567890abcdef1234567890abcdef12345678'
    },
    {
      hash: '0xtest2',
      text: 'Building in public is the way. Excited to see what the community creates! 💜',
      author: {
        fid: 2,
        username: 'dwr',
        displayName: 'Dan Romero',
        pfpUrl: '',
        custodyAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        verifiedAddresses: { ethAddresses: ['0xabcdef1234567890abcdef1234567890abcdef12'] }
      },
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      reactions: { likes: 156, recasts: 45 },
      embeds: [],
      ethosScore: 88,
      trustRank: 0,
      walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12'
    },
    {
      hash: '0xtest3',
      text: 'Check out my new token launch! 100x guaranteed! 💰💰💰 DM for details!',
      author: {
        fid: 3,
        username: 'cryptoscammer',
        displayName: 'Crypto Expert',
        pfpUrl: '',
        custodyAddress: '0x9999999999999999999999999999999999999999',
        verifiedAddresses: { ethAddresses: ['0x9999999999999999999999999999999999999999'] }
      },
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      reactions: { likes: 3, recasts: 0 },
      embeds: [],
      ethosScore: 25,
      trustRank: 0,
      walletAddress: '0x9999999999999999999999999999999999999999'
    },
    {
      hash: '0xtest4',
      text: 'Deep dive into zero-knowledge proofs and their applications in scaling. Thread 🧵👇',
      author: {
        fid: 4,
        username: 'researcher',
        displayName: 'Crypto Researcher',
        pfpUrl: '',
        custodyAddress: '0x5555555555555555555555555555555555555555',
        verifiedAddresses: { ethAddresses: ['0x5555555555555555555555555555555555555555'] }
      },
      timestamp: new Date(Date.now() - 10800000).toISOString(),
      reactions: { likes: 198, recasts: 102 },
      embeds: [],
      ethosScore: 78,
      trustRank: 0,
      walletAddress: '0x5555555555555555555555555555555555555555'
    },
    {
      hash: '0xtest5',
      text: 'Hot take: We need better UX in crypto wallets. Most people still find them confusing.',
      author: {
        fid: 5,
        username: 'builder',
        displayName: 'Product Builder',
        pfpUrl: '',
        custodyAddress: '0x7777777777777777777777777777777777777777',
        verifiedAddresses: { ethAddresses: ['0x7777777777777777777777777777777777777777'] }
      },
      timestamp: new Date(Date.now() - 5400000).toISOString(),
      reactions: { likes: 167, recasts: 54 },
      embeds: [],
      ethosScore: 72,
      trustRank: 0,
      walletAddress: '0x7777777777777777777777777777777777777777'
    },
    {
      hash: '0xtest6',
      text: 'Anyone want to buy my exclusive NFT collection? Only 0.5 ETH each! Limited supply!',
      author: {
        fid: 6,
        username: 'nftflipper',
        displayName: 'NFT Trader',
        pfpUrl: '',
        custodyAddress: '0x3333333333333333333333333333333333333333',
        verifiedAddresses: { ethAddresses: ['0x3333333333333333333333333333333333333333'] }
      },
      timestamp: new Date(Date.now() - 900000).toISOString(),
      reactions: { likes: 5, recasts: 1 },
      embeds: [],
      ethosScore: 38,
      trustRank: 0,
      walletAddress: '0x3333333333333333333333333333333333333333'
    }
  ];
}

export async function GET(request: NextRequest) {
  try {
    console.log('MODE TEST - Utilisation de données de démonstration');
    
    const mockCasts = getMockCasts();
    
    // Calculer les Trust Ranks
    mockCasts.forEach(cast => {
      cast.trustRank = calculateTrustRank(
        cast.ethosScore,
        cast.reactions.likes,
        cast.reactions.recasts
      );
    });
    
    // Trier par Trust Rank
    mockCasts.sort((a, b) => b.trustRank - a.trustRank);

    return NextResponse.json({
      success: true,
      channel: 'demo',
      casts: mockCasts,
    });
  } catch (error) {
    console.error('Error in test mode:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error generating test data',
      },
      { status: 500 }
    );
  }
}
