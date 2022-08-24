import styled from '@emotion/styled';
import { useTheme } from '@mui/system';
import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';

/* eslint-disable-next-line */
export interface IBubbleDataSets {
  label: string;
  data: Array<any>;
  borderColor?: string;
  backgroundColor?: string;
}
export interface IBubbleChartProps {
  labels: string[];
  datasets: IBubbleDataSets[];
}

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const BubbleChart = (props: IBubbleChartProps) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>({ datasets: [], labels: [] });
  function addAlpha(color: string, opacity: number) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  useEffect(() => {
    if (
      props &&
      props.datasets &&
      props.labels &&
      props.datasets.length &&
      props.labels.length
    ) {
      const _data = JSON.parse(JSON.stringify(props));
      _data.datasets.map((element: any, index: number) => {
        element.backgroundColor = addAlpha(
          theme.palette['chart'][index] ?? theme.palette['custom'].form1,
          1
        );
        return element;
      });
      setChartData(_data);
    }
  }, [props]);

  return (
    <div
      style={{
        height: '95%',
        width: '95%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Bubble
        data={chartData}
        options={{
          maintainAspectRatio: true,
          aspectRatio: 1,

          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
              },
            },
            title: {
              display: true,
              // text: 'Doughnut Chart',
            },
          },
        }}
      />
    </div>
  );
};

export default BubbleChart;
