import { Box, Stack } from '@mui/material';
import React from 'react';
import AppLayout from '../../layouts/AppLayout';
import Header from './component/Header/Header';
import { IconComponent, Button, Drawer, Menu2 } from '@iauro/soulify';

function Project() {
  return (
    <Box>
      <Header />
      <Stack direction="row">
        <Box
          sx={{
            width: '50px',
            height: '92vh',
            borderRight: '1px solid #808080',
          }}
        >
          <Stack direction="column">
            <IconComponent
              name={'view_quilt_black_24dp'}
              size={25}
              label={'Quilt'}
              color={'white'}
            />
            <IconComponent
              name={'tips_and_updates_black_24dp'}
              size={25}
              label={'tips_and_updates'}
              color={'white'}
            />
            <IconComponent
              name={'settings_black_24dp'}
              size={25}
              label={'Settings'}
              color={'white'}
            />
          </Stack>
        </Box>
        <AppLayout />
      </Stack>
    </Box>
  );
}

export default Project;
