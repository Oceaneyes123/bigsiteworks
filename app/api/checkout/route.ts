import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { assertCheckoutIds } from '@/lib/orders';

const payload = z.object({ ids: z.array(z.string().min(1)).min(1) });

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const parsed = payload.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const ids = assertCheckoutIds(parsed.data.ids);
  const templates = await prisma.template.findMany({ where: { id: { in: ids } } });
  if (!templates.length) return NextResponse.json({ error: 'No valid templates' }, { status: 400 });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: templates.map((t) => ({
      quantity: 1,
      price_data: {
        currency: t.currency,
        unit_amount: t.priceCents,
        product_data: { name: t.name }
      }
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    metadata: { userId: user.id, templateIds: templates.map((t) => t.id).join(',') }
  });

  await prisma.purchase.create({
    data: {
      userId: user.id,
      stripeCheckoutSession: session.id,
      amountCents: templates.reduce((sum, t) => sum + t.priceCents, 0),
      currency: templates[0].currency,
      items: { create: templates.map((t) => ({ templateId: t.id, priceAtCents: t.priceCents })) }
    }
  });

  return NextResponse.json({ url: session.url });
}
