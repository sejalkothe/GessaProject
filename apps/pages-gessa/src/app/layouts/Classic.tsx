import { Box, useTheme } from '@mui/material';
import React, { useContext, useState } from 'react';
import AppMain from './AppMain/AppMain';
import AppMenu from './AppMenu/AppMenu';
import { ITheme } from '../../theme/index';
// import './Classic.css';
import childMenuContext from '../pages/projects/component/ChildMenusContext';

function Classic({ right = false }) {
  const theme: ITheme = useTheme();
  const [menuData, setMenuData] = useState<any>();
  const childMenus: any = useContext(childMenuContext);
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
      // className={`container__classic ${right && 'container__classic__RT'}`}
      style={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 'calc(100vh - 8vh)',
        overflowX: 'hidden',
        overflowY: 'hidden',
        width: '100%',
      }}
    >
      {childMenus && childMenus.length > 0 && (
        <Box
          sx={{
            backgroundColor: theme.palette?.light?.c50,
            color: theme.palette.text?.primary,
            borderRight: `1px solid ${theme.palette?.text?.c100}`,
            height: 'calc(100vh - 8vh)',
            width: '260px',
          }}
        >
          <AppMenu
            menuType="classic"
            openPage={(e: any) => {
              setMenuData(e);
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',

          backgroundColor: theme.palette.background?.default,
          color: theme.palette.text?.primary,
          height: 'calc(100vh - 8vh)',
          width:
            childMenus && childMenus.length > 0 ? 'calc(100% - 260px)' : '100%',
        }}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background?.default,
            color: theme.palette.text?.primary,
            width: '100%',
          }}
        >
          <AppMain pageId={(menuData && menuData.pageId) || ''} />
        </Box>
      </Box>
    </div>
  );
}

export default Classic;
