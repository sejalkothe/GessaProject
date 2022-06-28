import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
import themeSlice from './themeSlice';
const reducer = combineReducers({
  gridSlice,
  themeSlice,
});

export default reducer;
