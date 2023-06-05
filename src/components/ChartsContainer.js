import React, { useState } from 'react';
import { BarChart, AreaChart } from './';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer.js';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? <AreaChart data={data} /> : <BarChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
