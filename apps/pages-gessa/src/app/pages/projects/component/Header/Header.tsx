import React, { useState } from 'react';
import { Stack } from '@mui/material';
import { Box } from '@mui/material';
import { ITheme } from '../../../../../theme/index';
import { alpha, styled, useTheme } from '@mui/system';
import SearchInput from '../SearchBox';
import { IconComponent } from '@gessa/component-library';
import Avatar from '@mui/material/Avatar';

function Header({ title, searchBar, logo }: any) {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e: any) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const theme: ITheme = useTheme();
  return (
    <Stack
      direction="row"
      sx={{
        width: '100%',
        height: '8vh',
        justifyContent: 'center',
        display: 'flex',
        background: theme.palette?.light?.c50,
        borderBottom: `1px solid ${theme.palette?.text?.c100}`,
      }}
    >
      <Box
        sx={{
          width: '8%',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '75px',
            background: theme.palette?.light?.c50,
            height: '22px',
          }}
        >
          <img src={'../../../../assets/Logo.svg'} alt="logo" />
        </Box>
      </Box>
      <Box sx={{ width: '27%' }}></Box>
      <Box
        sx={{
          width: '30%',
          // height: '100%',
          margin: '12px',
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {searchBar ? (
          <SearchInput
            label="Search"
            value={inputText}
            onChange={(e: any) => inputHandler(e)}
          />
        ) : (
          ''
        )}
      </Box>
      <Box sx={{ width: '27%' }}></Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: '8%',
          height: '8vh',
          margin: '0px',
          padding: '8px',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        {/* <Box
          sx={{
            // paddingBottom: '18px',

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        > */}
        <IconComponent
          name={'Notification_24dp'}
          size={35}
          label={'notification'}
          color={theme?.palette?.text?.primary}
        />
        {/* </Box> */}
        <Box
          sx={{
            // paddingBottom: '18px',

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme?.palette?.secondary?.main,
              color: theme?.palette?.light?.main,
              width: '36px',
              height: '36px',
              fontSize: '12px',
            }}
            {...stringAvatar('Kent Dodds')}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default Header;
