import { combineReducers } from '@reduxjs/toolkit';
import gridSlice from './gridSlice';
import themeColorSlice from './themeSlice';
import menuListSlice from './appMenuSlice';
import themeContextSlice from "../../../../store/themeContextSlice"
import themePaletteSlice from "../../../../store/colorPalleteSlice"
const reducer = combineReducers({
  gridSlice,
  themeColorSlice,
  menuListSlice,
  themeContextSlice,
  themePaletteSlice
});

export default reducer;
