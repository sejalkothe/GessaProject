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
  const params: any = useParams();
  const childMenus = useContext(ChildMenuContext);
  const [selectedPage, setSealectedPage] = useState<any>('');

  useEffect(() => {
    if (params && params.subMenuId && childMenus && childMenus.length > 0) {
      const _menu = childMenus.find(
        (value: any) => value.name === params.subMenuId
      );
      setSealectedPage(_menu);
    }
  }, [params, childMenus]);

  /** get the menu id from url params */
  const menuDetails = useMemo(() => {
    // const menu = params['*']?.split('/');
    const menuId = params.menuId;
    const subMenuId = params.subMenuId;
    return { menuId, subMenuId };
  }, [params]);

  useEffect(() => {
    if (selectedPage) {
      props.openPage && props.openPage(selectedPage);
    }
  }, [selectedPage]);
  useEffect(() => {
    // console.log('childMenus', childMenus);
  }, [childMenus]);
  useEffect(() => {
    // console.log('selectedPage', selectedPage);
  }, [selectedPage]);

  return (
    <div>
      {props.menuType === 'classic' ? (
        <List component="nav" disablePadding>
          {childMenus && childMenus.length !== 0 ? (
            childMenus?.map((item: any, index: number) => (
              <Link
                key={index}
                style={{ textDecoration: 'none' }}
                to={`/project/${params.projectId}/${params.menuId}/${
                  item.name || params.subMenuId
                }/`}
                onClick={() => setSealectedPage(item)}
              >
                <AppMenuItem
                  label={item.name}
                  icon={item.icon}
                  key={index}
                  isSelected={
                    item.name === selectedPage.name ||
                    item.name === params.subMenuId
                  }
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
