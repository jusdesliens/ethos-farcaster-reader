export interface EthosScore {
  score: number;
  address: string;
}

export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  pfpUrl: string;
  custodyAddress: string;
  verifiedAddresses?: {
    ethAddresses: string[];
  };
}

export interface Cast {
  hash: string;
  text: string;
  author: FarcasterUser;
  timestamp: string;
  reactions: {
    likes: number;
    recasts: number;
  };
  embeds?: any[];
}

export interface EnrichedCast extends Cast {
  ethosScore: number;
  trustRank: number;
  walletAddress: string;
}

export type TrustLevel = 'high' | 'mid' | 'low';

export interface TrustBadge {
  level: TrustLevel;
  label: string;
  color: string;
  textColor: string;
  bgLight: string;
}
