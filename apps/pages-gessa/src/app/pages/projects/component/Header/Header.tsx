import { Box, useTheme } from '@mui/material';
import React from 'react';

function Header() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: '100%',
        height: '8vh',
        borderBottom: `1px solid ${theme.palette.background['paper']}`,
      }}
    >
      Header
    </Box>
  );
}

export default Header;
