import React from 'react';
import { SettingContext } from '../../context';
import Classic from './Classic';
import Enterprise from './Enterprise';
import Empty from './Empty';

const AppLayout = () => {
  const { settings, setSettings } = React.useContext(SettingContext);

  switch (settings.layout) {
    case 'classic-ltr':
      return <Classic />;
    case 'classic-rtl':
      return <Classic right={true} />;
    case 'enterprise-ttb':
      return <Enterprise />;
    case 'enterprise-btu':
      return <Enterprise bottom={true} />;
    case 'empty':
      return <Empty />;
    default:
      return <Classic />;
  }
};

export default AppLayout;
