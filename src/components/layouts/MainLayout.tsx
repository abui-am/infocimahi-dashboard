import { AppShell, Header } from '@mantine/core';
import { signOut, useSession } from 'next-auth/react';
import React, { type PropsWithChildren } from 'react';

import Sidebar from '../sidebar/Sidebar';

const MainLayout = ({ children }: PropsWithChildren) => {
  const { data } = useSession();
  return (
    <AppShell
      padding="md"
      navbar={<Sidebar />}
      header={
        <Header height={60} p="xs">
          <div className="mx-auto flex h-full items-center justify-between px-4">
            <h1 className="text-base font-bold">Infocimahi Dashboard</h1>
            <div className="flex gap-4">
              <span>Hello, {data?.user.email}</span>
              <button
                type="button"
                className="text-sm font-bold text-blue-500"
                onClick={() => void signOut()}
              >
                Logout
              </button>
            </div>
          </div>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <div className="mx-auto max-w-screen-xl">{children}</div>
    </AppShell>
  );
};

export default MainLayout;
