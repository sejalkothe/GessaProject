import MFProjects from './projects';

export { default as Projects } from './projects';

export interface IMicroFrontend {
  url: string;
  scope: string;
  components: {
    [key: string]: string;
  };
  slices: {
    [key: string]: string;
  };
  routes: {
    [key: string]: string;
  };
}

export interface IMicroFrontends {
  [key: string]: IMicroFrontend;
}

const microFrontends: IMicroFrontends = {
  projects: MFProjects,
};

export default microFrontends;
