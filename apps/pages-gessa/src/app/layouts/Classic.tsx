import { Box, useTheme } from '@mui/material';
import React from 'react';
import AppHeader from './AppHeader/AppHeader';
import AppMain from './AppMain/AppMain';
import AppDrawer from './AppMenu/AppDrawer';
import AppMenu from './AppMenu/AppMenu';
import { ITheme } from 'apps/pages-gessa/src/theme';
import './Classic.css';

function Classic({ right = false }) {
  const theme: ITheme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  {console.log("colros", theme.palette )}
  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (event && event.type === 'keydown') {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <div className={`container__classic ${right && 'container__classic__RT'}`}>
      
      <Box
        component="aside"
        className="aside__classic"
        sx={{
          backgroundColor: theme.palette?.background?.default,
          color: theme.palette.primary?.main,
          borderRight: `1px solid ${theme.palette?.systemColor5?.main}`,
        }}
      >
        <AppMenu menuType="classic" />
      </Box>
      <Box component="main" className="main__classic">
        {/* <Box
          component="header"
          className="header__classic"
          sx={{
            backgroundColor: theme.palette.background.default,
            color: theme.palette.primary.main,
            borderBottom: `1px solid ${theme.palette.grey[900]}`,
          }}
        ></Box> */}
        <Box
          component="div"
          className="main__content"
          sx={{
            backgroundColor: theme.palette.background?.default,
            color: theme.palette.text?.primary,
          }}
        >
          <AppMain />
        </Box>
      </Box>
      <AppDrawer
        anchor="left"
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
      />
    </div>
  );
}

export default Classic;
