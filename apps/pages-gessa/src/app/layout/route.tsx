import { lazy } from 'react';

const AppLayout = lazy(() => import('../layouts/AppLayout'));

export const routes: any = [
  {
    path: '1',
    element: <AppLayout />,
    exact: false,
    children: [{ path: '*' }],
  },
];
