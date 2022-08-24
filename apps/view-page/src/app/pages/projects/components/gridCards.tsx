import { Box } from '@mui/material';
import { useTheme } from '@mui/system';
import { useConfigForm } from 'apps/view-page/src/context/form';
import { useEffect, useRef, useState } from 'react';
import IconComponent from '../../../components/gridComponents/icon-component/icon-component';

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

  return (
    <Box
      className="grid-stack-item "
      style={{
        border: '1px solid #414141',
        borderRadius: '4px',
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
          border: `1px solid ${theme.palette['background'].default} !important`,
          background: `${theme.palette['background'].default} !important`,
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
          <h2
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
          </h2>

          {/* <Box sx={{ ml: 'auto' }}>
            <button
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
            </button>

            <button
              title="Delete widget"
              onClick={() => {
                props.actions.handleRemove(ref.current);
              }}
            >
              <IconComponent
                {...{
                  name: 'Close',
                  color: '#727cad',
                  size: 25,
                  label: 'Close',
                }}
              ></IconComponent>
            </button>
          </Box> */}
        </header>
        <div
          style={{
            top: '20px',
            height: 'calc(100% - 20px)',
            position: 'relative',
          }}
        >
          {currentCompomponent}
        </div>
      </Box>
    </Box>
  );
}
