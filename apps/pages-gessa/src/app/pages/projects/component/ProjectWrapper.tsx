import { Outlet } from 'react-router';
import Project from '../Project';
import { useRoutes } from 'react-router-dom';

const ProjectWrapper = () => {
  const Router = useRoutes([
    {
      path: '/project/:projectId/*',
      element: <Project />,
    },
  ]);

  return (
    <div className="flex flex-row overflow-y-hidden">
      <Project />
      <Outlet />
    </div>
  );
};

export default ProjectWrapper;
