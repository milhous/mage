import {Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import WidgetSpinner from '@widget/spinner';

import './App.less';
import Home from './pages/Home';

const App = () => {
  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
