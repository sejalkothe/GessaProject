import { Box, Stack, useTheme } from '@mui/material';
import React from 'react';
import Header from './component/Header/Header';
import { IconComponent } from '@iauro/soulify';
import { Link, Route, Routes } from 'react-router-dom';
import { routes } from '../../layout/route';
import LayoutWrapper from '../../layout/layout';

function Project() {
  const theme = useTheme();
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <Box
          sx={{
            width: '50px',
            height: '92vh',
            borderRight: `1px solid ${theme.palette.background['paper']}`,
          }}
        >
          <Stack direction="column">
            <Link to="/1" style={{ textDecoration: 'none' }}>
              <IconComponent
                name={'view_quilt_black_24dp'}
                size={25}
                label={'Quilt'}
                color={theme?.palette?.text?.['primary']}
              />
            </Link>

            <Link to="/2" style={{ textDecoration: 'none' }}>
              <IconComponent
                name={'tips_and_updates_black_24dp'}
                size={25}
                label={'tips_and_updates'}
                color={theme?.palette?.text?.['primary']}
              />
            </Link>

            <Link to="/3" style={{ textDecoration: 'none' }}>
              <IconComponent
                name={'settings_black_24dp'}
                size={25}
                label={'Settings'}
                color={theme?.palette?.text?.['primary']}
              />
            </Link>
          </Stack>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <LayoutWrapper />
        </Box>
      </Stack>
    </Box>
  );
}

export default Project;
