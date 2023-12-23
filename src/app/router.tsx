import { createBrowserRouter } from 'react-router-dom';

import Layout from '../features/layout/components/Layout.tsx';
import UsersPage from '../pages/UsersPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <UsersPage />,
      },
    ],
  },
]);

export default router;
