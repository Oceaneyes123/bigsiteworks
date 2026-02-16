import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminTemplatesPage() {
  const user = await getSessionUser();
  if (!user) redirect('/signin');
  if (user.role !== 'ADMIN') redirect('/dashboard');
  const templates = await prisma.template.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Templates</h1>
        <Link href="/admin/templates/new" className="rounded bg-indigo-600 px-4 py-2">Upload Template</Link>
      </div>
      {templates.map((t) => (
        <div key={t.id} className="rounded border border-slate-700 p-3">
          {t.name} · {t.category} · ${(t.priceCents / 100).toFixed(2)} {t.featured ? '· Featured' : ''}
        </div>
      ))}
    </div>
  );
}
