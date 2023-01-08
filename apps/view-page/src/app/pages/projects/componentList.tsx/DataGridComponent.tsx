import {
  Datagrid,
  DatatableCardV1,
  DoughnutChart,
  PieChart,
} from '@gessa/component-library';
import themes from 'apps/view-page/src/theme';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LoadingData from '../components/LoadingData';
import { DataGridDataMapping } from '../data-mapper/data-grid';
import { DoughnutChartDataMapping } from '../data-mapper/doughnut-chart';
import {
  getChartDataResource,
  getGridDataResource,
} from '../store/gridDataRenderSlice';

export const DataGridComponent = (props: any) => {
  const [tableData, setTableData] = useState<any>();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(props);
    new Promise((resolve, reject) => {
      resolve(
        dispatch(
          getGridDataResource({
            label: '',
            report: props.rawData.report,
            widget_id: props.rawData.id,
            projections: '',
            filter: '',
            size: '10',
            page: '0',
          })
        )
      );
    })
      .then((response: any) => {
        const mapperPayload: any = {
          data: props.rawData,
          fontData: {},
        };
        const obj = DataGridDataMapping(response, mapperPayload);
        console.log(obj);
        setTimeout(() => {
          setTableData(obj);
        }, Math.random() * 5000);
      })
      .catch((err: any) => {
        console.log(err);
        return err;
      });
  }, []);

  return props ? (
    tableData && tableData?.chartData ? (
      <DatatableCardV1
        chartData={{
          columnData: tableData?.chartData?.data?.columns || [],
          rowData: tableData?.chartData?.data?.rows || [],
          columnResizable: tableData?.chartData?.columnResizable,
          pagination: tableData?.chartData?.pagination,
          height: (tableData?.chartData?.height || 400) - 200,
          width: (tableData?.chartData?.width || 500) - 200,
          chartProps: {
            title_color: themes.default.palette.text.tex600,
            bottom_border_color: themes.default.palette.neutral.neu100,
            background_color: themes.default.palette.background.bacopWhite,
          },
        }}
        chartProps={{
          border_color: themes?.default?.palette?.neutral?.neu100,
        }}
        headerData={tableData?.headerData}
        height={tableData?.chartData?.height - 100}
        width={tableData?.chartData?.width - 50}
        showBorder={true}
        actionClicked={(data: any) => {
          props.actionClicked && props.actionClicked(data);
        }}
        searchAction={(data: any) => {
          props.searchAction && props.searchAction(data);
        }}
      />
    ) : (
      <LoadingData />
    )
  ) : (
    <Datagrid columns={[]} rows={[]} />
  );
};
