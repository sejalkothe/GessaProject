import { Microfrontend } from 'apps/react-host/src/micro-frontend';
import MFSurveyApp from 'apps/react-host/src/micro-frontend/remotes/survey-app';
import { memo } from 'react';

export interface IViewPageProps {
  tabData: any;
}

const survayUi = (props: IViewPageProps) => {
  return (
    <Microfrontend
      url={MFSurveyApp.url}
      scope={MFSurveyApp.scope}
      module={MFSurveyApp.components.SurveyAppComponent}
      props={props.tabData}
    />
  );
};

export default memo(survayUi);
