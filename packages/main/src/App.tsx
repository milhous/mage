import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import './App.less';
import Home from './pages/Home';

const app = () => {
  return (
    <Routes>
      <Route path="/affiliate" element={<Home />} />
      {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
    </Routes>
  );
};

export default app;
