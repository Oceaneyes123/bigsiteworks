import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartForm } from '@/components/AddToCartForm';
import { prisma } from '@/lib/prisma';

export default async function TemplateDetailPage({ params }: { params: { slug: string } }) {
  const template = await prisma.template.findUnique({ where: { slug: params.slug } });
  if (!template) return notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{template.name}</h1>
      <p>{template.description}</p>
      <div className="rounded border border-slate-700 p-4">
        <p>Category: {template.category}</p>
        <p>Price: ${(template.priceCents / 100).toFixed(2)}</p>
        <p>Version: {template.version}</p>
        <p>Mobile score: {template.performanceMobile}</p>
        <p>Desktop score: {template.performanceDesktop}</p>
      </div>
      <div className="flex gap-3">
        <AddToCartForm templateId={template.id} />
        <Link href={template.demoUrl} target="_blank" className="rounded border border-slate-600 px-4 py-2">Live preview</Link>
      </div>
      <ul className="list-disc pl-6 text-sm text-slate-300">{template.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
    </div>
  );
}
