import { SearchInput } from '@gessa/component-library';
import {
  Box,
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
  Popover,
  Select,
  styled,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
import { environment } from 'apps/view-page/src/environments/environment';
import themes from 'apps/view-page/src/theme';
import generateRandomString from 'apps/view-page/src/utils/randomString';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import IconComponent from '../../../components/gridComponents/icon-component/icon-component';
import {
  getChartDataResource,
  getGridDataResource,
} from '../store/gridDataRenderSlice';
import CustomModal, { BootstrapDialogTitle } from './customModal';
import html2canvas from 'html2canvas';
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
  const menuArray = ['Preview', 'Share', 'Download'];
  const { widgets } = props;
  const theme = useTheme();
  const dispatch = useDispatch();
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

  const closePopup = () => {
    // setOpen(false);
  };

  const menuCategoryClicked = (input: any) => {
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
        case 'share':
          if (_selectedWidget) {
            const abc: any = document.getElementById(input?.ref?.current?.id);
            html2canvas(abc, {
              allowTaint: true,
              useCORS: true,
            })
              .then(function (canvas) {
                // It will return a canvas element
                let image = canvas.toDataURL('image/png', 0.5);
                const href = image;
                const link = document.createElement('a');
                link.href = href;
                link.download = input?.ref?.current?.innerText + '.png';
                link.click();
              })
              .catch((e) => {
                // Handle errors
                console.log(e);
              });
          } else {
          }
          break;
        default:
          break;
      }
    }
  };

  const downloadJSON = (data: any) => {
    const fileName = environment.fileName;
    new Promise((resolve, reject) => {
      if (data && data.type === 'grid') {
        resolve(
          dispatch(
            getGridDataResource({
              label: '',
              report: data.report,
              widget_id: data.id,
              projections: '',
              filter: '',
              size: '1000',
              page: '0',
            })
          )
        );
      } else {
        resolve(
          dispatch(
            getChartDataResource({
              label: data.label || '',
              report: data.report || '',
              widget_id: data.id,
            })
          )
        );
      }
    })
      .then((response: any) => {
        const json = JSON.stringify(response.payload.data);
        // var csv = convertToCSV(json);

        const blob = new Blob([json], {
          type: 'application/json',
        });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = (data.formData?.formData?.Title || fileName) + '.json';
        link.click();
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });

    // }
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
  function toggleModal() {
    setOpen(!open);
  }

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
          {_selectedWidget && _selectedWidget.type != 'card' && (
            <div
              style={{
                height: '48px',
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
              >
                {_selectedWidget &&
                _selectedWidget.formData &&
                _selectedWidget.formData.formData &&
                _selectedWidget.formData.formData.Title
                  ? _selectedWidget.formData.formData.Title
                  : _selectedWidget.type}
              </Typography>

              <Box
                sx={{
                  ml: 'auto',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    position: 'relative',
                    paddingTop: '5px',
                    paddingBottom: '5px',
                    marginRight: '5px',
                  }}
                  onClick={(e: any) => {}}
                >
                  {_selectedWidget && _selectedWidget.type === 'grid' && (
                    <div
                      style={{
                        width: '100%',
                        backgroundColor:
                          themes.default?.palette?.background?.bacopWhite,
                      }}
                    >
                      <SearchInput
                        label={'Search'}
                        placeholder={'Search'}
                        value={''}
                        chartProps={{
                          background_color:
                            themes.default.palette?.background?.bacopWhite,
                          border_color: themes.default.palette?.neutral?.neu100,
                        }}
                        onChange={(e: any) => {}}
                      />
                    </div>
                  )}
                </div>

                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    const payload: any = {
                      menu: 'preview',
                    };
                    menuCategoryClicked(payload);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'fullscreen_black_24dp',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 27,
                      label: 'Full Screen',
                    }}
                  ></IconComponent>
                </div>
                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    const payload: any = {
                      menu: 'download',
                    };
                    menuCategoryClicked(payload);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'file_download_black_24dp-1-1',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 26,
                      label: 'Download',
                    }}
                  ></IconComponent>
                </div>
                <div
                  style={{ position: 'relative' }}
                  onClick={(e: any) => {
                    handleClick(e);
                  }}
                >
                  <IconComponent
                    {...{
                      name: 'more_vert_black_24dp',
                      color: themes?.default?.palette?.neutral?.neu400,
                      size: 27,
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
                    padding: '0px',
                    backgroundColor: themeChart.palette?.background?.bacopWhite,
                    color: themes?.default?.palette?.text?.tex600,
                  }}
                >
                  {menuArray &&
                    menuArray.map((menu: string) => {
                      return (
                        <MenuItem
                          onClick={(e) => {
                            const payload: any = {
                              menu,
                              data: e,
                              ref: ref,
                            };
                            menuCategoryClicked(payload);
                          }}
                        >
                          {menu}
                        </MenuItem>
                      );
                    })}
                </div>
              </StyledIconComponent>
            </div>
          )}
        </div>
        <div
          style={{
            // top: '10px',
            padding: '5px',
            height: 'calc(100% - 10px)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {currentCompomponent}
        </div>
        <Dialog
          onClose={handleClose}
          open={openDialog}
          maxWidth={'xl'}
          PaperProps={{
            sx: {
              width: '95%',
              height: '95%',
            },
          }}
        >
          <div
            style={{
              overflow: 'hidden',
              backgroundColor: themeChart.palette?.background?.bacopWhite,
              color: themes?.default?.palette?.text?.tex600,
              height: '100%',
              width: '100%',
            }}
          >
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
                    height: '48px',
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
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: '20px',

                      color: themes?.default?.palette?.text?.tex600,
                    }}
                  >
                    {_selectedWidget &&
                    _selectedWidget.formData &&
                    _selectedWidget.formData.formData &&
                    _selectedWidget.formData.formData.Title
                      ? _selectedWidget.formData.formData.Title
                      : _selectedWidget?.type}
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
                          color: themes?.default?.palette?.text?.tex600,
                          size: 25,
                          label: 'Close',
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
        </Dialog>
      </div>
    </div>
  );
}
