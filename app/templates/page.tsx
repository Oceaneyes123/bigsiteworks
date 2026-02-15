import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function TemplatesPage({ searchParams }: { searchParams: { q?: string; category?: string; sort?: string } }) {
  const q = searchParams.q ?? '';
  const where = {
    ...(q ? { name: { contains: q, mode: 'insensitive' as const } } : {}),
    ...(searchParams.category ? { category: searchParams.category } : {})
  };
  const orderBy = searchParams.sort === 'price_asc' ? { priceCents: 'asc' as const } : searchParams.sort === 'price_desc' ? { priceCents: 'desc' as const } : { createdAt: 'desc' as const };
  const templates = await prisma.template.findMany({ where, orderBy });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Template Marketplace</h1>
      <form className="grid gap-2 md:grid-cols-4" method="GET">
        <input name="q" defaultValue={q} placeholder="Search templates" className="rounded bg-slate-900 p-2" />
        <input name="category" defaultValue={searchParams.category} placeholder="Category" className="rounded bg-slate-900 p-2" />
        <select name="sort" defaultValue={searchParams.sort ?? 'newest'} className="rounded bg-slate-900 p-2">
          <option value="newest">Newest</option>
          <option value="price_asc">Price low to high</option>
          <option value="price_desc">Price high to low</option>
        </select>
        <button className="rounded bg-indigo-600 px-4 py-2">Apply</button>
      </form>
      <div className="grid gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <Link key={template.id} className="rounded border border-slate-700 p-4" href={`/templates/${template.slug}`}>
            <h2 className="font-semibold">{template.name}</h2>
            <p className="text-sm text-slate-300">{template.category}</p>
            <p className="text-sm">${(template.priceCents / 100).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
