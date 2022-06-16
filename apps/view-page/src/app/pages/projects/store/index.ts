import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
const reducer = combineReducers({
  gridSlice,
});

export default reducer;
