import { GetServerSideProps } from 'next';
import { User } from 'next-auth';
import { getSession } from 'next-auth/react';

import { Header } from '../components/Header';
import { Table } from '../components/Table';
import { getServerSideRedirect } from '../utils/auth';

type DashboardProps = {
  user: User;
};

export default function Dashboard({ user }: DashboardProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header user={user} />

      <main className="flex flex-1 flex-col justify-center items-center bg-black m-30">
        <Table />
      </main>
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
