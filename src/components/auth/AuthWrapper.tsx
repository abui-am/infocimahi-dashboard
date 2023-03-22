import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { type PropsWithChildren, useEffect } from 'react';

import { api } from '@/utils/api';

const AuthShowcase: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: sessionData, status } = useSession();
  const { data: me } = api.user.me.useQuery();
  const router = useRouter();
  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn();
    }
  }, [sessionData]);

  const { data: myData, isFetched } = api.user.me.useQuery();

  useEffect(() => {
    if (isFetched && myData?.onboardingStatus === 'new') {
      void router.push(`/onboarding/${myData?.id ?? ''}`);
    }

    if (
      isFetched &&
      myData?.onboardingStatus === 'waitingRole' &&
      me?.roles.length === 0
    ) {
      void router.push(`/waiting-role`);
    }
  }, [myData?.name]);

  if (!sessionData) {
    return <div>redirecting login...</div>;
  }
  return <div>{children}</div>;
};

export default AuthShowcase;
