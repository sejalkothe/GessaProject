import React, { useContext, useEffect, useMemo, useState } from 'react';
import { List, Typography } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';
import { Link } from 'react-router-dom';
import ChildMenuContext from '../../pages/projects/component/ChildMenusContext';
import { useParams } from 'react-router-dom';

interface Props {
  menuType: string;
  openPage?: (data: any) => any;
}

function AppMenu(props: Props) {
  const childMenus = useContext(ChildMenuContext);
  const [selectedPage, setSealectedPage] = useState<any>('');

  const params = useParams();

  /** get the menu id from url params */
  const menuDetails = useMemo(() => {
    const menu = params['*']?.split('/');
    const menuId = menu?.[1];
    const subMenuId = menu?.[3];
    return { menuId, subMenuId };
  }, [params]);

  useEffect(() => {
    if (selectedPage) {
      props.openPage && props.openPage(selectedPage);
    }
  }, [selectedPage]);
  useEffect(() => {
    console.log('childMenus', childMenus);
  }, [childMenus]);

  return (
    <div>
      {props.menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {childMenus && childMenus.length !== 0 ? (
            childMenus?.map((item: any, index: number) => (
              <Link
                key={index}
                style={{ textDecoration: 'none' }}
                to={`/project/630c6ce8dc1e45226aa4a9b9/menu/${menuDetails.menuId}/sub-menu/${item.name}/`}
                onClick={() => setSealectedPage(item)}
              >
                <AppMenuItem
                  label={item.name}
                  icon={item.icon}
                  key={index}
                  isSelected={menuDetails.subMenuId === item.name}
                />
              </Link>
            ))
          ) : (
            <Typography
              sx={{
                justifyContent: 'center',
                display: 'flex',
                marginTop: '22px',
              }}
              variant="caption"
            >
              No Feature Available
            </Typography>
          )}
        </List>
      ) : (
        <NavMenuItem appMenuItems={appMenuItems} />
      )}
    </div>
  );
}

export default AppMenu;
