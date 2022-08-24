import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useTheme } from '@mui/system';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export interface RadarChartProps {
  data: any;
  legend?: 'top' | 'bottom' | 'left' | 'right' | 'chartArea';
}

export function RadarChart({ data, legend = 'bottom' }: RadarChartProps) {
  const [chartData, setChartData] = useState<any>({
    datasets: [],
    labels: [],
  });

  function addAlpha(color: string, opacity: number) {
    // coerce values so ti is between 0 and 1.
    const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    return color + _opacity.toString(16).toUpperCase();
  }
  const theme = useTheme();

  useEffect(() => {
    if (data && data.datasets && data.datasets.length && data.labels.length) {
      const _data = JSON.parse(JSON.stringify(data));
      _data.datasets.map((element: any, index: number) => {
        element.backgroundColor = addAlpha(
          theme.palette['chart'][index] ?? theme.palette['custom'].form1,
          0.6
        );
        return element;
      });
      setChartData(_data);
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
      <Radar
        data={chartData}
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
              },
            },
          },
        }}
      />
    </div>
  );
}

export default RadarChart;
