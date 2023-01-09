import { LineChart, StatCard } from '@gessa/component-library';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { SimpleCardDataMapping } from '../data-mapper/card';
import { SimpleLineChartDataMapping } from '../data-mapper/line-chart';
import { getChartDataResource } from '../store/gridDataRenderSlice';

export const CardComponent = (props: any) => {
  const [chartData, setChartData] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    const mapperPayload: any = {
      data: props.rawData,
      fontData: {},
    };
    const obj = SimpleCardDataMapping(props.rawData, mapperPayload);
    setChartData(obj);
  }, []);

  return props ? (
    chartData ? (
      <StatCard data={chartData?.data} chartProps={chartData?.chartProps} />
    ) : (
      <LoadingData />
    )
  ) : (
    <StatCard data={{}} />
  );
};
