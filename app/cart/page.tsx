'use client';

import { useEffect, useState } from 'react';

type CartItem = { id: string; name: string; priceCents: number };

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem('cart') ?? '[]');
    fetch('/api/templates?ids=' + ids.join(','))
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []));
  }, []);

  const total = items.reduce((sum, item) => sum + item.priceCents, 0);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Cart</h1>
      {items.map((i) => (
        <div key={i.id} className="rounded border border-slate-700 p-3">
          {i.name} - ${(i.priceCents / 100).toFixed(2)}
        </div>
      ))}
      <p className="font-semibold">Total: ${(total / 100).toFixed(2)}</p>
      <button
        className="rounded bg-indigo-600 px-4 py-2"
        onClick={async () => {
          const res = await fetch('/api/checkout', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ids: items.map((i) => i.id) }) });
          const data = await res.json();
          if (data.url) window.location.href = data.url;
        }}
      >
        Proceed to checkout
      </button>
    </div>
  );
}
