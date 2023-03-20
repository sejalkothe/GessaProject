import { environment } from '../../environments/environment';

const MFSurveyApp = {
  url: environment.SURVAY_URL,
  scope: 'SurveyPage',
  components: {
    SurveyAppComponent: './SurveyAppComponent',
  },
  slices: {
    // grid: './grid',
  },
  routes: {
    // default: './RoutingDemoConfig',
  },
};

export default MFSurveyApp;
