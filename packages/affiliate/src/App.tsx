import {Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import '@libs/mediator';
import {UIType} from '@libs/config';
import WidgetSpinner from '@widget/spinner';
import WidgetSystem from '@widget/system';

import './App.less';
import Home from './pages/Home';

// UI 系统信息
const systemInfoUI = {
  remote: 'ui',
  url: 'https://www.local.devbitgame.com:9001/remoteEntry.js',
  module: './App',
};

const App = () => {
  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      <WidgetSystem info={systemInfoUI} type={UIType.AUTH} />
    </Suspense>
  );
};

export default App;
