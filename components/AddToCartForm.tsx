'use client';

import { useState } from 'react';

export function AddToCartForm({ templateId }: { templateId: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      className="rounded bg-indigo-600 px-4 py-2"
      onClick={() => {
        const current = JSON.parse(localStorage.getItem('cart') ?? '[]') as string[];
        if (!current.includes(templateId)) {
          localStorage.setItem('cart', JSON.stringify([...current, templateId]));
        }
        setDone(true);
      }}
    >
      {done ? 'Added' : 'Add to cart'}
    </button>
  );
}
