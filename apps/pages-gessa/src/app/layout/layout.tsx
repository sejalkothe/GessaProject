import { useContext } from 'react';
import { RouteContext } from '../../context';
import { useRoutes } from 'react-router-dom';
import { RouteContextType } from '../../types/routes';
import { routes } from './route';
import AppLayout from '../layouts/AppLayout';

const LayoutWrapper = () => {
  return useRoutes(routes);
};

export default LayoutWrapper;
