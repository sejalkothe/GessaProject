import grid from '../app/pages/projects/store';
import { IRGridData } from '../app/pages/projects/store/gridSlice';
import gridSlice from '../app/pages/projects/store';

export { default as grid } from '../app/pages/projects/store';

export interface IRootState {
  grid: {
    gridSlice: IRGridData;
  };
}

const reducers = {
  grid,
};

export default reducers;
