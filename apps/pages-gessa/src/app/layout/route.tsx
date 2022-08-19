import { lazy } from 'react';
import { routesObj } from '../../app/layouts/AppMain/AppMain';
const AppLayout = lazy(() => import('../layouts/AppLayout'));

export const routes: any = [
  {
    path: ':projectId/:menuId/:featureId',
    element: <AppLayout />,
    exact: false,
    children: [...routesObj],
  },
];
