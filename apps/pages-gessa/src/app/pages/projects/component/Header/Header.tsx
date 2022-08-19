import React, { lazy, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/material';
import { ITheme } from '../../../../../theme/index';
import { alpha, styled, useTheme } from '@mui/system';
import TextField from '@mui/material/TextField';
import SearchInput from '../SearchBox';
import { IconComponent } from '@iauro/soulify';
import Avatar from '@mui/material/Avatar';

function Header({ title, searchBar, logo }: any) {
  const [inputText, setInputText] = useState('');

  const inputHandler = (e: any) => {
    //convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
  const TextField = lazy(() => import('@mui/material/TextField'));

  const StyledHeader = styled(Stack)(({ theme }): any => {
    return {
      // MuiInputBase-input MuiOutlinedInput-input css-1sw4ac3-MuiInputBase-input-MuiOutlinedInput-input
      '& .MuiInputBase-root': {
        height: '10px',
      },

      '& .MuiOutlinedInput-input': {
        height: '10px',
      },
    };
  });

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const theme: ITheme = useTheme();
  console.log('inputText', inputText);
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
            height: '22px',
          }}
        >
          <img src={logo} alt="logo" />
        </Box>
      </Box>
      <Box sx={{ width: '25%' }}></Box>
      <Box
        sx={{
          width: '40%',
          height: '4vh',
          margin: '12px',
          //  borderBottom: `1px solid ${theme.palette?.systemColor5?.main}`,
        }}
      >
        {searchBar ? (
          <SearchInput
            label="Search"
            backgroundColor={theme?.palette?.background?.default || ''}
            borderColor={`1px solid ${theme.palette?.text?.c100}`}
            value={inputText}
            onChange={() => inputHandler}
          />
        ) : (
          ''
        )}
      </Box>
      <Box sx={{ width: '25%' }}></Box>
      <Stack
        direction="row"
        spacing={1}
        // mt={2}
        sx={{
          width: '8%',
          height: '8vh',
          margin: '0px',
          padding: '8px',
          justifyContent: 'center',
          display: 'flex',
          //  borderBottom: `1px solid ${theme.palette?.systemColor5?.main}`,
        }}
      >
        <Box
          sx={{
            paddingBottom: '18px',
            // justifyContent: 'center',
            // display: 'flex',
          }}
        >
          <IconComponent
            name={'Notification_24dp'}
            size={25}
            label={'notification'}
            color={theme?.palette?.text?.primary}
          />
        </Box>
        <Avatar
          sx={{
            bgcolor: theme?.palette?.secondary?.main,
            width: '36px',
            height: '36px',
            fontSize: '12px',
          }}
          {...stringAvatar('Kent Dodds')}
        />
      </Stack>
    </Stack>
  );
}

export default Header;
