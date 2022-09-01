import { combineReducers } from '@reduxjs/toolkit';
import gridDataRenderSlice from './gridDataRenderSlice';
import gridSlice from './gridSlice';
import reportLabelSlice from './reportLabelSlice';
import reportSlice from './reportSlice';
import widgetSlice from './widgetsSlice';
const reducer = combineReducers({
  gridSlice,
  widgetSlice,
  reportSlice,
  reportLabelSlice,
  gridDataRenderSlice,
});

export default reducer;
