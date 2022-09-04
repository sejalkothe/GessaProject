import { combineReducers } from '@reduxjs/toolkit';
import themeContextSlice from 'apps/view-page/src/store/themeContextSlice';
import themePaletteSlice from 'apps/view-page/src/store/colorPalleteSlice';
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
  themeContextSlice,
  themePaletteSlice,
});

export default reducer;
