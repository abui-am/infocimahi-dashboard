import { useRouter } from 'next/router';
import React from 'react';

import OnboardingForm from '@/components/form/Onboarding';

const Onboarding = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <div className="mx-auto mt-24 max-w-3xl rounded-lg border border-neutral-100 p-4 shadow">
        <h2 className="mb-4">Onboarding</h2>
        {typeof id === 'string' && <OnboardingForm id={id} />}
      </div>
    </div>
  );
};

export default Onboarding;
