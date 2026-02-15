'use client';

import { FormEvent, useState } from 'react';

export default function AdminNewTemplatePage() {
  const [message, setMessage] = useState('');

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch('/api/admin/templates', { method: 'POST', body: fd });
    setMessage(res.ok ? 'Uploaded' : 'Failed');
  };

  return (
    <form onSubmit={submit} className="grid max-w-2xl gap-3">
      <h1 className="text-3xl font-bold">Upload Template</h1>
      <input name="name" placeholder="Template name" className="rounded bg-slate-900 p-2" required />
      <input name="slug" placeholder="slug" className="rounded bg-slate-900 p-2" required />
      <input name="category" placeholder="category" className="rounded bg-slate-900 p-2" required />
      <input name="priceCents" type="number" placeholder="5900" className="rounded bg-slate-900 p-2" required />
      <input name="demoUrl" type="url" placeholder="https://" className="rounded bg-slate-900 p-2" required />
      <input name="version" placeholder="1.0.0" className="rounded bg-slate-900 p-2" required />
      <input name="performanceMobile" type="number" placeholder="93" className="rounded bg-slate-900 p-2" required />
      <input name="performanceDesktop" type="number" placeholder="99" className="rounded bg-slate-900 p-2" required />
      <input name="description" placeholder="Description" className="rounded bg-slate-900 p-2" required />
      <input name="tags" placeholder="comma,separated,tags" className="rounded bg-slate-900 p-2" required />
      <label className="text-sm">Zip file <input name="zip" type="file" accept=".zip" required /></label>
      <label className="text-sm"><input name="featured" type="checkbox" /> Featured</label>
      <button className="rounded bg-indigo-600 px-4 py-2">Save</button>
      <p>{message}</p>
    </form>
  );
}
