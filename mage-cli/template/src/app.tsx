import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import Home from './pages/Home';

const app = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default app;
