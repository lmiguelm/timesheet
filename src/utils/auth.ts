import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

export const getServerSideRedirect = () => ({
  props: {},
  redirect: {
    destination: '/',
    permanent: false,
  },
});

export async function isAuthenticated(req: NextApiRequest) {
  const session = await getSession({ req });

  if (!session) throw new Error('Usuário não autenticado.');

  return session;
}
