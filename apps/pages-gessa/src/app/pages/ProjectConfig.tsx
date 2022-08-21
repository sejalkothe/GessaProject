import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router';
import { IPageConfig } from '../../types/pageConfig';
import Project from './projects/Project';

const ProjectWrapper = lazy(
  () => import('./projects/component/ProjectWrapper')
);

const MyRoutes = {
  routes: [
    {
      path: 'project',
      element: <ProjectWrapper />,
      children: [
        {
          path: ':projectId/',
          element: (
            <>
              <div>test</div>
            </>
          ),
          children: [
            {
              path: ':menuId/',
              element: (
                <>
                  <div>test1</div>
                </>
              ),
              children: [
                {
                  path: ':subFeatureId/',
                  element: (
                    <>
                      <div>test2</div>
                    </>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default MyRoutes;
