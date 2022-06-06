import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import './app.less';
import Home from './pages/Home';

const app = () => {
  return (
    <Routes>
      <Route path="/staking" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/staking" />} />
    </Routes>
  );
};

export default app;
