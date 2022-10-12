import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';

export default function Example() {
  return (
    <div className="bg-black flex justify-center items-center h-screen">
      <main className="mx-auto mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl text-center">
            <span className="block xl:inline">Time</span>
            <span className="block text-indigo-600 xl:inline">sheet</span>
          </h1>

          <p className="mt-3 text-sm text-gray-300 sm:max-w-xl lg:mx-0">
            Controle suas horas de forma rápida e prática.
          </p>

          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                onClick={() => signIn('google')}
                className="
                text-white
                bg-indigo-500
                hover:bg-indigo-600
                hover:text-indigo-100
                  px-4
                  py-2
                  rounded-md
                  cursor-pointer
                  transition-all
                  flex
                  flex-row
                  items-center
                  text-sm
                  justify-center
                "
              >
                <span className="mr-2">Entrar com o Google</span>
                <ArrowRightIcon width={24} height={24} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
