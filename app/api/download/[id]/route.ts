import { NextRequest, NextResponse } from 'next/server';
import { createDownloadUrl } from '@/lib/storage';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const paid = await prisma.orderItem.findFirst({ where: { templateId: params.id, purchase: { userId: user.id, status: 'PAID' } }, include: { template: true } });
  if (!paid) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const url = await createDownloadUrl(paid.template.zipKey);
  await prisma.download.create({ data: { userId: user.id, templateId: params.id, ip: req.headers.get('x-forwarded-for') } });
  return NextResponse.redirect(url);
}
