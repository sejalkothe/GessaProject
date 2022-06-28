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
  id: string;
  page: string;
  data: any;
}

export const getAppMenu = createAsyncThunk(
  'features',
  async (menuContent: any, { dispatch }) => {
    const response: any = await axios.get(
      `http://gessa.io/rbac/features`,
      menuContent.data
    );

    const data: any = response.data.result.data;
    dispatch(setMenus(data));
    //   dispatch(setNodes(data[0].nodes));
    //   dispatch(setChart(data[0].flowchart));
  }
);

const appMenuAdapter = createEntityAdapter<IRGrid>({
  selectId: ({ id }) => id,
});
export const { selectAll: selectAllMenu } = appMenuAdapter.getSelectors(
  (state: any) => state.menuListSlice
);

const menuListSlice = createSlice({
  name: 'appMenu',
  initialState: appMenuAdapter.getInitialState({}),
  reducers: {
    setMenus: appMenuAdapter.setAll,
  },
});

export const { setMenus } = menuListSlice.actions;
export default menuListSlice.reducer;
