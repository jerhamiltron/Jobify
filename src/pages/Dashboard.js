/* eslint-disable react/function-component-definition */
import React, { useEffect } from 'react';

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const res = await fetch('/api/v1');
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
