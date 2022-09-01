import { Box, useTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AppHeader from './AppHeader/AppHeader';
import AppMain from './AppMain/AppMain';
import AppDrawer from './AppMenu/AppDrawer';
import AppMenu from './AppMenu/AppMenu';
import { ITheme } from '../../theme/index';
import './Classic.css';
import childMenuContext from '../pages/projects/component/ChildMenusContext';
import { useParams } from 'react-router-dom';

function Classic({ right = false }) {
  const theme: ITheme = useTheme();
  const [menuData, setMenuData] = useState<any>();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event && event.type === 'keydown') {
        return;
      }
      setDrawerOpen(open);
    };
  return (
    <div
      className={`container__classic ${right && 'container__classic__RT'}`}
      style={{ overflow: 'hidden' }}
    >
      <Box
        component="aside"
        className="aside__classic"
        sx={{
          backgroundColor: theme.palette?.light?.c50,
          color: theme.palette.text?.primary,
          borderRight: `1px solid ${theme.palette?.text?.c100}`,
        }}
      >
        <AppMenu
          menuType="classic"
          openPage={(e: any) => {
            setMenuData(e);
          }}
        />
      </Box>
      <Box component="main" className="main__classic">
        <Box
          component="div"
          className="main__content"
          sx={{
            backgroundColor: theme.palette.background?.default,
            color: theme.palette.text?.primary,
          }}
        >
          <AppMain pageId={(menuData && menuData.pageId) || ''} />
        </Box>
      </Box>
      {/* <AppDrawer
        anchor="left"
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      /> */}
    </div>
  );
}

export default Classic;
