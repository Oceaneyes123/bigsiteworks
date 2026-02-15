import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  const { email, role } = await req.json();
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  const user = await prisma.user.upsert({
    where: { email },
    create: { email, authId: email, role: role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER' },
    update: { role: role === 'ADMIN' ? 'ADMIN' : 'CUSTOMER' }
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set('bsw_user', Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role })).toString('base64url'), { httpOnly: true, sameSite: 'lax', secure: false, path: '/' });
  return response;
}
