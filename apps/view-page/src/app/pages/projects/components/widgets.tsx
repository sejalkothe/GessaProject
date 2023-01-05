/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { useEffect, useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material';
import { IWidget } from '../store/widgetsSlice';
import { __values } from 'tslib';
import {
  // heatmapData,
  polarData,
  scatterData,
  barData,
  lineData,
  doughnutData,
  // tableData,
  piechartData,
  radarData,
  bubbleData,
  linechartFilled,
  // lineWithTensionData,
} from 'apps/view-page/src/fake-db/scatterData';
import {
  Barchart,
  BarChartCard,
  BubbleChart,
  Datagrid,
  DataGridV1,
  DatatableCardV1,
  DoughnutChart,
  HeatMap,
  LineChart,
  LineChartCard,
  PieChart,
  PolarChart,
  RadarChart,
  ScatterChart,
  StatCard,
} from '@gessa/component-library';
// import Datagrid from '../../../components/gridComponents/data-grid/data-grid';
import themes from 'apps/view-page/src/theme';
import {
  constStackVerticalBarChartType,
  constBarchartLabel,
  constStackVerticalFullBarChartType,
  constStackHorizontalBarChartType,
  constStackHorizontalFullBarChart,
  constLineChartWithTension,
  constLineChartLabel,
  constLineChartWithFilled,
  constLineChartWithTensionFilled,
} from 'apps/view-page/src/utils/constantString';
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
const BubbleData: any = bubbleData;
const PolarData: any = polarData;
const DouhnutData: any = doughnutData;
const PiechartData: any = piechartData;
const RadarData: any = radarData;
const LineData: any = lineData;

const fakeData = false;

export const WIDGETS_V1: IWidgetType[] = [
  {
    id: '0',
    type: 'card',
    data: {
      component: (props: any) => {
        const theme = themes;
        const defaultProps = {
          title: 'Number of Payments',
          stat: 600,
          icon: {
            name: 'Search',
            size: 30,
            color: theme.default.palette?.primary?.pri400,
          },
          link: 'View All',
        };
        const formProps = { ...props };
        return props ? (
          fakeData ? (
            <StatCard data={defaultProps} />
          ) : (
            <StatCard data={props.data} chartProps={props.chartProps} />
          )
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
          // <Datagrid columns={props.columns || []} rows={props.rows || []} />
          <DatatableCardV1
            // columnData={props.chartData.data.columns}
            // rowData={props.chartData.data.rows}
            // columnResizable={props.chartData.data.columnResizable}
            // pagination={props.chartData.data.pagination}
            // height={props.chartData.height - 100}
            // width={props.chartData.width - 50}
            chartData={{
              columnData: props.chartData.data.columns,
              rowData: props.chartData.data.rows,
              columnResizable: props.chartData.columnResizable,
              pagination: props.chartData.pagination,
              height: props.chartData.height - 200,
              width: props.chartData.width - 200,
            }}
            headerData={props.headerData}
            height={props.chartData.height - 100}
            width={props.chartData.width - 50}
            showBorder={true}
            actionClicked={(data: any) => {
              props.actionClicked && props.actionClicked(data);
            }}
            searchAction={(data: any) => {
              props.searchAction && props.searchAction(data);
            }}
          />
        ) : (
          // <Datagrid columns={tableData.columns} rows={tableData.rows} />
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
          fakeData ? (
            <Barchart {...BarData} />
          ) : (
            <Barchart {...props.chartData} />
          )
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
          fakeData ? (
            <RadarChart {...RadarData} />
          ) : (
            <RadarChart
              data={props?.chartData?.data || {}}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <RadarChart {...RadarData} />
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
          fakeData ? (
            <DoughnutChart {...DouhnutData} />
          ) : (
            <DoughnutChart
              data={props?.chartData?.data || {}}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <DoughnutChart {...DouhnutData} />
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
          fakeData ? (
            <PieChart {...PiechartData} />
          ) : (
            <PieChart
              data={props.chartData?.data}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <PieChart {...PiechartData} />
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
          fakeData ? (
            <LineChart {...linechartFilled} />
          ) : (
            <LineChart
              data={props?.chartData?.data || []}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              fontData={props?.chartData?.fontData}
              chartProps={props.chartData?.chartProps}
            />
          )
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
          fakeData ? (
            <ScatterChart {...ScatterData} />
          ) : (
            <ScatterChart
              labels={props?.chartData?.data?.labels || []}
              datasets={props?.chartData?.data?.datasets || []}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <ScatterChart {...ScatterData} />
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
            columnAxisLabel={[]}
            data={[]}
            rowAxisLabel={[]}
            threshold={[]}
            colLabel={''}
            rowLabel={''}
          />
        ) : (
          // <HeatMap
          //   columnAxisLabel={props.columnAxisLabel || []}
          //   data={props.data || []}
          //   rowAxisLabel={props.rowAxisLabel || []}
          //   threshold={props.threshold || []}
          //   colLabel={props.colLabel || ''}
          //   rowLabel={props.rowLabel || ''}
          // />
          // <></>
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
          fakeData ? (
            <PolarChart {...PolarData} />
          ) : (
            <PolarChart
              datasets={props?.chartData?.data?.datasets || []}
              labels={props?.chartData?.data?.labels || []}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <PolarChart {...PolarData} />
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
          fakeData ? (
            <BubbleChart {...BubbleData} />
          ) : (
            <BubbleChart
              labels={props?.chartData?.data?.labels || []}
              datasets={props?.chartData?.data?.datasets || []}
              chartProps={props.chartData?.chartProps}
            />
          )
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
  {
    id: '12',
    type: constStackVerticalBarChartType,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <Barchart data={barData.data} stacked={false} horizontal={false} />
          ) : (
            <Barchart
              data={props?.chartData?.data || []}
              stacked={true}
              horizontal={false}
              xLabel={props.chartData.xLaabel}
              yLabel={props.chartData.yLabel}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <BarChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //     stacked: props?.chartData?.stacked || false,
          //     horizontal: props?.chartData?.horizontal || false,
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <Barchart data={barData.data} stacked={false} horizontal={false} />
        );
      },
      props: {},
      label: constBarchartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '13',
    type: constStackVerticalFullBarChartType,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <Barchart data={barData.data} stacked={false} horizontal={false} />
          ) : (
            <Barchart
              data={props?.chartData?.data || []}
              stacked={true}
              horizontal={false}
              xLabel={props.chartData.xLaabel}
              yLabel={props.chartData.yLabel}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <BarChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //     stacked: props?.chartData?.stacked || false,
          //     horizontal: props?.chartData?.horizontal || false,
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <Barchart data={barData.data} stacked={false} horizontal={false} />
        );
      },
      props: {},
      label: constBarchartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '14',
    type: constStackHorizontalBarChartType,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <Barchart data={barData.data} stacked={false} horizontal={false} />
          ) : (
            <Barchart
              data={props?.chartData?.data || []}
              stacked={true}
              horizontal={true}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <BarChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //     stacked: true,
          //     horizontal: true,
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <Barchart data={barData.data} stacked={false} horizontal={false} />
        );
      },
      props: {},
      label: constBarchartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '15',
    type: constStackHorizontalFullBarChart,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <Barchart data={barData.data} stacked={false} horizontal={false} />
          ) : (
            <Barchart
              data={props?.chartData?.data || []}
              stacked={true}
              horizontal={true}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <BarChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //     stacked: props?.chartData?.stacked || false,
          //     horizontal: props?.chartData?.horizontal || true,
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <Barchart data={barData.data} stacked={false} horizontal={false} />
        );
      },
      props: {},
      label: constBarchartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '16',
    type: constLineChartWithTension,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <LineChart {...linechartFilled} />
          ) : (
            <LineChart
              data={props?.chartData?.data || []}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <LineChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <LineChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: constLineChartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '17',
    type: constLineChartWithFilled,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <LineChart {...linechartFilled} />
          ) : (
            <LineChart
              data={props?.chartData?.data || []}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <LineChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <LineChart
            data={props?.chartData?.data || []}
            xLabel={props?.chartData?.xLabel || ''}
            yLabel={props?.chartData?.yLabel || ''}
            chartProps={props.chartData?.chartProps}
          />
        );
      },
      props: {},
      label: constLineChartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
    },
  },
  {
    id: '18',
    type: constLineChartWithTensionFilled,
    data: {
      component: (props: any) => {
        return props ? (
          fakeData ? (
            <LineChart {...linechartFilled} />
          ) : (
            <LineChart
              data={props?.chartData?.data || []}
              xLabel={props?.chartData?.xLabel || ''}
              yLabel={props?.chartData?.yLabel || ''}
              chartProps={props.chartData?.chartProps}
            />
          )
        ) : (
          // <LineChartCard
          //   headerData={{
          //     title: props?.headerData?.title || '',
          //     actions: props?.headerData?.actions || [],
          //   }}
          //   chartData={{
          //     data: props?.chartData?.data || {},
          //   }}
          //   actionClicked={(data: any) => {
          //     props.actionClicked && props.actionClicked(data);
          //   }}
          // />
          <LineChart
            data={{
              labels: [],
              datasets: [],
            }}
          />
        );
      },
      props: {},
      label: constLineChartLabel,
      x: 0,
      y: 5,
      w: 6,
      h: 4,
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
      if (dataObj && dataObj.length > 0 && dataObj[0].data) {
        const payload = {
          id: (i + 100).toString(),
          type: widgetData[i].type,
          data: JSON.parse(JSON.stringify(dataObj[0].data)),
        };
        serializeWidgets.push(payload);
      }
    }
  }
  return serializeWidgets;
};

export default function Widgets(props: IWidgetProps) {
  const theme = useTheme();
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
