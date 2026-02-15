import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get('ids')?.split(',').filter(Boolean) ?? [];
  const items = await prisma.template.findMany({ where: { id: { in: ids } }, select: { id: true, name: true, priceCents: true } });
  return NextResponse.json({ items });
}
