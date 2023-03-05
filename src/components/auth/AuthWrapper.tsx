import { signIn, useSession } from 'next-auth/react';
import { type PropsWithChildren, useEffect } from 'react';

const AuthShowcase: React.FC<PropsWithChildren> = ({ children }) => {
  const { data: sessionData, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn();
    }
  }, [sessionData]);

  if (!sessionData) {
    return <div>redirecting login...</div>;
  }
  return <div>{children}a</div>;
};

export default AuthShowcase;
