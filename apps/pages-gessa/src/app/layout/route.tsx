import { IRoute } from '../../types/routes';
// import AppLayout from '../layouts/AppLayout';
import { lazy } from 'react';
// import AppLayout from '../layouts/AppLayout';

const AppLayout = lazy(() => import('../layouts/AppLayout'));

export const routes: any = [
  {
    path: '1',
    element: <AppLayout />,
    exact: false,
    children: [{ path: '*' }],
  },
];
