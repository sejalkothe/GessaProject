import { Microfrontend } from 'apps/react-host/src/micro-frontend';
import MFViewPageApp from 'apps/react-host/src/micro-frontend/remotes/react-remote-app';
import React, { memo } from 'react';

export interface IViewPageProps {
  tabData: any;
}

const viewPageUi = (props: IViewPageProps) => {
  return (
    <Microfrontend
      url={MFViewPageApp.url}
      scope={MFViewPageApp.scope}
      module={MFViewPageApp.components.ViewPageAppComponent}
      props={props.tabData}
    />
  );
};

export default memo(viewPageUi);
