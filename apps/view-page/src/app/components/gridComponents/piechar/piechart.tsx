import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useTheme } from '@mui/system';

ChartJS.register(CategoryScale, ArcElement, Title, Tooltip, Legend);

export interface PieChartProps {
  data: any;
  legend?: 'top' | 'bottom' | 'left' | 'right' | 'chartArea';
}

export function PieChart({ data, legend = 'bottom' }: PieChartProps) {
  const theme = useTheme();
  function addAlpha(color: string, opacity: number) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }

  const getRandomColor = (color: string) => {
    const seed = parseInt(color.slice(1, -1), 16);
    return '#' + Math.floor(Math.random() * seed).toString(16);
  };

  // data &&
  //   Array.isArray(data.datasets) &&
  //   data.datasets.forEach((element: any) => {
  //     element.backgroundColor =
  //       theme.palette?.chart.slice(data.datasets?.length) ??
  //       theme.palette.custom.form1;
  //   });
  const [pieChartData, setPiechartData] = useState<any>({
    datasets: [],
    labels: [],
  });
  useEffect(() => {
    if (data && data.datasets && data.datasets.length && data.labels.length) {
      const _data = JSON.parse(JSON.stringify(data));
      _data.datasets.map((element: any, index: number) => {
        element.backgroundColor =
          theme.palette?.['chart'].slice(data.datasets?.length) ??
          theme.palette['custom'].form1;
        return element;
      });
      setPiechartData(_data);
    }
  }, [data]);

  return (
    <div
      style={{
        height: '90%',
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Pie
        data={pieChartData}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 1,

          plugins: {
            legend: {
              display: true,
              position: legend,
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

export default PieChart;
