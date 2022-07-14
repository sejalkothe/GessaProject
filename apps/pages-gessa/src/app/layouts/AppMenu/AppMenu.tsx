import React, { useEffect, useState } from 'react';
import { List } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../context/redux';
import {
  getAppMenu,
  selectAllMenu,
} from '../../pages/projects/store/appMenuSlice';
import { IRootState } from '../../../store/index';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  const rootState = useSelector((state: IRootState) => state);
  const [menuData, setMenuData]: any = useState([]);
  const dispatch = useAppDispatch();
  const tempmenuList = selectAllMenu(rootState);

  useEffect(() => {
    dispatch(getAppMenu({ tenantid: 'master', page: 0, size: 8 })).catch(
      (reason: any) => {
        console.log('error', reason);
      }
    );
  }, []);

  useEffect(() => {
    if (tempmenuList) {
      setMenuData(tempmenuList);
    }
  }, [tempmenuList]);

  return (
    <div>
      {menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {menuData?.map((item: any, index: number) => (
            <AppMenuItem
              label={item.name}
              // link={item.link}
              // items={item?.items}
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
