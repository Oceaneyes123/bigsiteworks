'use client';

import { useState } from 'react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('CUSTOMER');

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <input className="w-full rounded bg-slate-900 p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <select className="w-full rounded bg-slate-900 p-2" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="CUSTOMER">Customer</option>
        <option value="ADMIN">Admin</option>
      </select>
      <button
        className="rounded bg-indigo-600 px-4 py-2"
        onClick={async () => {
          await fetch('/api/session', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, role }) });
          window.location.href = '/dashboard';
        }}
      >
        Continue
      </button>
    </div>
  );
}
