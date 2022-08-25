import React, { useEffect, useState } from 'react';

import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Filler,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/system';

ChartJS.register(
  CategoryScale,
  PointElement,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

export interface LineChartProps {
  data: any;
  xLabel?: string;
  yLabel?: string;
}

export function LineChart({ data, xLabel, yLabel }: LineChartProps) {
  const theme = useTheme();
  const [lineChartData, setLinechartData] = useState<any>({
    datasets: [],
    labels: [],
  });
  const [_scales, setScales] = useState({
    x: {
      grid: {
        display: false,
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

  // data &&
  //   Array.isArray(data.datasets) &&
  //   data.datasets.forEach((element: any, index: number) => {
  //     element.borderColor = theme.palette.chart[index];
  //     element.backgroundColor = addAlpha(
  //       theme.palette.chart[index] ?? theme.palette.custom.form1,
  //       0.6
  //     );
  //   });

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
      setLinechartData(_data);
    }
  }, [data]);

  return (
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
      <Line
        data={lineChartData}
        options={{
          maintainAspectRatio: false,
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
  );
}

export default LineChart;
