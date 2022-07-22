import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from '../../../../store';
import axios from 'axios';

type _IRMenuList = EntityState<IMenuList>;
export interface IRMenuList extends _IRMenuList {
  activeMenuId: string;
}
// export interface IMenuList extends _IRMenuList {
//   id: string;
//   page: string;
//   data: any;
// }

export interface IcreatedBy {
  userId: string;
  emailId: string;
}

export interface IAuthorization {
  res: string;
  scope: string;
  roles: Array<string>;
}

export interface IPolicies {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}

export interface IResources {
  name: string;
  ownerManagedAccess: boolean;
  resourceScope: Array<string>;
}

export interface IPermissions {
  name: string;
  type: string;
  logic: string;
  decisionStrategy: string;
  config: any;
}
export interface IMenuList {
  createdBy: IcreatedBy;
  _id: string;
  name: string;
  localName: string;
  description: string;
  authorization: Array<IAuthorization>;
  localDescription: string;
  icon: string;
  parentId: string;
  policies: Array<IPolicies>;
  resources: Array<IResources>;
  permissions: Array<IPermissions>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getAppMenu = createAsyncThunk(
  'features',
  async (menuContent: any, { dispatch }) => {
    const response: any = await axios.get(
      `http://gessa.io/rbac/features?page=0&size=10`,
      {
        headers: {
          tenantid: menuContent.tenantid,
        },
      }
    );

    const data: any = response.data.result.data;

    dispatch(setMenus(data));
    return data;
    //   dispatch(setNodes(data[0].nodes));
    //   dispatch(setChart(data[0].flowchart));
  }
);

const appMenuAdapter = createEntityAdapter<IMenuList>({
  selectId: ({ _id }) => _id,
});
export const { selectAll: selectAllMenu } = appMenuAdapter.getSelectors(
  (state: any) => state.grid.menuListSlice
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
