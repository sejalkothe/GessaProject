import { Navigate } from 'react-router-dom';

const MyRoutes = {
  routes: [
    {
      path: '',
      element: <Navigate to="project" />,
    },

    {
      path: 'dashboard',
      element: <Navigate to="dashboard" />,
      children: [
        {
          path: 'master',
          element: <></>,
        },
      ],
    },
    {
      path: 'setting',
      element: <Navigate to="setting" />,
      children: [
        {
          path: 'master',
          element: <></>,
        },
      ],
    },
  ],
};

export default MyRoutes;
