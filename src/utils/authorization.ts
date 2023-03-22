import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { api } from './api';

export const useRouteGuard = ({ grantedFor }: { grantedFor: string[] }) => {
  const { data, isLoading, isFetched } = api.user.me.useQuery();
  console.log(data);
  const router = useRouter();

  useEffect(() => {
    if (isFetched) {
      if (!data?.roles?.some((role) => grantedFor.includes(role.idName))) {
        void router.push('/');
      }
    }
  }, [data]);

  return { isLoading };
};
