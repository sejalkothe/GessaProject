import { Typography } from '@mui/material';
import { useRoutes } from 'react-router-dom';
import { Microfrontend } from '../../../micro-frontend';
import React from 'react';
import { Outlet } from 'react-router';
import MFViewPageApp from '../../../micro-frontend/remotes/view-page-app';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

const Dashboard = () => <Typography variant="h2">Dashboard</Typography>;
const Orders = () => <Typography variant="h2">Orders</Typography>;
const Customers = () => <Typography variant="h2">Customers</Typography>;
const Reports = () => <Typography variant="h2">Reports</Typography>;


const obj =[
  {
    id: 1,
    name: "button",
    x: "10",
    y: "10"
  },
  {
    id: 2,
    name: "header",
    x: "20",
    y: "30"
  },
]

const Tmponents = (strig: string) =>  {
 const map: {
  [string: string]: () => JSX.Element
 } = {
    "button": () => {
      return <><Button /></>
    },
    "header": () => {
      return <><Button /></>
    }
 }

 return map[strig]();
}

const RenderWidget = () => {
  obj.map((item)=> {
    return (<div>asdsad</div>)
  })
 
}

const Test = () => {
  return <>{RenderWidget()}</>;
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
