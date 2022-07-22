import { IMicroFrontend } from '.';

const MFViewPageApp = {
  url: 'http://localhost:8001/remoteEntry.js',
  scope: 'ViewPageApp',
  components: {
    ViewPageAppComponent: './ViewPageAppComponent',
  },
  slices: {
    // ViewPageSlice: './ViewPageSlice',
  },
  routes: {
    // default: './RoutingDemoConfig',
  },
};

export default MFViewPageApp;
