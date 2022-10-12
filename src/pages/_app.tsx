import { SessionProvider } from 'next-auth/react';

import { TimesheetProvider } from '../contexts/TimesheetContext';

import '../styles/global.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <TimesheetProvider>
        <Component {...pageProps} />
      </TimesheetProvider>
    </SessionProvider>
  );
}

export default MyApp;
