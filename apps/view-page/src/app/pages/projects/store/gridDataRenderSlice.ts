import {
  createSlice,
  createEntityAdapter,
  createSelector,
  EntityState,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import { environment } from 'apps/view-page/src/environments/environment';
import axios from '../../../../utils/NetworkLayer';
import { IRootState } from '../../../../store';
type _IRGridDataRenderSlice = EntityState<IWidgetDataRender>;
export interface IRGridDataRenderSlice extends _IRGridDataRenderSlice {
  activeWidgetId: string;
}

export interface IWidgetDataRender {
  widgetid: string;
  report: string;
  label: string;
  data: any;
}

export interface IDataResourseParams {
  widget_id: string;
  report: string;
  label: string;
}

export const getChartDataResource = createAsyncThunk(
  'get chart resource',
  async (params: IDataResourseParams, { dispatch }) => {
    const response: any = await axios.get(
      environment.NX_SCHEMA_SERVICE +
        `/chart-data/report/${params.report}/label/${params.label}`
    );
    if (response && response.data) {
      const data: IWidgetDataRender = response.data;
      const payload: IWidgetDataRender = {
        data: data,
        label: params.label,
        report: params.report,
        widgetid: params.widget_id,
      };
      dispatch(setGridDataRender(payload));
    }
    return response;
  }
);

const getResposeDataAltered = (data: any): any => {
  const cols: any = [];
  if (data && data.length > 0) {
    const columnKeys = Object.keys(data[0]);
    columnKeys.map((keyname: string) => {
      const colObj: any = {
        field: keyname,
        headerName: keyname,
        type: 'string',
        flex: 1,
      };
      cols.push(colObj);
    });
  }
  const gridObj = {
    columns: cols,
    rows: data,
  };

  return gridObj;
};
export const getGridDataResource = createAsyncThunk(
  'get chart resource',
  async (params: any, { dispatch }) => {
    const response: any = await axios.post(
      environment.NX_SCHEMA_SERVICE + `/queryReport/${params.report}`,
      {
        params: {
          projections: '',
          filter: '',
          size: '100',
          page: '0',
        },
      }
    );
    if (response && response.data) {
      const data: IWidgetDataRender = response.data;
      const alteredObject = getResposeDataAltered(data);

      const payload: IWidgetDataRender = {
        data: alteredObject,
        label: params.label || '',
        report: params.report,
        widgetid: params.widget_id,
      };
      const responseNew = {
        data: alteredObject,
      };
      dispatch(setGridDataRender(payload));
      return responseNew;
    }
    return response;
  }
);

const gridDataRenderAdapter = createEntityAdapter<IWidgetDataRender>({
  selectId: ({ widgetid }) => widgetid,
});

export const {
  selectAll: selectAllGridDataRender,
  selectById: selectGridDataRenderByWidgetId,
  selectIds: selectGridDataRenderByWidgetIds,
} = gridDataRenderAdapter.getSelectors((state: IRootState) => {
  return state.grid.gridDataRenderSlice;
});

const gridDataRenderSlice = createSlice({
  name: 'gridDataRenderSlice',
  initialState: gridDataRenderAdapter.getInitialState({
    activeWidgetId: null,
  }),
  reducers: {
    setGridDataRender: gridDataRenderAdapter.upsertOne,
  },
});

export const { setGridDataRender } = gridDataRenderSlice.actions;
export default gridDataRenderSlice.reducer;
