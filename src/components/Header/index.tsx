import { useEffect, useState } from 'react';

import { Disclosure } from '@headlessui/react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

import { DesktopHeader } from './Desktop';
import { MobileHeader } from './Mobile';

export type Navigation = {
  name: string;
  href: string;
  current: boolean;
};

export type UserNavigation = {
  name: string;
  action: () => void;
};

const userNavigation: UserNavigation[] = [{ name: 'Sair', action: signOut }];

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
  const { pathname } = useRouter();

  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Histórico', href: '/history', current: false },
  ]);

  useEffect(() => {
    setNavigation((navigation) =>
      navigation.map((route) => {
        if (route.href === pathname) {
          return {
            ...route,
            current: true,
          };
        }

        return {
          ...route,
          current: false,
        };
      }),
    );
  }, [pathname]);

  return (
    <Disclosure as="nav" className="dark:bg-gray-800">
      {({ open }) => (
        <>
          <DesktopHeader
            open={open}
            navigation={navigation}
            user={user}
            userNavigation={userNavigation}
          />

          <MobileHeader
            navigation={navigation}
            user={user}
            userNavigation={userNavigation}
          />
        </>
      )}
    </Disclosure>
  );
}
