import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from '../../../../store';
import axios from 'axios';

type _IRGridData = EntityState<IRGrid>;
export interface IRGridData extends _IRGridData {
  activePageId: string;
}
export interface IRGrid extends _IRGridData {
  page_id: string;
  page: string;
  data: any;
}

export const getProjectsApi = createAsyncThunk(
  'projects',
  async (params: any, { dispatch }) => {
    const payload = {
      page: 0,
      size: 500,
    };
    const response: any = (
      await axios.get(process.env.NX_BASE_URL + `/page-view`, {
        params: payload,
      })
    ).data.result;
    dispatch(setGridDatatore(response.data));
  }
);

const gridDataAdapter = createEntityAdapter<IRGrid>({
  selectId: ({ page_id }) => page_id,
});

export const { selectAll: selectGridData } = gridDataAdapter.getSelectors(
  (state: IRootState) => {
    return state.grid.gridSlice;
  }
);

export const selectActivePageId = createSelector(
  (state: IRootState) => state.grid.gridSlice,
  (data) => data
);

const gridSlice = createSlice({
  name: 'gridStore',
  initialState: gridDataAdapter.getInitialState({ activePageId: '-1' }),
  reducers: {
    setGridDatatore: gridDataAdapter.setAll,
  },
});

export const { setGridDatatore } = gridSlice.actions;
export default gridSlice.reducer;
