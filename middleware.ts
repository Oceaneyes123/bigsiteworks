import { NextRequest, NextResponse } from 'next/server';

const bucket = new Map<string, { count: number; reset: number }>();

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/api/')) {
    const ip = req.ip ?? 'local';
    const now = Date.now();
    const entry = bucket.get(ip);
    if (!entry || entry.reset < now) {
      bucket.set(ip, { count: 1, reset: now + 60_000 });
    } else {
      entry.count += 1;
      if (entry.count > 120) {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
      }
    }
    console.info('[api]', req.method, req.nextUrl.pathname, ip);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*']
};
