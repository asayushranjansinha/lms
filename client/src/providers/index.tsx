/**
 * This is main provider for the application which wraps all the other providers.
 */
'use client';

import ReduxProvider from './redux/reduxProvider';
import { ActiveThemeProvider } from './themes/ActiveThemeProvider';

const MainAppProvider = ({
  activeThemeValue,
  children
}: {
  activeThemeValue: string;
  children: React.ReactNode;
}) => {
  return (
    <ActiveThemeProvider initialTheme={activeThemeValue}>
      <ReduxProvider>{children}</ReduxProvider>
    </ActiveThemeProvider>
  );
};
export default MainAppProvider;
