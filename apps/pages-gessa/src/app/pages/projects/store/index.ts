import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
import themeColorSlice from './themeSlice';
const reducer = combineReducers({
  gridSlice,
  themeColorSlice,
});

export default reducer;
