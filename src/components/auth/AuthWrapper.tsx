import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { type PropsWithChildren, useEffect } from 'react';

import { api } from '@/utils/api';

const AuthShowcase: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: sessionData, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn();
    }
  }, [sessionData]);

  const { data: myData, isFetched } = api.user.me.useQuery();

  useEffect(() => {
    if (!myData?.name && isFetched) {
      void router.push(`/onboarding/${myData?.id ?? ''}`);
    }
  }, [myData?.name]);

  if (!sessionData) {
    return <div>redirecting login...</div>;
  }
  return <div>{children}a</div>;
};

export default AuthShowcase;
