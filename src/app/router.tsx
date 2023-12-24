import { createBrowserRouter } from 'react-router-dom';

import Layout from '../features/layout/components/Layout.tsx';
import UsersPage from '../pages/UsersPage.tsx';
import MeetingsPage from '../pages/MeetingsPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <MeetingsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
]);

export default router;
