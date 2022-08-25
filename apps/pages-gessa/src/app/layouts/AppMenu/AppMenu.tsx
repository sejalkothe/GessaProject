import React, { useContext, useMemo } from 'react';
import { List, Typography } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';
import { Link } from 'react-router-dom';
import ChildMenuContext from '../../pages/projects/component/ChildMenusContext';
import { useParams } from 'react-router-dom';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  const childMenus = useContext(ChildMenuContext);

  const params = useParams();

  /** get the menu id from url params */
  const menuDetails = useMemo(() => {
    const menu = params['*']?.split('/');
    const menuId = menu?.[1];
    const subMenuId = menu?.[3];
    return { menuId, subMenuId };
  }, [params]);

  return (
    <div>
      {menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {childMenus.length !== 0 ? (
            childMenus?.map((item: any, index: number) => (
              <Link
                key={index}
                style={{ textDecoration: 'none' }}
                to={`menu/${menuDetails.menuId}/sub-menu/${item.name}/`}
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
