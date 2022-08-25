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
import { PolarArea } from 'react-chartjs-2';

/* eslint-disable-next-line */
export interface PolarChartProps {}

const StyledPolarChart = styled.div`
  color: pink;
`;

export interface IPolarDataSets {
  label: string;
  data: Array<number>;
  borderColor?: string;
  backgroundColor?: string[];
}
export interface IPolarChartProps {
  labels: string[];
  datasets: IPolarDataSets[];
}

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const PolarChart = (props: IPolarChartProps) => {
  const theme = useTheme();
  const [chartData, setChartData] = useState<any>({
    datasets: [],
    labels: [],
  });

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
      if (_data && _data.datasets && _data.datasets.length > 0) {
        for (let i = 0; i < _data.datasets.length; i += 1) {
          if (
            _data &&
            _data.datasets &&
            _data.datasets[i].data &&
            _data.datasets[i].data.length > 0
          ) {
            _data.datasets[i].backgroundColor = [];
            for (let j = 0; j < _data.datasets[i].data.length; j += 1) {
              _data.datasets[i].backgroundColor.push(
                addAlpha(
                  theme.palette['chart'][j] ?? theme.palette['custom'].form1,
                  1
                )
              );
            }
          }
        }
        setChartData(_data);
      }
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
      <PolarArea
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
                color: theme.palette['text'].primary,
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

export default PolarChart;
