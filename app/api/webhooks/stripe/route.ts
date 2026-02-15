import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { fulfillCheckoutSession } from '@/lib/orders';

export async function POST(req: NextRequest) {
  const sig = headers().get('stripe-signature');
  const body = await req.text();
  if (!sig) return NextResponse.json({ error: 'Missing stripe signature' }, { status: 400 });

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET ?? '');
  } catch (error) {
    return NextResponse.json({ error: 'Invalid signature', detail: String(error) }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await fulfillCheckoutSession(session);
  }

  return NextResponse.json({ received: true });
}
