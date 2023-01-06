import {StrictMode, Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import '@libs/mediator';
import {UIType} from '@libs/config';
import {getRemoteURL} from '@libs/utils';
import WidgetSpinner from '@widget/spinner';
import WidgetSystem from '@widget/system';

import './App.less';
import Home from './pages/Home';

// UI 系统信息
const systemInfoUI = {
  remote: 'ui',
  url: getRemoteURL('ui', 9001),
  module: './App',
};

const App = () => {
  return (
    <StrictMode>
      <Suspense fallback={<WidgetSpinner />}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
        <WidgetSystem info={systemInfoUI} type={UIType.AUTH} />
      </Suspense>
    </StrictMode>
  );
};

export default App;
