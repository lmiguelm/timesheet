import { NextApiRequest } from 'next';
import { getSession } from 'next-auth/react';

export async function isAuthenticated(req: NextApiRequest) {
  const session = await getSession({ req });

  if (!session) throw new Error('Usuário não autenticado.');

  return session;
}
