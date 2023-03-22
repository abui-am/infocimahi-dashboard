import { Navbar, NavLink } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import { api } from '@/utils/api';

const Sidebar = () => {
  const me = api.user.me.useQuery();
  return (
    <Navbar width={{ base: 300 }} height="100%" p="xs">
      <Link href="/">
        <NavLink label="Dashboard" />
      </Link>
      {me.data?.roles?.some((val) => val.idName === 'superadmin') && (
        <Link href="/roles">
          <NavLink label="Roles" />
        </Link>
      )}
    </Navbar>
  );
};

export default Sidebar;
