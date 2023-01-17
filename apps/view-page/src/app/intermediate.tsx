import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import ChartDetails from './pages/projects/components/ChartDetails';
import ChartDetails2 from './pages/projects/components/ChartDetails2';
import DemoWrapper from './pages/projects/DemoWrapper';

export interface Props {
  page_id: any;
}

const Intermediate = (props: Props) => {
  return (
    <div>
      <Routes>
        {/* <Route
          path=""
          element={<DemoWrapper page_id={props.page_id} />}
        ></Route> */}
        <Route path="" element={<ChartDetails2 />}></Route>
        <Route path="detail" element={<ChartDetails data={{}} />}></Route>
      </Routes>
      <Outlet />
    </div>
  );
};

export default Intermediate;
