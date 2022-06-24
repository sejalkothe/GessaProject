import React, { useEffect } from 'react';
import { List } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';
import { useAppDispatch } from '../../../context/redux';
import { getAppMenu } from '../../pages/projects/store/appMenuSlice';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAppMenu({ page: 1, size: 8 }))
      .then((data) => {
        console.log('data', data);
      })
      .catch((reason) => {
        console.log('reason', reason);
      });
  });

  // const handleMenu = () => {
  //   dispatch(getAppMenu({ page: 1, size: 8 }))
  //     .unwrap()
  //     .then()
  //     .catch((reason) => {
  //       console.log('reason', reason);
  //     });
  // };

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
