import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

const isTestMode = process.env.AUTH_TEST_MODE === 'true' && process.env.NODE_ENV !== 'production';

const providers = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET
  })
];

if (isTestMode) {
  providers.push(
    Credentials({
      name: 'Test credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const expectedEmail = process.env.AUTH_TEST_EMAIL;
        const expectedPassword = process.env.AUTH_TEST_PASSWORD;
        if (!expectedEmail || !expectedPassword) return null;
        if (credentials?.email !== expectedEmail || credentials.password !== expectedPassword) return null;

        const user = await prisma.user.upsert({
          where: { email: expectedEmail },
          update: {},
          create: { email: expectedEmail, role: 'USER', name: 'E2E Test User' }
        });

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      }
    })
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'database' },
  providers,
  pages: { signIn: '/signin' },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    }
  }
});
