import React from 'react';
import { Typography } from '@mui/material';
import { Box, useTheme } from '@mui/material';
import { ITheme } from 'apps/pages-gessa/src/theme';



function Header() {
  const theme : ITheme = useTheme();
  console.log("theme",  theme?.palette)
  return (
    <Box
      sx={{
        width: '100%',
        height: '8vh',
        borderBottom: `1px solid ${theme.palette?.systemColor5?.main}`,
      }}
    >
    
     <Typography color={theme?.palette?.text?.primary} variant="body1">Header</Typography>
    </Box>
  );
}

export default Header;
