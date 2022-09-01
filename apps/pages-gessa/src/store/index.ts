import containerApp from '../app/pages/projects/store';
import { IRGridData } from '../app/pages/projects/store/gridSlice';
export { default as containerApp } from '../app/pages/projects/store';
import { IRMenuList } from '../app/pages/projects/store/appMenuSlice';
import { IRThemeContext } from './themeContextSlice';
import { IRThemePaletteContext } from './colorPalleteSlice';

export interface IRootState {
  containerApp: {
    gridSlice: IRGridData;
    menuListSlice: IRMenuList;
    themeContextSlice: IRThemeContext;
    themePaletteSlice: IRThemePaletteContext;
  };
}

const reducers = {
  containerApp,
};

export default reducers;
