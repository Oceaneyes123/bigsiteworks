import { auth } from '@/auth';
import { assertAdmin, assertAuthenticated } from '@/lib/authorization';

export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

export async function requireUser() {
  return assertAuthenticated(await getSessionUser());
}

export async function requireAdmin() {
  return assertAdmin(await getSessionUser());
}
