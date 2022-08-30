import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';
import ViewPageUi from './Page-ui/viewPageUi';
import { useEffect } from 'react';

const Test = () => {
  return <Typography variant="body1">feature3</Typography>;
};

const Nest = () => {
  return <Typography variant="body1">Loading...</Typography>;
};

// export const routesObj = [
//   {
//     path: '/menu/:menuId/sub-menu/feature3/',
//     element: <ViewPageUi tabData={{}} />,
//   },
//   {
//     path: '/3',
//     element: <Nest />,
//   },
// ];

// export const Routing = () => {
//   return useRoutes(routesObj);
// };

const AppMain = (props: any) => {
  const [_props, setProps] = useState<any>();

  useEffect(() => {
    if (props && props.pageId) {
      setProps(props);
    }
  }, [props]);
  return _props && _props.pageId && _props.pageId.length > 0 ? (
    <ViewPageUi tabData={_props}></ViewPageUi>
  ) : (
    <></>
  );
};

export default AppMain;
