import { TimesheetProvider } from '../contexts/TimesheetContext';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <TimesheetProvider>
      <Component {...pageProps} />
    </TimesheetProvider>
  );
}

export default MyApp;
