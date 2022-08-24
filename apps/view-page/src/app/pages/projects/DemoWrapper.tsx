import ConfigFormProvider from 'apps/view-page/src/context/form';
import { IRootState } from 'apps/view-page/src/store';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSnackbar from '../../components/CustomSnackbar';
import Demo2Ui from './components/Demo2Ui';
import {
  getChartDataResource,
  getGridDataResource,
} from './store/gridDataRenderSlice';
import {
  getPageDataByIdApi,
  savePageConfigurationApi,
  selectGridData,
} from './store/gridSlice';
import { getAllReportsLabelApi } from './store/reportLabelSlice';
import { getAllReportsApi, selectAllReports } from './store/reportSlice';
import { getAllWidgets, selectAllWidgets } from './store/widgetsSlice';

export interface IGridProps {
  page_id: string;
}

const DemoWrapper = (props: IGridProps) => {
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
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

  const [reportLabels, setReportLabels] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const keysArray: any = [];
    const promiseArray: any = [];
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
                  data: {
                    title: data?.formData?.title || '',
                    stat: 'This is subtitle',
                    iconName: 'Search',
                    link: 'View All',
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
              }).then((response: any) => {
                if (response && response.payload && response.payload.data) {
                  if (payload.type) {
                    if (response.payload.data) {
                      switch (payload.type.toLowerCase()) {
                        case 'barchart':
                          payload.formProps = {
                            data: response.payload.data,
                            xLabel: data.formData.x_axis_label,
                            yLabel: data.formData.y_axis_label,
                          };
                          break;
                        case 'linechart':
                          payload.formProps = {
                            data: response.payload.data,
                            xLabel: data.formData.x_axis_label,
                            yLabel: data.formData.y_axis_label,
                          };
                          break;
                        case 'card':
                          //   const defaultProps = {
                          //     title: 'This si title',
                          //     stat: 'asdfg',
                          //     iconName: 'Search',
                          //     link: 'View All',
                          //   };

                          //   payload.formProps = {};
                          break;
                        case 'grid':
                          console.log('im a grid type');
                          payload.formProps = response.payload.data;
                          break;
                        case 'radarchart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'doughnutchart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'piechart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'scatterchart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'heatmapchart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'polarchart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;
                        case 'bubblechart':
                          payload.formProps = {
                            data: response.payload.data,
                          };
                          break;

                        default:
                          payload.formProps = {};
                      }
                    }
                  }
                  gridLoadWidget.push(payload);
                }
              })
            );
          } else {
            payload.formProps = {};
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
    dispatch(getAllWidgets(payload));

    const payload2 = {
      page_id: props.page_id,
      page: 0,
      size: 100,
    };

    dispatch(getPageDataByIdApi(payload2));

    const payload3 = {
      page: 0,
      size: 500,
    };
    dispatch(getAllReportsApi(payload3));
  }, [dispatch, props, props.page_id]);

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
