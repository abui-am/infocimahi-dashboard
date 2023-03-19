import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React, { useEffect } from 'react';

import { api } from '@/utils/api';

const SocMed = () => {
  // TODO: Change to ENV later
  const ID = 'infocimahi1033b600ty1ydho';
  const data = api.organization.getOne.useQuery({
    id: ID,
  });

  const { mutateAsync } =
    api.organization.patchOrganizationSocMedCount.useMutation({
      onSuccess: () => {
        notifications.show({
          message: 'Update success',
        });
      },
    });

  const form = useForm({
    initialValues: { ig: 0, fb: 0, twitter: 0, youtube: 0 },
  });

  useEffect(() => {
    form.setValues({
      ig: data.data?.instagram_count || 0,
      fb: data.data?.facebook_count || 0,
      twitter: data.data?.twitter_count || 0,
      youtube: data.data?.youtube_count || 0,
    });
  }, [data.data]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        void mutateAsync({
          id: ID,
          data: {
            facebook_count: +values.fb,
            instagram_count: +values.ig,
            twitter_count: +values.twitter,
            youtube_count: +values.youtube,
          },
        });
      })}
    >
      <TextInput
        label="Instagram"
        placeholder="Instagram"
        type="number"
        {...form.getInputProps('ig')}
      />
      <TextInput
        label="Facebook"
        placeholder="Facebook"
        type="number"
        {...form.getInputProps('fb')}
      />
      <TextInput
        label="Twitter"
        placeholder="Twitter"
        type="number"
        {...form.getInputProps('twitter')}
      />
      <TextInput
        label="Youtube"
        placeholder="Youtube"
        type="number"
        {...form.getInputProps('youtube')}
      />
      <Button mt="md" type="submit">
        Save
      </Button>
    </form>
  );
};

export default SocMed;
