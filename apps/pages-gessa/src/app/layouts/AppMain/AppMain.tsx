import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import React from 'react';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';

const Dashboard = () => <Typography variant="h2">Dashboard</Typography>;
const Orders = () => <Typography variant="h2">Orders</Typography>;
const Customers = () => <Typography variant="h2">Customers</Typography>;
const Reports = () => <Typography variant="h2">Reports</Typography>;

const Test = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

const Nest = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

const Routing = () => {
  return useRoutes([
    {
      path: '/2',
      element: <Test />,
    },
    {
      path: '/3',
      element: <Nest />,
    },
  ]);
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
