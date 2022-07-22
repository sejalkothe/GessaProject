import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
import themeColorSlice from './themeSlice';
import menuListSlice from './appMenuSlice';
const reducer = combineReducers({
  gridSlice,
  themeColorSlice,
  menuListSlice,
});

export default reducer;
