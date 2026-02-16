import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { uploadTemplateObject } from '@/lib/storage';

const validator = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  priceCents: z.coerce.number().int().positive(),
  demoUrl: z.string().url(),
  version: z.string().min(1),
  performanceMobile: z.coerce.number().int().min(0).max(100),
  performanceDesktop: z.coerce.number().int().min(0).max(100),
  description: z.string().min(8),
  tags: z.string().min(2)
});

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unauthorized';
    return NextResponse.json({ error: message }, { status: message === 'Unauthorized' ? 401 : 403 });
  }

  const form = await req.formData();
  const zip = form.get('zip');
  if (!(zip instanceof File) || !zip.name.endsWith('.zip')) return NextResponse.json({ error: 'Zip file required' }, { status: 400 });

  const parsed = validator.safeParse(Object.fromEntries(form.entries()));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const key = `templates/${parsed.data.slug}-${Date.now()}.zip`;
  await uploadTemplateObject(key, Buffer.from(await zip.arrayBuffer()), zip.type || 'application/zip');

  await prisma.template.create({
    data: {
      ...parsed.data,
      tags: parsed.data.tags.split(',').map((s) => s.trim()).filter(Boolean),
      featured: form.get('featured') === 'on',
      currency: 'usd',
      zipKey: key
    }
  });

  return NextResponse.json({ ok: true });
}
