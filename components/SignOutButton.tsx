'use client';

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button className="rounded border border-slate-600 px-3 py-1 text-sm" onClick={() => signOut({ callbackUrl: '/' })}>
      Sign out
    </button>
  );
}
