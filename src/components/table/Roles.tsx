import { Button, Table } from '@mantine/core';
import React from 'react';

import { api } from '@/utils/api';

import AssignRole from '../modals/AssignRole';

const Roles = () => {
  const data = api.user.getUsers.useQuery();
  const [id, setId] = React.useState<string | null>(null);
  const rows =
    data?.data?.map((element, index) => (
      <tr key={element.name}>
        <td>{index + 1}</td>
        <td>{element.name}</td>
        <td>{element.email}</td>
        <td>
          <div className="flex flex-wrap gap-2">
            {element?.roles?.map((val) => val?.name ?? '').join?.(', ')}
          </div>
        </td>
        <td>
          <Button
            onClick={() => {
              setId(element.id);
            }}
            className="mt-2"
            size="xs"
            variant="outline"
          >
            Assign role
          </Button>
        </td>
      </tr>
    )) ?? [];
  return (
    <>
      <AssignRole id={id ?? ''} opened={!!id} onClose={() => setId(null)} />
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roles</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default Roles;
