import grid from '../app/pages/projects/store';
import { IRGridData } from '../app/pages/projects/store/gridSlice';
import gridSlice from '../app/pages/projects/store';
import themeSlice from '../app/pages/projects/store/themeSlice';
import { IPalette } from '../app/pages/projects/store/themeSlice';
export { default as grid } from '../app/pages/projects/store';

export interface IRootState {
  grid: {
    themeSlice: IPalette;
    gridSlice: IRGridData;
  };
}

const reducers = {
  grid,
};

export default reducers;
