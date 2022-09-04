import {
  createSlice,
  createEntityAdapter,
  EntityState,
  createSelector,
} from '@reduxjs/toolkit';
import { IRootState } from 'apps/pages-gessa/src/store';

export type _IRSortedMenuList = EntityState<ISortedMenuList[]>;
export interface IRSortedMenuList extends _IRSortedMenuList {
  selectedMenuNames: string;
  selectedSubMenuNames: string;
}

export interface ISortedMenuList {
  _id: string;
  data: any;
}

const sortedMenuAdapter = createEntityAdapter<ISortedMenuList>({
  selectId: ({ _id }) => _id || '',
});
export const {
  selectAll: selectAllSortedMenuById,
  selectById: selectSortedMenuById,
} = sortedMenuAdapter.getSelectors(
  (state: any) => state.containerApp.sortedMenuListSlice
);

export const selectActiveMenuName = createSelector(
  (state: IRootState) =>
    state.containerApp.sortedMenuListSlice.selectedMenuNames,
  (data) => data
);

export const selectActiveSubMenuName = createSelector(
  (state: IRootState) =>
    state.containerApp.sortedMenuListSlice.selectedMenuNames,
  (data) => data
);

const sortedMenuListSlice = createSlice({
  name: 'sorted-menu-store',
  initialState: sortedMenuAdapter.getInitialState({
    selectedMenuNames: null,
    selectedSubMenuNames: null,
  }),
  reducers: {
    setSortedMenus: sortedMenuAdapter.setOne,
    setActiveMenuName: (state, action) => {
      state.selectedMenuNames = action.payload;
    },
    setActiveSubMenuName: (state, action) => {
      console.log('action payload', action);
      state.selectedSubMenuNames = action.payload;
    },
  },
});

export const { setSortedMenus, setActiveMenuName, setActiveSubMenuName } =
  sortedMenuListSlice.actions;
export default sortedMenuListSlice.reducer;
