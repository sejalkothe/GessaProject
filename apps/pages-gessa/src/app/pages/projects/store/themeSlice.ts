import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { environment } from 'apps/pages-gessa/src/environments/environment';
import { IRootState } from 'apps/pages-gessa/src/store';

export interface IPalette {
  mode: string;
  text: Array<string>;
  primary: Array<string>;
  secondary: Array<string>;
  common: Array<string>;
  background: Array<string>;
  custom: Array<string>;
}

export const getColorTheme = createAsyncThunk('color', async (params?: any) => {
  // console.log('inside getColorTheme');
  const response: any = (
    await axios.get(environment.NX_THEME_BASE_URL + `/color`)
  ).data.result;

  const data: any = response.data;
  console.log('data getColorTheme', data);
});

export const getColorThemeDummy = createAsyncThunk('color', async () => {
  const response: any = await axios.get(
    environment.NX_THEME_BASE_URL + '/color'
  );
  const data: any = response.data;
  console.log('data getTheme', data);
  //dispatch(setTheme({ data }));
});

const themeAdapter = createEntityAdapter<any>({
  selectId: ({ _id }) => _id,
});

export const selectActiveProjectId = createSelector(
  (state: IRootState) => state.grid.themeSlice,
  (data) => data
);
// const themeAdapter = createEntityAdapter();

const themeColorSlice = createSlice({
  name: 'themeColor',
  initialState: themeAdapter.getInitialState({}),
  reducers: {
    setTheme: themeAdapter.setAll,
  },
});

export const { setTheme } = themeColorSlice.actions;
export default themeColorSlice.reducer;
