import '@/styles/globals.css';

import { MantineProvider } from '@mantine/core';
import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import AuthShowcase from '@/components/auth/AuthWrapper';
import { api } from '@/utils/api';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <SessionProvider session={session}>
        <AuthShowcase>
          <Component {...pageProps} />
          aa
        </AuthShowcase>
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
