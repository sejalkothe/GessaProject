import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  makeStyles,
  Menu,
  MenuItem,
  Popover,
  styled,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
import { environment } from 'apps/view-page/src/environments/environment';
import themes from 'apps/view-page/src/theme';
import generateRandomString from 'apps/view-page/src/utils/randomString';
import { useEffect, useRef, useState } from 'react';
import IconComponent from '../../../components/gridComponents/icon-component/icon-component';
import CustomModal, { BootstrapDialogTitle } from './customModal';

export interface IMenuClicked {
  menu: string;
  data: any;
}
export interface IGridCard {
  widgets: any;
  id: string;
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
  type?: string;
  selectedWidget: any;
  data: any;
  actions: any;
  children: any;
  editWidget: (data: any) => void;
}

const StyledIconComponent = styled(Menu)(({ theme }) => {
  return {
    '& .MuiMenu-list': {
      padding: 0,
    },
  };
});

const BootstrapDialog = styled(Dialog)(({ theme }) => {
  return {
    '& .MuiDialogContent-root': {
      padding: 2,
    },
    '& .MuiDialogActions-root': {
      padding: 2,
    },
  };
});

export default function GridCard(props: IGridCard) {
  const menuArray = ['Preview', 'Download'];
  const { widgets } = props;
  // const classes = useStyles<any>();
  const theme = useTheme();
  const themeChart = themes.default;
  const ref = useRef(null);
  const [_selectedWidget, _setselectedWidget] = useState<any>({});
  const [toggle, setToggle] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [currentCompomponent, setCurrentComponent] = useState<any>(
    props.children
  );
  const [open, setOpen] = useState<any>(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(Boolean(event.currentTarget));
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    if (props.selectedWidget) {
      _setselectedWidget(props.selectedWidget);
    }
  }, [props.selectedWidget]);

  useEffect(() => {
    props.actions.handleRemove(ref.current, false);
    props.actions.handleAdd(ref.current, props);
  }, [props]);

  // const [open, setOpen] = useState(false);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpenKebab(true);
  //   // setOpen(!open);
  // };

  // const handleClose = () => {
  //   setOpenKebab(false);
  // };

  const closePopup = () => {
    // setOpen(false);
  };

  const menuCategoryClicked = (input: IMenuClicked) => {
    if (input) {
      switch (input.menu.toLowerCase()) {
        case 'download':
          if (_selectedWidget) {
            downloadJSON(_selectedWidget);
          } else {
          }
          break;
        case 'preview':
          setOpenDialog(true);
          break;
        default:
          break;
      }
    }
  };

  const downloadJSON = (data: any) => {
    const fileName = environment.fileName;
    if (data && data.formProps) {
      const json = JSON.stringify(data.formProps);
      const blob = new Blob([json], {
        type: 'application/json',
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = (data.formData?.formData?.Title || fileName) + '.json';
      link.click();
    }
  };

  const openPreview = (e?: any) => {
    // setOpen(true);
    // setOpenKebab(false);
  };

  return (
    <div
      className="grid-stack-item "
      style={{
        overflow: 'hidden',
      }}
      id={props.id} // convert to string
      w={props.w}
      h={props.h}
      x={props.x}
      y={props.y}
      {...props.data}
      ref={ref}
    >
      <div
        className="grid-stack-item-content overflow-hidden"
        style={{
          border: `1px solid ${themeChart.palette?.neutral?.neu100}`,
          borderRadius: '4px',
          // border: `1px solid ${theme?.palette['light']['c50']} !important`,
          backgroundColor: themeChart.palette?.background?.bacopWhite,
          // padding: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
          }}
        >
          <div
            style={{
              height: '40px',
              padding: '10px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography
              variant={'body2'}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: '20px',

                color: themes?.default?.palette?.text?.tex600,
              }}
              // title="Double click to change title"
              // onDoubleClick={() => handleToggle(false)}
            >
              {_selectedWidget &&
                _selectedWidget.formData &&
                _selectedWidget.formData.formData &&
                _selectedWidget.formData.formData.Title}
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <div
                style={{ position: 'relative' }}
                onClick={(e: any) => {
                  // itemClicked(props);
                  // setOpenKebab(true);
                  // handleClose();
                  // handleClick(e);
                }}
              >
                <IconComponent
                  {...{
                    name: 'more_vert_black_24dp',
                    color: theme.palette?.text?.primary,
                    size: 25,
                    label: 'More',
                  }}
                ></IconComponent>
              </div>
            </Box>
            <StyledIconComponent
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              sx={{ paddingTop: 0, paddingBottom: 0 }}
              anchorEl={anchorEl}
              style={{ padding: '0px !important' }}
              open={open}
              onClick={(e: any) => {
                handleClose();
              }}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <div
                style={{
                  backgroundColor: themeChart.palette?.background?.bacopWhite,
                  padding: '0px',
                  color: themeChart?.palette?.text?.tex300Main,
                }}
              >
                {menuArray &&
                  menuArray.map((menu: string) => {
                    return (
                      <MenuItem
                        onClick={(e) => {
                          const payload: IMenuClicked = {
                            menu,
                            data: e,
                          };
                          menuCategoryClicked(payload);
                          // downloadJSON(_selectedWidget);
                        }}
                      >
                        {menu}
                      </MenuItem>
                    );
                  })}
                {/* <MenuItem
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  Preview
                </MenuItem> */}
              </div>
            </StyledIconComponent>
          </div>
        </div>

        <div
          style={{
            top: '10px',
            padding: '20px',
            height: 'calc(100% - 10px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {currentCompomponent}
        </div>

        {/* <Dialog onClose={handleClose} open={openDialog} fullWidth={true}>
          <div style={{ maxHeight: '600px', overflow: 'hidden' }}>
            <div
              style={{
                borderBottom: `1px solid${themeChart.palette?.neutral?.neu100}`,
              }}
            >
              <div
                style={{
                  height: '48px',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  overflow: 'hidden',
                  padding: 10,
                  backgroundColor: theme.palette?.light?.c50,
                }}
              >
                <header
                  style={{
                    height: '40px',
                    width: '100%',
                    padding: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant={'body2'}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    // title="Double click to change title"
                    // onDoubleClick={() => handleToggle(false)}
                  >
                    {_selectedWidget &&
                      _selectedWidget.formData &&
                      _selectedWidget.formData.formData &&
                      _selectedWidget.formData.formData.Title}
                  </Typography>

                  <Box sx={{ ml: 'auto' }}>
                    <div
                      style={{ position: 'relative' }}
                      onClick={() => {
                        closePopup();
                        setOpenDialog(false);
                      }}
                    >
                      <IconComponent
                        {...{
                          name: 'close_black_24dp',
                          color: theme.palette?.text?.primary,
                          size: 25,
                          label: 'close_black_24dp',
                        }}
                      ></IconComponent>
                    </div>
                  </Box>
                </header>
              </div>
            </div>
            <div
              style={{
                height: 'calc(100% - 48px)',
                // padding: 10,
                backgroundColor: theme.palette?.light?.c50,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box',
              }}
            >
              {currentCompomponent}
            </div>{' '}
          </div>
        </Dialog> */}
      </div>
    </div>
  );
}
