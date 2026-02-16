import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function DashboardPage() {
  const user = await getSessionUser();
  if (!user) redirect('/signin');

  const purchases = await prisma.purchase.findMany({
    where: { userId: user.id, status: 'PAID' },
    include: { items: { include: { template: true } }, license: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your Purchases</h1>
      <p className="text-sm text-slate-400">Signed in as {user.name ?? user.email}</p>
      {purchases.map((purchase) => (
        <div key={purchase.id} className="rounded border border-slate-700 p-4">
          <p className="text-sm">License: {purchase.license?.licenseType ?? 'Standard'}</p>
          <p className="text-xs text-slate-300">{purchase.license?.licenseText}</p>
          {purchase.items.map((item) => (
            <div key={item.id} className="mt-2 flex items-center justify-between">
              <span>{item.template.name}</span>
              <Link href={`/api/download/${item.templateId}`} className="rounded bg-emerald-600 px-3 py-1 text-sm">Download</Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
