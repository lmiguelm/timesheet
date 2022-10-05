import { Disclosure } from '@headlessui/react';

import { DesktopHeader } from './Desktop';
import { MobileHeader } from './Mobile';

const user = {
  name: 'Luis Miguel',
  email: 'luismiguelfernandes.marcelo@gmail.com',
  imageUrl: 'https://github.com/lmiguelm.png',
};

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Histórico', href: '#', current: false },
];

const userNavigation = [{ name: 'Sair', href: '#' }];

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function Header() {
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
