import React, { useContext, useEffect, useState } from 'react';
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
import ChildMenuContext from '../../pages/projects/component/ChildMenusContext';
import { Link, Route, Routes, useParams } from 'react-router-dom';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  const rootState = useSelector((state: IRootState) => state);
  const [menuData, setMenuData]: any = useState([]);
  const dispatch = useAppDispatch();
  const tempmenuList = selectAllMenu(rootState);
  const newUrl = window.location.href.replace('#', '');
  const childMenus = useContext(ChildMenuContext);
  const params: any = useParams();

  useEffect(() => {
    if (tempmenuList) {
      setMenuData(tempmenuList);
    }
  }, [tempmenuList]);

  return (
    <div>
      {menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {childMenus?.map((item: any, index: number) => (
            <Link
              key={index}
              style={{ textDecoration: 'none' }}
              to={`/${params.projectId}/${params.menuId}/${(
                index + 1
              ).toString()}`}
            >
              <AppMenuItem
                label={item.name}
                // link={item.link}
                // items={item?.items}
                key={index}
              />
            </Link>
          ))}
        </List>
      ) : (
        <NavMenuItem appMenuItems={appMenuItems} />
      )}
    </div>
  );
}

export default AppMenu;
