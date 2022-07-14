import React from 'react';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/system';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import AppMenuItemComponent from './AppMenuItemComponent';

export function getIcon(label: string) {
  switch (label) {
    case 'Dashboard':
      return <DashboardIcon />;
    case 'Orders':
      return <ShoppingCartIcon />;
    case 'Customers':
      return <PeopleAltIcon />;
    case 'Reports':
      return <BarChartIcon />;
    case 'Nested Pages':
      return <LibraryBooksIcon />;
    default:
      return null;
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
        color: theme?.palette?.['custom']?.soulify,
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
