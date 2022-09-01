import React, { useContext, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import { IconComponent, Button, Drawer, Menu2 } from '@gessa/component-library';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppMenuItemComponent from './AppMenuItemComponent';
import ChildMenuContext from '../../pages/projects/component/ChildMenusContext';
import { ITheme } from 'apps/pages-gessa/src/theme';

export function getIcon(label: string) {
  const theme: ITheme = useTheme();
  switch (label) {
    case 'Dashboard':
      return (
        <IconComponent
          name={'view_quilt_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
    case 'Orders':
      return (
        <IconComponent
          name={'view_quilt_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
    case 'Customers':
      return (
        <IconComponent
          name={'view_quilt_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
    case 'Reports':
      return (
        <IconComponent
          name={'view_quilt_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
    case 'Nested Pages':
      return (
        <IconComponent
          name={'view_quilt_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
    default:
      return (
        <IconComponent
          name={'analytics_black_24dp'}
          size={25}
          label={'Quilt'}
          color={theme?.palette?.text?.['primary']}
        />
      );
  }
}

interface Props {
  label: string;
  link?: string | undefined;
  items?: any;
  icon?: any;
  isSelected: boolean;
}

function AppMenuItem(props: Props) {
  const { label, icon, link, items = [] } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  const theme: ITheme = useTheme();

  function handleClick() {
    setOpen(!open);
  }

  const Icon: any = getIcon(label);

  const MenuItemRoot = (
    <Box
      sx={{
        background: props.isSelected
          ? theme?.palette?.background?.default
          : theme?.palette?.light?.c50,
      }}
    >
      <AppMenuItemComponent link={link} onClick={handleClick}>
        {/* Display an icon if any */}
        <Box
          sx={{
            color: props.isSelected
              ? theme?.palette?.primary?.main
              : theme?.palette?.text?.primary,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
          }}
        >
          <IconComponent
            name={icon}
            size={25}
            label={'Quilt'}
            color={
              props.isSelected
                ? theme?.palette?.primary?.main
                : theme?.palette?.text?.primary
            }
          />
          <ListItemText
            sx={{
              textTransform: 'capitalize',
            }}
            className="text-red"
            primary={label}
            inset={!Icon}
          />
        </Box>
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <ExpandMoreIcon />}
        {isExpandable && open && <ExpandLessIcon />}
      </AppMenuItemComponent>
    </Box>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item: any, index: number) => (
          <>
            <AppMenuItem
              {...item}
              key={index}
              onClick={(e: any) => {
                console.log(e);
              }}
            />
          </>
        ))}
      </List>
    </Collapse>
  ) : null;

  return (
    <>
      {MenuItemRoot}
      {MenuItemChildren}
    </>
  );
}

export default AppMenuItem;
