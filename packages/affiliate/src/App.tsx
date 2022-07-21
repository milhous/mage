import {Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import {changeLang} from '@libs/i18n';
import {BTGBroadcastChannel} from '@libs/broadcastChannel';
import UISpinner from '@widget/spinner/index';

import './App.less';
import Home from './pages/Home';

const channel = new BTGBroadcastChannel('channelTest');

channel.onMessage(msg => {
  changeLang(msg.payload.val);

  console.log('channelTest app2', msg.payload.val);
});

const App = () => {
  return (
    <Suspense fallback={<UISpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
