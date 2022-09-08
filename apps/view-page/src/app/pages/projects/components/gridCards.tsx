import { Box, Dialog, DialogContent, styled, Typography } from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
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
    <Box
      className="grid-stack-item "
      style={{
        backgroundColor: `${theme?.palette['light']['c50']} !important`,
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
      <Box
        className="grid-stack-item-content overflow-hidden"
        sx={{
          border: `1px solid ${theme.palette?.text?.c100}`,
          borderRadius: '4px',
          // border: `1px solid ${theme?.palette['light']['c50']} !important`,
          background: `${theme?.palette['light']['c50']} !important`,
          padding: '10px !important',
          overflow: 'hidden !important',
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

          <Box sx={{ ml: 'auto' }}>
            {/* <button
              title="Edit widget"
              onClick={() => {
                setWidgetToBeUpdated(
                  widgets.find((widget: any) => widget.id === props.id)
                );
                props.editWidget(
                  widgets.find((widget: any) => widget.id === props.id)
                );
                // setOpenWidgetConfigDrawer(true);
              }}
            >
              <IconComponent
                {...{
                  name: 'edit_black_24dp',
                  color: '#727cad',
                  size: 25,
                  label: 'Edit',
                }}
              ></IconComponent>
            </button> */}

            <div
              onClick={() => {
                itemClicked(props);
              }}
            >
              <IconComponent
                {...{
                  name: 'info_black_24dp',
                  color: '#727cad',
                  size: 25,
                  label: 'info_black_24dp',
                }}
              ></IconComponent>
            </div>
          </Box>
        </header>
        <div
          style={{
            top: '20px',
            height: 'calc(100% - 20px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {currentCompomponent}
        </div>
        <BootstrapDialog
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            {_selectedWidget &&
              _selectedWidget.formData &&
              _selectedWidget.formData.formData &&
              _selectedWidget.formData.formData.title}{' '}
          </BootstrapDialogTitle>
          <DialogContent dividers>{currentCompomponent}</DialogContent>
        </BootstrapDialog>{' '}
      </Box>
    </Box>
  );
}
