import { describe, expect, it } from 'vitest';
import { assertCheckoutIds } from '@/lib/orders';

describe('assertCheckoutIds', () => {
  it('returns unique ids', () => {
    expect(assertCheckoutIds(['a', 'a', 'b'])).toEqual(['a', 'b']);
  });

  it('throws on empty', () => {
    expect(() => assertCheckoutIds([])).toThrow('Cart cannot be empty');
  });
});
