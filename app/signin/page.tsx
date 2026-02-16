import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import { getSessionUser } from '@/lib/auth';

async function providerSignIn(provider: 'google' | 'github' | 'credentials', formData?: FormData) {
  'use server';
  try {
    await signIn(provider, {
      ...(provider === 'credentials'
        ? {
            email: formData?.get('email'),
            password: formData?.get('password')
          }
        : {}),
      redirectTo: '/dashboard'
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/signin?error=InvalidCredentials');
    }
    throw error;
  }
}

export default async function SignInPage() {
  const user = await getSessionUser();
  if (user) {
    redirect('/dashboard');
  }

  const testMode = process.env.AUTH_TEST_MODE === 'true' && process.env.NODE_ENV !== 'production';

  return (
    <div className="max-w-md space-y-4">
      <h1 className="text-3xl font-bold">Sign in</h1>
      <form action={providerSignIn.bind(null, 'google')}>
        <button className="w-full rounded bg-slate-800 px-4 py-2">Sign in with Google</button>
      </form>
      <form action={providerSignIn.bind(null, 'github')}>
        <button className="w-full rounded bg-slate-800 px-4 py-2">Sign in with GitHub</button>
      </form>
      {testMode && (
        <form action={providerSignIn.bind(null, 'credentials')} className="space-y-2 rounded border border-slate-700 p-4">
          <p className="text-sm text-slate-300">Test mode credentials</p>
          <input name="email" type="email" required placeholder="Email" className="w-full rounded bg-slate-900 p-2" />
          <input name="password" type="password" required placeholder="Password" className="w-full rounded bg-slate-900 p-2" />
          <button className="w-full rounded bg-indigo-600 px-4 py-2">Sign in with test credentials</button>
        </form>
      )}
    </div>
  );
}
