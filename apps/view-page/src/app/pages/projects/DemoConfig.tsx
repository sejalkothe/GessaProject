import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router';
import { IPageConfig } from '../../../types/pageConfig';

const Demo2Wrapper = lazy(() => import('./DemoWrapper'));

const ProjectConfig: IPageConfig = {
  settings: {
    showHeader: true,
    layout: 'classic-ltr',
  },
  routes: [
    {
      path: '*',
      element: <Navigate to="demo" />,
    },
    {
      path: 'demo',
      element: (
        <Suspense fallback={<>...</>}>
          <Demo2Wrapper page_id="1" />
        </Suspense>
      ),
    },
  ],
};

export default ProjectConfig;
