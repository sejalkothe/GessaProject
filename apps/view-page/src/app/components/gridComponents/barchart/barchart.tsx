import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/system';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.color = '#FFFFFF';
ChartJS.defaults.borderColor = '#262626';
export interface BarChartProps {
  data: any;
  stacked: boolean;
  horizontal: boolean;
  xLabel?: string;
  yLabel?: string;
}

export function Barchart({
  data,
  stacked = false,
  horizontal = false,
  xLabel = '',
  yLabel = '',
}: BarChartProps) {
  const theme = useTheme();

  const [barChartData, setBarchartData] = useState<any>({
    datasets: [],
    labels: [],
  });

  const [_scales, setScales] = useState({
    x: {
      grid: {
        display: false,
        color: 'red',
      },
      ticks: { color: theme.palette['text'].primary },
      title: {
        display: true,
        text: xLabel,
        color: theme.palette['text'].primary,
      },
    },
    y: {
      grid: {},
      ticks: { color: theme.palette['text'].primary },
      title: {
        display: true,
        text: yLabel,
        color: theme.palette['text'].primary,
      },
    },
  });

  function addAlpha(color: string, opacity: number) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  useEffect(() => {
    if (data && data.datasets && data.datasets.length && data.labels.length) {
      const _data = JSON.parse(JSON.stringify(data));
      _data.datasets.map((element: any, index: number) => {
        element.backgroundColor = addAlpha(
          theme.palette['chart'][index] ?? theme.palette['custom'].form1,
          1
        );
        return element;
      });
      setBarchartData(_data);
    }
  }, [data]);

  return (
    barChartData && (
      <div
        style={{
          height: '95%',
          width: '95%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Bar
          data={barChartData}
          options={{
            indexAxis: horizontal ? ('y' as const) : ('x' as const),
            responsive: true,
            maintainAspectRatio: false,
            // aspectRatio: 2,
            scales: _scales,

            plugins: {
              legend: {
                display: true,
                position: 'bottom',

                labels: {
                  usePointStyle: true,
                  pointStyle: 'rectRounded',
                  color: theme.palette['text'].primary,
                },
              },
            },
          }}
        />
      </div>
    )
  );
}

export default Barchart;
