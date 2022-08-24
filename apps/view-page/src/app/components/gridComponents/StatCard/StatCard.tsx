import React from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import IconComponent from '../icon-component/icon-component';

export interface StatCardProps {
  data: StatCardData;
}

export interface StatCardData {
  title?: string;
  stat?: any;
  iconName: string;
  link?: string;
}

export const StatCard = ({ data }: StatCardProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        border: `1px solid ${theme.palette.grey[800]}`,
        borderRadius: '4px',
        m: 1,
      }}
    >
      <Box
        sx={{
          mx: 1.5,
          my: 'auto',
          p: 1,
          borderRadius: '4px',
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <IconComponent name={data.iconName} size={35} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', my: 'auto' }}>
        <Typography>{data.title}</Typography>
        <Typography sx={{ fontWeight: 700 }} variant="h5">
          {data.stat}
        </Typography>
      </Box>
      {data.link && (
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            py: 0,
            px: 0.5,
            bottom: 5,
            right: 5,
            cursor: 'pointer',
            color: theme.palette.info.dark,
          }}
        >
          {data.link}
        </Typography>
      )}
    </Box>
  );
};

export default StatCard;
