import { FC } from 'react';
import BodyHeader from '../features/layout/components/BodyHeader.tsx';
import BodyContent from '../features/layout/components/BodyContent.tsx';
import UsersTable from '../features/users/components/UsersTable.tsx';

const UsersPage: FC = () => {
  return (
    <>
      <BodyHeader title="Пользователи" />
      <BodyContent>
        <UsersTable />
      </BodyContent>
    </>
  );
};

export default UsersPage;
