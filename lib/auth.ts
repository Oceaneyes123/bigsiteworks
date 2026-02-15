import { cookies } from 'next/headers';

export type SessionUser = { id: string; email: string; role: 'ADMIN' | 'CUSTOMER' };

export async function getSessionUser(): Promise<SessionUser | null> {
  const token = cookies().get('bsw_user')?.value;
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as SessionUser;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  if (!user || user.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }
  return user;
}
