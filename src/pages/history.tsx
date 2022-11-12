import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';

import { Header } from '../components/Header';
import { getServerSideRedirect } from '../utils/auth';

type HistoryProps = {
  user: User;
};

export default function History({ user }: HistoryProps) {
  return (
    <div className="bg-black h-screen">
      <Header user={user} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) return getServerSideRedirect();

  return {
    props: {
      user: session.user,
    },
  };
};
