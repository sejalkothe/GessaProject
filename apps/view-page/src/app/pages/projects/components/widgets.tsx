/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';

import { IWidget } from '../store/widgetsSlice';
import { __values } from 'tslib';
import {
  heatmapData,
  polarData,
  scatterData,
  barData,
  doughnutData,
  piechartData,
  radarData,
} from 'apps/view-page/src/fake-db/scatterData';
import {
  Barchart,
  BubbleChart,
  DoughnutChart,
  HeatMap,
  LineChart,
  PieChart,
  PolarChart,
  RadarChart,
  ScatterChart,
  StatCard,
} from '@gessa/component-library';
import Datagrid from '../../../components/gridComponents/data-grid/data-grid';

export interface IWidgetProps {
  rawWidget: IWidget[];
}
export interface IComponent {
  component?: any;
  props: any;
  label: string;
  w?: number;
  h?: number;
  x?: number;
  y?: number;
}

export interface IWidgetFormProps {
  key: string;
  value: string;
}
export interface IWidgetType {
  id: string;
  type: string;
  data: IComponent;
}

const ScatterData = scatterData;
const BarData: any = barData;
const PolarData: any = polarData;
const DouhnutData: any = doughnutData;
const PiechartData: any = piechartData;
const RadarData: any = radarData;

export const WIDGETS_V1: IWidgetType[] = [
  {
    id: '0',
    type: 'card',
    data: {
      component: (props: any) => {
        const defaultProps = {
          title: 'Title',
          stat: 60,
          iconName: 'Search',
          link: 'View All',
        };
        const formProps = { ...props };
        return props ? (
          <StatCard data={props.data} />
        ) : (
          <StatCard data={defaultProps} />
        );
      },
      props: {},
      label: 'Card',
      w: 4,
      h: 2,
      x: 4,
      y: 10,
    },
  },
  {
    id: '1',
    type: 'grid',
    data: {
      component: (props: any) => {
        return props ? (
          <Datagrid columns={props.columns || []} rows={props.rows || []} />
        ) : (
          <Datagrid columns={[]} rows={[]} />
        );
      },
      props: {},
      label: 'Grid',
      w: 6,
      h: 4,
      x: 4,
      y: 10,
    },
  },
  {
    id: '2',
    type: 'barchart',
    data: {
      component: (props: any) => {
        return props ? (
          <Barchart
            data={BarData.data}
            xLabel={'hello'}
            yLabel={'moto'}
            stacked={false}
            horizontal={false}
          />
        ) : (
          <Barchart
            data={{
              labels: [],
              datasets: [],
            }}
            stacked={false}
            horizontal={true}
          />
        );
      },
      props: {},
      label: 'Bar Chart',
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '3',
    type: 'radarchart',
    data: {
      component: (props: any) => {
        return props ? (
          // <RadarChart {...props} />
          <RadarChart {...RadarData} />
        ) : (
          <RadarChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: 'Radar Chart',
      x: 0,
      y: 5,
      w: 3,
      h: 4,
    },
  },
  {
    id: '4',
    type: 'doughnutchart',
    data: {
      component: (props: any) => {
        return props ? (
          <DoughnutChart {...DouhnutData} />
        ) : (
          // <DoughnutChart {...props} />
          <DoughnutChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: 'Doughnut Chart',
      x: 0,
      y: 5,
      w: 3,
      h: 4,
    },
  },
  {
    id: '5',
    type: 'piechart',
    data: {
      component: (props: any) => {
        return props ? (
          <PieChart {...PiechartData} />
        ) : (
          // <PieChart {...props} />
          <PieChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: 'Pie Chart',
      x: 0,
      y: 5,
      w: 3,
      h: 4,
    },
  },

  {
    id: '6',
    type: 'linechart',
    data: {
      component: (props: any) => {
        return props ? (
          <LineChart data={BarData.data} xLabel={'hello'} yLabel={'moto'} />
        ) : (
          <LineChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: 'Line Chart',
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '7',
    type: 'scatterchart',
    data: {
      component: (props: any) => {
        return props ? (
          <ScatterChart
            labels={ScatterData.labels}
            datasets={ScatterData.datasets}
          />
        ) : (
          <ScatterChart labels={[]} datasets={[]} />
        );
      },
      props: {},
      label: 'Scatter Chart',
      x: 0,
      y: 5,
      w: 6,
      h: 7,
    },
  },
  {
    id: '8',
    type: 'heatmapchart',
    data: {
      component: (props: any) => {
        return props ? (
          <HeatMap
            columnAxisLabel={heatmapData.columnAxisLabel}
            data={heatmapData.data}
            rowAxisLabel={heatmapData.rowAxisLabel}
            threshold={heatmapData.threshold}
            colLabel={heatmapData.colLabel}
            rowLabel={heatmapData.rowLabel}
          />
        ) : (
          <HeatMap
            columnAxisLabel={[]}
            data={[]}
            rowAxisLabel={[]}
            threshold={[]}
            colLabel=""
            rowLabel=""
          />
        );
      },
      props: {},
      label: 'Heat Map Chart',
      x: 0,
      y: 5,
      w: 10,
      h: 5,
    },
  },
  {
    id: '9',
    type: 'polarchart',
    data: {
      component: (props: any) => {
        return props ? (
          <PolarChart {...PolarData} />
        ) : (
          // <PolarChart
          //   datasets={props.data.datasets || []}
          //   labels={props.data.labels || []}
          // />
          <PolarChart datasets={[]} labels={[]} />
        );
      },
      props: {},
      label: 'Polar Chart',
      x: 0,
      y: 5,
      w: 6,
      h: 8,
    },
  },
  {
    id: '9',
    type: 'bubblechart',
    data: {
      component: (props: any) => {
        return props ? (
          <BubbleChart
            datasets={scatterData.datasets}
            labels={scatterData.labels}
          />
        ) : (
          <BubbleChart datasets={[]} labels={[]} />
        );
      },
      props: {},
      label: 'Bubble Chart',
      x: 0,
      y: 5,
      w: 6,
      h: 7,
    },
  },
];

const makeSerializedWidget = (widgetData: IWidget[]): any => {
  const serializeWidgets: any = [];

  if (widgetData && widgetData.length) {
    for (let i = 0; i < widgetData.length; i += 1) {
      const dataObj = WIDGETS_V1.filter(
        (value: any) => value.type === widgetData[i].type
      );
      const payload = {
        id: (i + 100).toString(),
        type: widgetData[i].type,
        data: JSON.parse(JSON.stringify(dataObj[0].data)),
      };
      serializeWidgets.push(payload);
    }
  }
  return serializeWidgets;
};

export default function Widgets(props: IWidgetProps) {
  const [dragableWidgets, setDragableWidgets] = useState(WIDGETS_V1);
  const [_dragableWidgets, _setDragableWidgets] = useState(WIDGETS_V1);

  useEffect(() => {
    const w2: IWidgetType[] = makeSerializedWidget(props.rawWidget);
  }, [props, props.rawWidget]);

  return (
    <div className="sticky top-0 w-full h-full flex flex-col border-box">
      <Typography className="ml-2" variant="h5">
        Add Widgets
      </Typography>

      <div>
        <TextField
          className="m-2"
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => {
            setDragableWidgets(
              e.target.value === ''
                ? _dragableWidgets
                : dragableWidgets.filter((widget: any) =>
                    widget.data.label
                      .toLowerCase()
                      .includes(e.target.value.toLowerCase())
                  )
            );
          }}
        />
      </div>
    </div>
  );
}
