import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { Environments } from '../../../config/environments';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: Environments.auth.google.clientId,
      clientSecret: Environments.auth.google.clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) token.accessToken = account.access_token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};

export default NextAuth(authOptions);
