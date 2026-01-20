import { NextRequest, NextResponse } from 'next/server';
import { getEthosScore } from '@/lib/ethos';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Address parameter required' },
        { status: 400 }
      );
    }

    const score = await getEthosScore(address);

    return NextResponse.json({
      success: true,
      address,
      score,
    });
  } catch (error) {
    console.error('Ethos API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
