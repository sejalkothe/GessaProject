import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  styled,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
import themes from 'apps/view-page/src/theme';
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
  const theme = useTheme();
  const themeChart = themes.default;
  const ref = useRef(null);
  const [_selectedWidget, _setselectedWidget] = useState<any>({});
  const [toggle, setToggle] = useState(true);
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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const itemClicked = (data: any) => {
    console.log(data);
    setOpen(!open);
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
          <header
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
                _selectedWidget.formData.formData.title}
            </Typography>

            <Box sx={{ ml: 'auto' }}>
              <div
                onClick={() => {
                  itemClicked(props);
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
              </div>
            </Box>
          </header>
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
          <div
            style={{
              height: '100%',
              position: 'relative',
              overflow: 'hidden',
              padding: 20,
              backgroundColor: theme.palette?.light?.c50,
            }}
          >
            <header
              style={{
                height: '20px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Typography
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
                  _selectedWidget.formData.formData.title}
              </Typography>
            </header>

            {currentCompomponent}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
