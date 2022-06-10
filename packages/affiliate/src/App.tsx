import React, {Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import UISpinner from '@ui/spinner/index';

import './App.less';
import Home from './pages/Home';

const app = () => {
  return (
    <Suspense fallback={<UISpinner />}>
      <Routes>
        <Route path="/affiliate" element={<Home />} />
        {/* <Route path="*" element={<Navigate replace to="/affiliate" />} /> */}
      </Routes>
    </Suspense>
  );
};

export default app;
