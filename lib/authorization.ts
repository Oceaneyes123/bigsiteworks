import type { Role } from '@prisma/client';

type MinimalUser = { id: string; role: Role };

export function assertAuthenticated<T extends MinimalUser>(user: T | null): T {
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export function assertAdmin<T extends MinimalUser>(user: T | null): T {
  const authenticated = assertAuthenticated(user);
  if (authenticated.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
  return authenticated;
}
