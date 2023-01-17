import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const ChartDetails2 = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e: any) => {
        navigate('detail');
      }}
    >
      ChartDetails2
    </div>
  );
};

export default ChartDetails2;
