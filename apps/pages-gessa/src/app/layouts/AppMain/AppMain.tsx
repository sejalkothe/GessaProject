import { Typography } from '@mui/material';
import { Microfrontend } from 'apps/pages-gessa/src/micro-frontend';
import React from 'react';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';

const Dashboard = () => <Typography variant="h2">Dashboard</Typography>;
const Orders = () => <Typography variant="h2">Orders</Typography>;
const Customers = () => <Typography variant="h2">Customers</Typography>;
const Reports = () => <Typography variant="h2">Reports</Typography>;
console.log(MFViewPageApp.components.ViewPageAppComponent);

const AppMain = () => (
  <>
    <Microfrontend
      url={MFViewPageApp.url}
      scope={MFViewPageApp.scope}
      module={MFViewPageApp.components.ViewPageAppComponent}
      props={{}}
    />
    <Outlet />
  </>
);

export default AppMain;
