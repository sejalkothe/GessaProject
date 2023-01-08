import { Barchart } from '@gessa/component-library';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { StackVerticalFullBarChartDataMapping } from '../data-mapper/stack-vertical-full-barchart';
import { getChartDataResource } from '../store/gridDataRenderSlice';

export const StackVerticalFullBarChart = (props: any) => {
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
        const obj = StackVerticalFullBarChartDataMapping(
          response,
          mapperPayload
        );
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
      <Barchart {...chartData} />
    ) : (
      <LoadingData />
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
};
