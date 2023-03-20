import MFViewPageApp from './react-remote-app';
import MFSurveyApp from './survey-app';

export { default as ViewPageApp } from './react-remote-app';
export { default as SurveyPage } from './survey-app';

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
  viewpageApp: MFViewPageApp,
  surveyApp: MFSurveyApp
};

export default microFrontends;
