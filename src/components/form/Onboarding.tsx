import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/router';

import { api } from '@/utils/api';

const OnboardingForm = ({ id }: { id: string }) => {
  const utils = api.useContext();
  const router = useRouter();
  const { mutate, isLoading } = api.user.pathUser.useMutation({
    onSuccess: async () => {
      notifications.show({
        message: 'Onboarding successfull',
      });
      await utils.user.invalidate();
      void router.push('/');
    },
  });

  const form = useForm({
    initialValues: { name: '' },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        mutate({
          id,
          data: {
            name: values.name,
          },
        });
      })}
    >
      <TextInput
        label="Name"
        placeholder="Name"
        {...form.getInputProps('name')}
      />

      <Button disabled={isLoading} mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default OnboardingForm;
