import { BubbleChart } from '@gessa/component-library';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { BubbleChartDataMapping } from '../data-mapper/bubble-chart';
import { getChartDataResource } from '../store/gridDataRenderSlice';

export const BubbleChartComponent = (props: any) => {
  const [chartData, setChartData] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    new Promise((resolve, reject) => {
      resolve(
        dispatch(
          getChartDataResource({
            label: props.rawData.label || '',
            report: props.rawData.report || '',
            widget_id: props.rawData.id,
          })
        )
      );
    })
      .then((response: any) => {
        const mapperPayload: any = {
          data: props.rawData,
          fontData: {},
        };
        const obj = BubbleChartDataMapping(response, mapperPayload);
        console.log(obj);
        setTimeout(() => {
          setChartData(obj);
        }, Math.random() * 5000);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    chartData ? (
      <BubbleChart
        datasets={chartData?.data?.datasets || []}
        labels={chartData?.data?.labels}
        chartProps={chartData.chartProps}
      />
    ) : (
      <LoadingData />
    )
  ) : (
    <BubbleChart datasets={[]} labels={[]} />
  );
};
