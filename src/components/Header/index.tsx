import { Disclosure } from '@headlessui/react';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

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

const navigation: Navigation[] = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Histórico', href: '#', current: false },
];

const userNavigation: UserNavigation[] = [{ name: 'Sair', action: signOut }];

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

type HeaderProps = {
  user: User;
};

export function Header({ user }: HeaderProps) {
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
