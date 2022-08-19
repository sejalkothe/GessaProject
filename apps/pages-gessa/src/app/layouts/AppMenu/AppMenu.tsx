import React, { useContext } from 'react';
import { List, Typography } from '@mui/material';
import AppMenuItem from './AppMenuItem';
import NavMenuItem from './NavMenuItem';
import { appMenuItems } from './app-menu-items';
import { Link } from 'react-router-dom';
import ChildMenuContext from '../../pages/projects/component/ChildMenusContext';

interface Props {
  menuType: string;
}

function AppMenu({ menuType }: Props) {
  const childMenus = useContext(ChildMenuContext);

  return (
    <div>
      {menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {childMenus.length !== 0 ? (
            childMenus?.map((item: any, index: number) => (
              <Link
                key={index}
                style={{ textDecoration: 'none' }}
                to={`${(index + 1).toString()}`}
              >
                <AppMenuItem label={item.name} icon={item.icon} key={index} />
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
