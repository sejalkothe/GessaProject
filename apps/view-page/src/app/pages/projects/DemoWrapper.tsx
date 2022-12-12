import { useTheme } from '@mui/system';
import ConfigFormProvider from 'apps/view-page/src/context/form';
import { cardheaderData } from 'apps/view-page/src/fake-db/scatterData';
import { IRootState } from 'apps/view-page/src/store';
import { selectThemeContext } from 'apps/view-page/src/store/themeContextSlice';
import themes from 'apps/view-page/src/theme';
import {
  constStackVerticalBarChartType,
  constStackVerticalFullBarChartType,
  constStackHorizontalBarChartType,
  constStackHorizontalFullBarChart,
  constLineChartWithTension,
  constLineChartWithFilled,
  constLineChartWithTensionFilled,
} from 'apps/view-page/src/utils/constantString';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../../components/CustomSnackbar';
import Demo2Ui from './components/Demo2Ui';
import {
  getChartDataResource,
  getGridDataResource,
} from './store/gridDataRenderSlice';
import {
  deleteAllStore,
  getPageDataByIdApi,
  savePageConfigurationApi,
  selectGridData,
  setGridDatatore,
} from './store/gridSlice';
import { getAllReportsLabelApi } from './store/reportLabelSlice';
import { getAllReportsApi, selectAllReports } from './store/reportSlice';
import { getAllWidgets, selectAllWidgets } from './store/widgetsSlice';

export interface IGridProps {
  page_id: string;
}

const DemoWrapper = (props: IGridProps) => {
  const theme: any = useTheme();
  const themeObj: any = themes.default;
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  const themeData = selectThemeContext(rootState);
  const [fontData, setFontData] = useState<any>();

  const gridDataStore: any = selectGridData(rootState);
  const [gridData, setGridData] = useState<any>([]);
  const widgets = selectAllWidgets(rootState);
  const reports = selectAllReports(rootState);
  // const reportLabels = selectAllReportsLabel(rootState);
  const [snackData, setSnackData]: any = useState({
    open: false,
    msg: '',
    duration: 3000,
    severity: '',
  });

  const onHideSnackBar = useCallback(() => {
    setSnackData({
      msg: '',
      open: false,
      severity: '',
      duration: 0,
    });
  }, []);

  useEffect(() => {
    if (themeData && themeData.length > 0 && themeData[0].font.result) {
      let _themeData = JSON.parse(JSON.stringify(themeData));

      const _fontData = {
        families: themeData[0].font.result.families,
        url: themeData[0].font.result.urls,
        defaultFont: themeData[0].font.result.fonts.h1.fontFamily,
      };
      setFontData(_fontData);
      // console.log(themeData, _fontData);
    }
  }, [themeData]);

  const [reportLabels, setReportLabels] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const keysArray: any = [];
    const promiseArray: any = [];
    setGridData([]);
    if (gridDataStore && gridDataStore.length && gridDataStore[0].widgets) {
      for (let i = 0; i < gridDataStore[0].widgets.length; i += 1) {
        keysArray.push([
          gridDataStore[0].widgets[i].key,
          gridDataStore[0].widgets[i].value,
        ]);
      }

      const obj = keysArray.reduce(function (o: any, currentArray: any) {
        const key = currentArray[0];
        const value = currentArray[1];
        o[key] = value;
        return o;
      }, {});

      if (gridDataStore && gridDataStore.length) {
        const gridLoadWidget: any = [];
        for (let i = 0; i < gridDataStore[0].widgets.length; i += 1) {
          const payload: any = {
            id: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'id'
            ).value,
            type: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'type'
            ).value,
            w: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'w'
            ).value,
            h: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'h'
            ).value,
            x: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'x'
            ).value,
            y: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'y'
            ).value,
            widgetHeight: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'widgetHeight'
            ).value,
            widgetWidth: gridDataStore[0].widgets[i].layout.find(
              (o: any) => o.key === 'widgetWidth'
            ).value,
          };
          const dataIndex = gridDataStore[0].widgets[i].layout.findIndex(
            (value: any) => value.key === 'formData'
          );

          if (dataIndex !== -1) {
            const data = JSON.parse(
              gridDataStore[0].widgets[i].layout.find(
                (o: any) => o.key === 'formData'
              ).value
            );
            payload.formData = data;
            payload.label = data.formData.label;
            payload.report = data.formData.report;

            if (payload.type === 'grid' || payload.type === 'card') {
              if (payload.type === 'card') {
                payload.formProps = {
                  title: data?.formData?.title || payload.formData.title || '',
                  stat: 650,
                  icon: {
                    name: 'Search',
                    size: 30,
                    color: themes.default.palette?.primary?.main,
                  },
                };
              } else {
                payload.formProps = {};
              }
              gridLoadWidget.push(payload);
            }
            promiseArray.push(
              new Promise((resolve, reject) => {
                if (
                  data.formData.label &&
                  data.formData.report &&
                  payload.type.toLowerCase() !== 'grid'
                ) {
                  resolve(
                    dispatch(
                      getChartDataResource({
                        label: data.formData.label,
                        report: data.formData.report,
                        widget_id: payload.id,
                      })
                    )
                  );
                } else if (payload.type.toLowerCase() === 'grid') {
                  resolve(
                    dispatch(
                      getGridDataResource({
                        label: '',
                        report: data.formData.report,
                        widget_id: payload.id,
                        projections: '',
                        filter: '',
                        size: '10',
                        page: '0',
                      })
                    )
                  );
                } else {
                  const obj = {
                    payload: {
                      data: [],
                    },
                  };
                  resolve(obj);
                }
              }).then((_response: any) => {
                const response = JSON.parse(JSON.stringify(_response));

                if (response && response.payload && response.payload.data) {
                  if (payload.type) {
                    if (response.payload.data) {
                      switch (payload.type.toLowerCase()) {
                        case 'barchart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              stacked: false,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                              fontData: fontData,
                            },
                          };

                          // payload.formProps = {
                          //   data: response.payload.data,
                          //   xLabel: data.formData.X_axis_label,
                          //   yLabel: data.formData.Y_axis_label,
                          // };
                          break;
                        case 'linechart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.c50;
                                // element.fill = true;
                                element.pointRadius = 2;
                                element.borderWidth = 1;
                                // element.tension = 0.5;

                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                              fontData: fontData,
                            },
                          };

                          break;
                        case 'card':
                          const defaultProps = {
                            // title: 'This si title',
                            // stat: 'asdfg',
                            // iconName: 'Search',
                            link: 'View All',
                            title:
                              data?.formData?.Title ||
                              payload.formData.Title ||
                              '',
                            stat: 600,
                            icon: {
                              name: 'Search',
                              size: 30,
                              color: themes.default.palette?.primary?.main,
                            },
                          };

                          payload.formProps = defaultProps;
                          break;
                        case 'grid':
                          // payload.formProps = response.payload.data;
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              searchData: {
                                label: 'Search',
                                placeholder:
                                  'Search by Customer Name, SSE ID, Phone Numbe',
                                value: '',
                              },

                              actions: [
                                {
                                  menu: 'Filter',
                                  icon: {
                                    name: 'filter_alt_black_24dp',
                                    size: 25,
                                    color: '#0958fa',
                                    label: 'Filter',
                                  },
                                  submenu: [],
                                },
                                {
                                  menu: 'Download',
                                  icon: {
                                    name: 'file_upload_black_24dp-1',
                                    size: 25,
                                    color: '#0958fa',
                                    label: 'Download',
                                  },
                                  submenu: [],
                                },
                              ],
                            },
                            chartData: {
                              data: response.payload.data,
                              columnResizable: true,
                              pagination: true,
                              height: payload.widgetHeight,
                              width: payload.widgetWidth,
                            },
                          };
                          break;
                        case 'radarchart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                            },
                          };
                          break;
                        case 'doughnutchart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                const bgColorArr = [];
                                for (
                                  let i = 0;
                                  i < response.payload.data.labels.length;
                                  i += 1
                                ) {
                                  const color = themeObj.palette?.[
                                    `systemColor${i + 1}`
                                  ]?.main
                                    ? themeObj.palette?.[`systemColor${i + 1}`]
                                        ?.main
                                    : '#' +
                                      (Math.random() * 0xfffff * 1000000)
                                        .toString(16)
                                        .slice(0, 6);

                                  bgColorArr.push(color);
                                }
                                return (element.backgroundColor = bgColorArr);
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                            },
                          };
                          break;
                        case 'piechart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                const bgColorArr = [];
                                for (
                                  let i = 0;
                                  i < response.payload.data.labels.length;
                                  i += 1
                                ) {
                                  const color = themeObj.palette?.[
                                    `systemColor${i + 1}`
                                  ]?.main
                                    ? themeObj.palette?.[`systemColor${i + 1}`]
                                        ?.main
                                    : '#' +
                                      (Math.random() * 0xfffff * 1000000)
                                        .toString(16)
                                        .slice(0, 6);

                                  bgColorArr.push(color);
                                }
                                return (element.backgroundColor = bgColorArr);
                              }
                            );
                            payload.formProps = {
                              headerData: {
                                title: data?.formData?.Title,
                                actions: cardheaderData.actions,
                              },
                              chartData: {
                                data: response.payload.data,
                              },
                            };
                          }
                          break;
                        case 'scatterchart':
                          let finalObj: any = {
                            labels: [],
                            datasets: [],
                          };

                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            const _rawData = JSON.parse(
                              JSON.stringify(response.payload.data)
                            );
                            for (
                              let i = 0;
                              i < _rawData.datasets.length;
                              i += 1
                            ) {
                              const newDataset = _rawData.datasets[i];
                              const datasetDataArr = [];

                              for (
                                let j = 0;
                                j < newDataset.data.length;
                                j += 1
                              ) {
                                const obj = {
                                  x: +newDataset.data[j],
                                  y: +newDataset.data[j],
                                  r: 14,
                                };
                                datasetDataArr.push(obj);
                              }
                              const datasetObj = {
                                label: newDataset.label,
                                data: datasetDataArr,
                                backgroundColor:
                                  themeObj.palette?.[`systemColor${i + 1}`]
                                    ?.main,
                                pointRadius: 5,
                              };
                              finalObj.datasets.push(datasetObj);
                              finalObj.labels = _rawData.labels;
                            }
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: finalObj,
                            },
                          };

                          break;
                        case 'heatmapchart':
                          payload.formProps = {
                            data: response.payload.data,
                            fontData: fontData,
                          };
                          break;
                        case 'polarchart':
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                const bgColorArr = [];
                                for (
                                  let i = 0;
                                  i < response.payload.data.labels.length;
                                  i += 1
                                ) {
                                  const color = themeObj.palette?.[
                                    `systemColor${i + 1}`
                                  ]?.main
                                    ? themeObj.palette?.[`systemColor${i + 1}`]
                                        ?.main
                                    : '#' +
                                      (Math.random() * 0xfffff * 1000000)
                                        .toString(16)
                                        .slice(0, 6);

                                  bgColorArr.push(color);
                                }
                                return (element.backgroundColor = bgColorArr);
                              }
                            );
                          }

                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                            },
                          };
                          break;
                        case 'bubblechart':
                          let finalObjBubble: any = {
                            labels: [],
                            datasets: [],
                          };

                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets
                          ) {
                            const _rawData = JSON.parse(
                              JSON.stringify(response.payload.data)
                            );
                            for (
                              let i = 0;
                              i < _rawData.datasets.length;
                              i += 1
                            ) {
                              const newDataset = _rawData.datasets[i];
                              const datasetDataArrBubble = [];

                              for (
                                let j = 0;
                                j < newDataset.data.length;
                                j += 1
                              ) {
                                const obj = {
                                  x: +newDataset.data[j],
                                  y: +newDataset.data[j],
                                  r: Math.floor(Math.random() * 20),
                                };
                                datasetDataArrBubble.push(obj);
                              }
                              const datasetObj = {
                                label: newDataset.label,
                                data: datasetDataArrBubble,
                                backgroundColor:
                                  themeObj.palette?.[`systemColor${i + 1}`]
                                    ?.main,
                                pointRadius: 5,
                              };
                              finalObjBubble.datasets.push(datasetObj);
                              finalObjBubble.labels = _rawData.labels;
                            }
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: finalObjBubble,
                              fontData: fontData,
                            },
                          };
                          break;

                        case constStackVerticalBarChartType:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              stacked: true,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;
                        case constStackVerticalBarChartType:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              stacked: true,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;
                        case constStackVerticalFullBarChartType:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;
                        case constStackHorizontalBarChartType:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                              stacked: true,
                            },
                          };
                          break;
                        case constStackHorizontalFullBarChart:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.main;
                                element.borderRadius = 5;
                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.main
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              stacked: true,
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                              horizontal: true,
                            },
                          };
                          break;
                        case constLineChartWithTension:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.c50;
                                // element.fill = true;
                                element.pointRadius = 2;
                                element.borderWidth = 1;
                                element.tension = 0.5;

                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.c50
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;
                        case constLineChartWithFilled:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.c100;
                                element.pointRadius = 2;
                                element.fill = true;
                                element.pointStyle = 'circle';

                                element.borderWidth = 1;
                                // element.tension = 0.5;

                                element.backgroundColor = themeObj.palette?.[
                                  `systemColor${index + 1}`
                                ]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.c50
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6);
                                return element;
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;
                        case constLineChartWithTensionFilled:
                          if (
                            response &&
                            response.payload &&
                            response.payload.data &&
                            response.payload.data.datasets &&
                            response.payload.data.datasets.length > 0
                          ) {
                            response.payload.data.datasets.map(
                              (element: any, index: number) => {
                                element.borderColor =
                                  themeObj.palette?.[
                                    `systemColor${index + 1}`
                                  ]?.c100;
                                element.fill = true;
                                element.pointRadius = 2;
                                element.borderWidth = 1;
                                element.tension = 0.5;

                                return (element.backgroundColor = themeObj
                                  .palette?.[`systemColor${index + 1}`]?.main
                                  ? themeObj.palette?.[
                                      `systemColor${index + 1}`
                                    ]?.c50
                                  : '#' +
                                    (Math.random() * 0xfffff * 1000000)
                                      .toString(16)
                                      .slice(0, 6));
                              }
                            );
                          }
                          payload.formProps = {
                            headerData: {
                              title: data?.formData?.Title,
                              actions: cardheaderData.actions,
                            },
                            chartData: {
                              data: response.payload.data,
                              xLabel: data.formData.X_axis_label,
                              yLabel: data.formData.Y_axis_label,
                            },
                          };
                          break;

                        default:
                          payload.formProps = {};
                      }
                    }
                  }
                  gridLoadWidget.push(payload);
                } else {
                  gridLoadWidget.push(payload);
                }
              })
            );
          } else {
            // payload.formProps = {};

            gridLoadWidget.push(payload);
          }
        }
        Promise.all(promiseArray).then(() => {
          setGridData(gridLoadWidget);
        });
      }
    }
  }, [gridDataStore]);

  useEffect(() => {
    const payload = {
      page: 0,
      size: 500,
    };
    if (widgets && widgets.length > 0) {
    } else {
      dispatch(getAllWidgets(payload));
    }

    if (props && props.page_id) {
      const payload2 = {
        page_id: props.page_id,
        page: 0,
        size: 100,
      };
      // if (gridDataStore && gridDataStore.length > 0) {
      // } else {
      dispatch(deleteAllStore());

      dispatch(getPageDataByIdApi(payload2));
      // }
    }
    const payload3 = {
      page: 0,
      size: 500,
    };
    if (reports && reports.length > 0) {
    } else {
      dispatch(getAllReportsApi(payload3));
    }
  }, [props, props.page_id]);

  const saveLayout = (data: any) => {
    const layout = [];
    if (data) {
      for (let i = 0; i < data.length; i += 1) {
        const keysArray = Object.keys(data[i]);
        const layoutObj = [];
        for (let j = 0; j < keysArray.length; j += 1) {
          const payld = {
            key: keysArray[j],
            value: data[i][keysArray[j]],
          };
          layoutObj.push(payld);
        }
        const payld2 = {
          key: 'name',
          value: 'card-widget',
          layout: layoutObj,
        };
        layout.push(payld2);
      }
    }
    const payload: any = {
      page_id: props.page_id,
      // is_delete: 0,
      widgets: layout,
    };

    for (let i = 0; i < payload.widgets.length; i += 1) {
      const dataIndex = payload.widgets[i].layout.findIndex(
        (value: any) => value.key === 'formData'
      );
      if (dataIndex !== -1) {
        payload.widgets[i].layout[dataIndex].value =
          typeof payload.widgets[i].layout[dataIndex].value === 'string'
            ? payload.widgets[i].layout[dataIndex].value
            : JSON.stringify(payload.widgets[i].layout[dataIndex].value);
      }
      const dataIndex2 = payload.widgets[i].layout.findIndex(
        (value: any) => value.key === 'formProps'
      );
      if (dataIndex2 !== -1) {
        payload.widgets[i].layout.splice(dataIndex2, 1);
      }
    }
    const obc = new Promise((resolve, reject) => {
      resolve(dispatch(savePageConfigurationApi(payload)));
    });
    obc.then((response: any) => {
      // if (response && response.payload && response.payload.data) {
      //   setSnackData({
      //     msg: response.payload.data.message,
      //     open: true,
      //     severity: 'success',
      //     duration: 3000,
      //   });
      // } else {
      //   setSnackData({
      //     msg: 'Dataflow not created.',
      //     open: true,
      //     severity: 'error',
      //     duration: 3000,
      //   });
      // }
    });
  };

  const getProjectsApiCall = () => {
    const newGridData = selectGridData(rootState);
    if (newGridData && newGridData.length) {
      const rawData = JSON.parse(JSON.stringify(newGridData[0]));
      setGridData([]);
      setGridData(rawData);
    }
  };
  const fetchReportLabel = (data: string) => {
    const payload = {
      reportName: data,
      params: {
        projections: '',
        filter: '',
        size: 0,
        page: 0,
      },
    };
    const obc = new Promise((resolve, reject) => {
      resolve(dispatch(getAllReportsLabelApi(payload)));
    });
    obc.then((response: any) => {
      if (response && response.payload && response.payload.length) {
        setReportLabels([]);
        setReportLabels(response.payload);
      } else {
        setReportLabels([]);
      }
    });
  };

  const fetchReportLabelData = (data: any) => {
    const formData =
      typeof data.formData === 'string'
        ? JSON.parse(data.formData)
        : data.formData;
    const obj = new Promise((resolve, reject) => {
      new Promise((resolve, reject) => {
        resolve(
          dispatch(
            getChartDataResource({
              label: formData.formData.label,
              report: formData.formData.report,
              widget_id: data.id,
            })
          )
        );
      }).then((response: any) => {
        if (response && response.payload && response.payload.data) {
          setGridData((oldWidgets: any) => {
            const _oldWidgets = JSON.parse(JSON.stringify(oldWidgets));
            const widgetIndex = _oldWidgets.findIndex(
              (value: any) => value.id === data.id
            );
            if (widgetIndex !== -1) {
              _oldWidgets[widgetIndex].formProps = {
                data: response.payload.data,
              };
            }

            return _oldWidgets;
          });
        }
      });
    });
  };

  return (
    <ConfigFormProvider>
      <div className="relative box-border w-full h-full">
        {gridData && reports && (
          <Demo2Ui
            data={gridData}
            rawWidgets={widgets}
            rawReports={reports}
            rawReportLabels={reportLabels}
            saveLayout={saveLayout}
            fetchReportLabel={fetchReportLabel}
            fetchReportLabelData={fetchReportLabelData}
          ></Demo2Ui>
        )}
      </div>
      <CustomSnackbar
        msg={snackData.msg}
        open={snackData.open}
        onClose={onHideSnackBar}
        duration={snackData.duration}
        severity={snackData.severity}
      />
    </ConfigFormProvider>
  );
};

export default DemoWrapper;
