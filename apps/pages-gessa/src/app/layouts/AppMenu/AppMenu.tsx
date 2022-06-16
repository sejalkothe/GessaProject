import React from 'react';
import { List } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  return (
    <div>
      {menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {appMenuItems.map((item: any, index: number) => (
            <AppMenuItem
              label={item.label}
              link={item.link}
              items={item?.items}
              key={index}
            />
          ))}
        </List>
      ) : (
        <NavMenuItem appMenuItems={appMenuItems} />
      )}
    </div>
  );
}

export default AppMenu;
