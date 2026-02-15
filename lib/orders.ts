import type Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export function assertCheckoutIds(ids: string[]) {
  if (!ids.length) throw new Error('Cart cannot be empty');
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) throw new Error('Cart cannot be empty');
  return unique;
}

export async function fulfillCheckoutSession(session: Stripe.Checkout.Session) {
  const purchase = await prisma.purchase.findUnique({ where: { stripeCheckoutSession: session.id } });
  if (!purchase || purchase.status === 'PAID') return false;

  await prisma.purchase.update({
    where: { id: purchase.id },
    data: {
      status: 'PAID',
      stripePaymentIntent: typeof session.payment_intent === 'string' ? session.payment_intent : null,
      license: {
        create: {
          licenseType: 'Standard Commercial',
          licenseText: 'Single-business, unlimited deployment for one legal entity.'
        }
      }
    }
  });
  return true;
}
