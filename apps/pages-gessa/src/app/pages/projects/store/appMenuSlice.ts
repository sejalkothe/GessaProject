import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  createSelector,
  EntityState,
} from '@reduxjs/toolkit';
import { IRootState } from '../../../../store';
// import axios from 'axios';
import axios from '../../../../utils/NetworkLayer';
import { environment } from '../../../../environments/environment';

type _IRMenuList = EntityState<IMenuList>;
export interface IRMenuList extends _IRMenuList {
  activeMenuId: string;
}

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
  async (menuParams: any, { dispatch }) => {
    console.log(menuParams);
    const response: any = await axios.get(
      `${environment.NX_FEATURE_BASE_URL}/features`,
      { params: menuParams }
    );

    const data: any = response.data.result.data;

    dispatch(setMenus(data));
    return data;
  }
);

const appMenuAdapter = createEntityAdapter<IMenuList>({
  selectId: ({ _id }) => _id,
});
export const { selectAll: selectAllMenu } = appMenuAdapter.getSelectors(
  (state: any) => state.containerApp.menuListSlice
);

const menuListSlice = createSlice({
  name: 'application-menu-store',
  initialState: appMenuAdapter.getInitialState({}),
  reducers: {
    setMenus: appMenuAdapter.setAll,
  },
});

export const { setMenus } = menuListSlice.actions;
export default menuListSlice.reducer;
