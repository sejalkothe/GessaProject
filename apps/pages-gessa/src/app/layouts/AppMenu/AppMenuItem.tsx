import React, { useContext, useState } from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import { IconComponent, Button, Drawer, Menu2 } from '@iauro/soulify';
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
}

function AppMenuItem(props: Props) {
  const { label, link, items = [] } = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  const [isClicked, setClicked]: any = useState(false);
  const childMenus = useContext(ChildMenuContext);
  const theme: ITheme = useTheme();
  console.log('childMenus', childMenus);

  const CustomTheme = styled(ListItemText)(({ theme }) => {
    return {
      '& .MuiListItemText-primary': {
        color: theme?.palette?.['text']?.primary,
        textTransform: 'capitalize',
        disableRipple: true,
      },
      '& .MuiButtonBase': {
        disableRipple: true, // No more ripple, on the whole application!
      },
    };
  });

  function handleClick() {
    setOpen(!open);
  }

  const Icon: any = getIcon(label);

  const MenuItemRoot = (
    <AppMenuItemComponent link={link} onClick={handleClick}>
      {/* Display an icon if any */}
      <Box
        sx={{
          color: isClicked
            ? theme?.palette?.primary?.main
            : theme?.palette?.text?.primary,
          background: isClicked
            ? theme?.palette?.background?.default
            : theme?.palette?.light?.c50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '300px',
          // border: '1px solid red',
          // textTransform: 'capitalize',
        }}
        onClick={() => {
          setClicked(!isClicked);
        }}
      >
        {!!Icon && <ListItemIcon>{Icon}</ListItemIcon>}
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
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <p>fsdfds</p>
      <List component="div" disablePadding>
        {items.map((item: any, index: number) => (
          <>
            {' '}
            <p>fsdfds</p>
            <AppMenuItem {...item} key={index} />
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
