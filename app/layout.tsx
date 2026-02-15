import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-semibold">BigSiteWorks</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/templates">Templates</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/admin/templates">Admin</Link>
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
