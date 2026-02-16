import { prisma } from '../lib/prisma';

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;

  if (adminEmail) {
    await prisma.user.upsert({
      where: { email: adminEmail },
      update: { role: 'ADMIN' },
      create: { email: adminEmail, role: 'ADMIN', name: 'Initial Admin' }
    });
  }

  await prisma.template.createMany({
    data: [
      { slug: 'saasflow-pro', name: 'SaaSFlow Pro', description: 'High-converting SaaS landing template.', category: 'SaaS', tags: ['B2B', 'SEO'], version: '1.0.0', priceCents: 5900, currency: 'usd', demoUrl: 'https://demo.bigsiteworks.com/saasflow-pro', zipKey: 'templates/saasflow-pro.zip', featured: true, performanceMobile: 93, performanceDesktop: 99 },
      { slug: 'ai-launch', name: 'AI Launch', description: 'AI startup launch page.', category: 'AI Startup', tags: ['AI', 'Waitlist'], version: '1.0.0', priceCents: 7900, currency: 'usd', demoUrl: 'https://demo.bigsiteworks.com/ai-launch', zipKey: 'templates/ai-launch.zip', featured: true, performanceMobile: 91, performanceDesktop: 98 },
      { slug: 'fin-alpha', name: 'Fin Alpha', description: 'Fintech funnel and trust stack.', category: 'Fintech / Trading', tags: ['Fintech', 'Trust'], version: '1.0.0', priceCents: 7900, currency: 'usd', demoUrl: 'https://demo.bigsiteworks.com/fin-alpha', zipKey: 'templates/fin-alpha.zip', featured: false, performanceMobile: 90, performanceDesktop: 97 },
      { slug: 'agency-deck', name: 'Agency Deck', description: 'Agency conversion page template.', category: 'Agency', tags: ['Agency', 'LeadGen'], version: '1.1.0', priceCents: 5900, currency: 'usd', demoUrl: 'https://demo.bigsiteworks.com/agency-deck', zipKey: 'templates/agency-deck.zip', featured: false, performanceMobile: 92, performanceDesktop: 98 },
      { slug: 'corp-lite', name: 'Corp Lite', description: 'Corporate-grade simple landing.', category: 'Corporate', tags: ['Corporate', 'Minimal'], version: '1.0.0', priceCents: 3900, currency: 'usd', demoUrl: 'https://demo.bigsiteworks.com/corp-lite', zipKey: 'templates/corp-lite.zip', featured: false, performanceMobile: 94, performanceDesktop: 99 }
    ],
    skipDuplicates: true
  });
}

main().finally(() => prisma.$disconnect());
