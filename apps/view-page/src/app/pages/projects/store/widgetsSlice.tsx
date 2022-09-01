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

type _IRwidgetSlice = EntityState<IWidget>;
export interface IRwidgetSlice extends _IRwidgetSlice {
  activeWidgetId: string;
}

export interface IWidgetProperties {
  _id: string;
  key: string;
  datatype: string;
}
export interface IWidget {
  _id: string;
  name: string;
  type: string;
  properties: IWidgetProperties[];
  is_delete: number;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface IParams {
  page: number;
  size: number;
}

export const getAllWidgets = createAsyncThunk(
  'get all widgets',
  async (params: IParams, { dispatch }) => {
    const response: any = (
      await axios.get(environment.NX_WIDGET_SERVICE + `/widgets`, {
        params: params,
      })
    ).data.result;
    if (response && response.data) {
      const data: IWidget[] = response.data;
      const dataForStore: IWidget[] = data.map((e: IWidget) => {
        return {
          _id: e._id,
          name: e.name,
          type: e.type,
          properties: e.properties,
          is_delete: e.is_delete,
          created_at: e.created_at,
          updated_at: e.updated_at,
          __v: e.__v,
        };
      });
      dispatch(setWidgets(dataForStore));
    }
  }
);

const widgetSliceAdapter = createEntityAdapter<IWidget>({
  selectId: ({ _id }) => _id,
});

export const {
  selectAll: selectAllWidgets,
  selectById: selectWidgetById,
  selectIds: selectWidgetByIds,
} = widgetSliceAdapter.getSelectors((state: IRootState) => {
  return state.grid.widgetSlice;
});

const widgetSlice = createSlice({
  name: 'widgetSlice',
  initialState: widgetSliceAdapter.getInitialState({
    activeWidgetId: null,
  }),
  reducers: {
    setWidgets: widgetSliceAdapter.upsertMany,
  },
});

export const { setWidgets } = widgetSlice.actions;
export default widgetSlice.reducer;
