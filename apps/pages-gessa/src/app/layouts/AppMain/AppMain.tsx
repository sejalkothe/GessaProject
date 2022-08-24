import React from 'react';
import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';
import ViewPageUi from './Page-ui/viewPageUi';

const Test = () => {
  return <Typography variant="body1">feature3</Typography>;
};

const Nest = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

export const routesObj = [
  {
    path: '/menu/:menuId/sub-menu/feature3/',
    element: <ViewPageUi tabData={{}} />,
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
  <Microfrontend
    url={MFViewPageApp.url}
    scope={MFViewPageApp.scope}
    module={MFViewPageApp.components.ViewPageAppComponent}
    props={{}}
  />
);

export default AppMain;
