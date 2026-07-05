import { NextResponse } from 'next/server';
import { getDashboardData, getFallbackDashboardData } from '@/lib/postgres';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getDashboardData();

  return NextResponse.json(data ?? getFallbackDashboardData());
}
