import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    prisma.template.findMany({ where: { featured: true }, take: 3, orderBy: { createdAt: 'desc' } }),
    prisma.template.findMany({ distinct: ['category'], select: { category: true } })
  ]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-4xl font-bold">Serious Landing Pages for Serious Builders</h1>
        <p className="mt-2 text-slate-300">Production-ready templates with transparent performance scores.</p>
      </section>
      <section>
        <h2 className="mb-3 text-2xl font-semibold">Featured Templates</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {featured.map((t) => (
            <Link key={t.id} href={`/templates/${t.slug}`} className="rounded border border-slate-700 p-4">
              <h3 className="font-semibold">{t.name}</h3>
              <p className="text-sm text-slate-300">{t.description}</p>
              <p className="mt-2 text-sm">${(t.priceCents / 100).toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-3 text-2xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link className="rounded bg-slate-800 px-3 py-2 text-sm" key={c.category} href={`/templates?category=${encodeURIComponent(c.category)}`}>
              {c.category}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
