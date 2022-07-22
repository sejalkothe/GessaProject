import React from 'react';
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

export function getIcon(label: string) {
  const theme = useTheme();
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
      {!!Icon && <ListItemIcon>{Icon}</ListItemIcon>}
      <CustomTheme className="text-red" primary={label} inset={!Icon} />
      {/* Display the expand menu if the item has children */}
      {isExpandable && !open && <ExpandMoreIcon />}
      {isExpandable && open && <ExpandLessIcon />}
    </AppMenuItemComponent>
  );

  const MenuItemChildren = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Divider />
      <List component="div" disablePadding>
        {items.map((item: any, index: number) => (
          <AppMenuItem {...item} key={index} />
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
