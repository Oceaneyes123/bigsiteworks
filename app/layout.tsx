import './globals.css';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getSessionUser } from '@/lib/auth';
import { SignOutButton } from '@/components/SignOutButton';

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();

  return (
    <html lang="en">
      <body>
        <header className="border-b border-slate-800">
          <div className="container flex items-center justify-between py-4">
            <Link href="/" className="text-xl font-semibold">BigSiteWorks</Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/templates">Templates</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/admin/templates">Admin</Link>
              {user ? (
                <>
                  <span className="text-slate-400">{user.email}</span>
                  <SignOutButton />
                </>
              ) : (
                <Link href="/signin">Sign in</Link>
              )}
            </nav>
          </div>
        </header>
        <main className="container py-8">{children}</main>
      </body>
    </html>
  );
}
