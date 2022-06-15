import {Suspense, lazy, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import loadComponent from '@libs/loadComponent';

import UISpinner from '@ui/spinner/index';

import './App.less';

import Home from './pages/Home';

interface ISystem {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystem}): JSX.Element => {
  const {system} = props;
  const {remote, module, url} = system;

  const Component = lazy(loadComponent(remote, 'default', module, url));

  return (
    <Suspense fallback={<UISpinner />}>
      <Component />
    </Suspense>
  );
};

const App = () => {
  const [system, setSystem] = useState({
    remote: 'affiliate',
    url: 'https://www.local.devbitgame.com:9013/remoteEntry.js',
    module: './App',
  });

  return (
    <Suspense fallback={<UISpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/affiliate/*" element={<System system={system} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
