import React from 'react';

export interface IChartDetails {
  data: any;
}

const ChartDetails = (props: IChartDetails) => {
  return <div style={{ backgroundColor: 'red' }}>ChartDetails page</div>;
};

export default ChartDetails;
