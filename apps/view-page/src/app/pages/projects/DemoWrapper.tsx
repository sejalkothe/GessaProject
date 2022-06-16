import { IRootState } from 'apps/view-page/src/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Demo2Ui from './components/Demo2Ui';
import {
  getProjectsApi,
  IRGrid,
  IRGridData,
  selectGridData,
  setGridDatatore,
} from './store/gridSlice';

export interface Props {
  page_id: string;
}

const DemoWrapper = ({ page_id = '1' }: any) => {
  const dispatch = useDispatch();
  const rootState = useSelector((state: IRootState) => state);
  console.log(rootState);
  const gridDataStore = selectGridData(rootState);
  const [gridData, setGridData] = useState<any>([]);

  useEffect(() => {
    if (gridDataStore && gridDataStore.length) {
      setGridData(gridDataStore[0].data);
    }
  }, [gridDataStore]);

  const saveLayout = (data: any) => {
    const payload: any = [
      {
        page_id: '1',
        data,
        page: 'page1',
      },
    ];
    dispatch(setGridDatatore(payload));
  };

  const getProjectsApiCall = () => {
    const newGridData = selectGridData(rootState);
    if (newGridData && newGridData.length) {
      const rawData = JSON.parse(JSON.stringify(newGridData[0].data));
      setGridData([]);
      setGridData(rawData);
    }
  };

  return (
    // <ConfigFormProvider>
    <div className="relative box-border w-full h-full">
      <button color="primary" onClick={getProjectsApiCall}>
        Load Page
      </button>
      {/* {gridData && (
          <Demo2Ui data={gridData} saveLayout={saveLayout}></Demo2Ui>
        )} */}
    </div>
    // </ConfigFormProvider>
  );
};

export default DemoWrapper;
