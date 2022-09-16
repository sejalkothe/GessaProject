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
  const { widgets } = props;
  // const classes = useStyles<any>();
  const theme = useTheme();
  const themeChart = themes.default;
  const ref = useRef(null);
  const [_selectedWidget, _setselectedWidget] = useState<any>({});
  const [toggle, setToggle] = useState(true);
  const [openKebab, setOpenKebab] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const [currentCompomponent, setCurrentComponent] = useState<any>(
    props.children
  );
  const [title, setTitle] = useState(
    props.title || 'Double click to change title'
  );
  const { setOpenWidgetConfigDrawer, setWidgetToBeUpdated } = useConfigForm();

  useEffect(() => {
    if (props.selectedWidget) {
      _setselectedWidget(props.selectedWidget);
    }
  }, [props.selectedWidget]);

  useEffect(() => {
    props.actions.handleRemove(ref.current, false);
    props.actions.handleAdd(ref.current, props);
  }, [props]);

  const handleToggle = (flag: any) => {
    setToggle(flag);
    props.actions.handleEnableMove(flag);
  };
  const [open, setOpen] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpenKebab(true);
    // setOpen(!open);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpenKebab(false);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const donloadJSON = (data: any) => {
    const fileName = environment.fileName;
    if (data && data.selectedWidget && data.selectedWidget.formData) {
      const json = JSON.stringify(data.selectedWidget.formData);
      const blob = new Blob([json], {
        type: 'application/json',
      });
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = fileName + '.json';
      link.click();
      handleClose();
    }
  };

  const itemClicked = (data: any) => {
    setOpen(!open);
  };
  const openPreview = (e?: any) => {
    setOpen(true);
    // setOpenKebab(false);
  };

  useEffect(() => {
    // console.log('open true2');
  }, [open]);

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
          border: `1px solid ${themeChart.palette?.text?.c100}`,
          borderRadius: '4px',
          // border: `1px solid ${theme?.palette['light']['c50']} !important`,
          backgroundColor: themeChart.palette?.light?.c50,
          // padding: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            borderBottom: `1px solid${themeChart.palette?.text?.c100}`,
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
                  handleClose();
                  handleClick(e);
                }}
              >
                <IconComponent
                  {...{
                    name: 'more_vert_black_24dp',
                    color: theme.palette?.text?.primary,
                    size: 25,
                    label: 'more_vert_black_24dp',
                  }}
                ></IconComponent>
                <StyledIconComponent
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  sx={{ paddingTop: 0, paddingBottom: 0 }}
                  anchorEl={anchorEl}
                  style={{ padding: '0px !mportant' }}
                  open={openKebab}
                  onClose={handleClose}
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
                      backgroundColor: themeChart.palette?.light?.c50,
                      padding: '0px',
                      color: themeChart?.palette?.text?.primary,
                    }}
                  >
                    <MenuItem
                      onClick={(e) => {
                        donloadJSON(props);
                      }}
                    >
                      Download
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        openPreview(e);
                      }}
                    >
                      Preview
                    </MenuItem>
                  </div>
                </StyledIconComponent>
              </div>
            </Box>
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

        <Dialog onClose={handleClose} open={open} fullWidth={true}>
          <div style={{ maxHeight: '600px', overflow: 'hidden' }}>
            <div
              style={{
                borderBottom: `1px solid${themeChart.palette?.text?.c100}`,
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
                        setOpenKebab(false);
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
                padding: 10,
                backgroundColor: theme.palette?.light?.c50,
              }}
            >
              {currentCompomponent}
            </div>{' '}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
