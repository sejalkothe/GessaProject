import React from 'react';
import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';

const Test = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

const Nest = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

export const routesObj = [
  {
    path: '/2',
    element: <Test />,
  },
  {
    path: '/3',
    element: <Nest />,
  },
];

export const Routing = () => {
  return useRoutes(routesObj);
};

const AppMain = () => (
  <Routing />
  // <>
  //   <Microfrontend
  //     url={MFViewPageApp.url}
  //     scope={MFViewPageApp.scope}
  //     module={MFViewPageApp.components.ViewPageAppComponent}
  //     props={{}}
  //   />
  //   <Outlet />
  // </>
);

export default AppMain;
