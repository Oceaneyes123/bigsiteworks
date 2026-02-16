import { describe, expect, it } from 'vitest';
import { assertAdmin, assertAuthenticated } from '@/lib/authorization';

describe('auth guards', () => {
  it('rejects unauthenticated access', () => {
    expect(() => assertAuthenticated(null)).toThrow('Unauthorized');
  });

  it('allows authenticated users', () => {
    const user = { id: 'u1', role: 'USER' as const };
    expect(assertAuthenticated(user)).toEqual(user);
  });

  it('rejects non-admin users', () => {
    expect(() => assertAdmin({ id: 'u1', role: 'USER' })).toThrow('Forbidden');
  });

  it('allows admin users', () => {
    const user = { id: 'a1', role: 'ADMIN' as const };
    expect(assertAdmin(user)).toEqual(user);
  });
});
