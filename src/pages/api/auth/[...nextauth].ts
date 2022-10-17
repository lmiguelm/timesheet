import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { Environments } from '../../../config/environments';
import prisma from '../../../lib/prismadb';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: Environments.auth.google.clientId,
      clientSecret: Environments.auth.google.clientSecret,
    }),
  ],
  jwt: {
    secret: Environments.auth.next.secret,
  },
  session: {
    strategy: 'database',
  },
  callbacks: {
    session({ session, user }) {
      session.userId = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);
