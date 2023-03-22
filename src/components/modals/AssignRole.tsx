import { Button, Modal, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import React from 'react';

import { api } from '@/utils/api';

const AssignRole = ({
  onClose,
  opened,
  id,
}: {
  onClose: () => void;
  opened: boolean;
  id: string;
}) => {
  const utils = api.useContext();
  const { mutate, isLoading: isMutating } = api.user.pathRoles.useMutation({
    onSuccess: async () => {
      notifications.show({
        message: 'Roles has been successfully assigned',
      });

      await utils.user.invalidate();
      onClose();
    },
  });
  const { data: dataRole, isLoading } = api.roles.getRoles.useQuery();
  const { data: dataUser, isLoading: isLoadingUser } =
    api.user.getUser.useQuery(id);

  const form = useForm({
    initialValues: {
      roles: dataUser?.roles?.map((val) => val.idName) as string[],
    },
  });

  const rolesOption =
    dataRole?.map((role) => ({
      label: role.name,
      value: role.idName,
    })) ?? [];

  React.useEffect(() => {
    form.setFieldValue(
      'roles',
      dataUser?.roles?.map((role) => role.idName) ?? []
    );
  }, [id, isLoadingUser]);
  if (isLoading || isLoadingUser) return <div>Loading...</div>;
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => {
          onClose();
        }}
        title="Assign Role"
      >
        <form
          onSubmit={form.onSubmit((values) => {
            mutate({
              id,
              data: {
                roles: values.roles,
              },
            });
          })}
        >
          <MultiSelect
            label="Roles"
            placeholder="Select roles"
            data={rolesOption}
            dropdownPosition="bottom"
            withinPortal
            {...form.getInputProps('roles')}
          />

          <div className="flex justify-end">
            <Button mt="md" type="submit" disabled={isLoading || isMutating}>
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AssignRole;
