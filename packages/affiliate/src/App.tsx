import {Suspense, lazy, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import '@libs/mediator';
import loadComponent from '@libs/loadComponent';
import {UIType} from '@libs/config';
import WidgetSpinner from '@widget/spinner';

import './App.less';
import Home from './pages/Home';

interface ISystem {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystem; type: number}): JSX.Element => {
  const {system, type} = props;
  const {remote, module, url} = system;

  const Component = lazy(loadComponent(remote, 'default', module, url));

  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Component type={type} />
    </Suspense>
  );
};

const App = () => {
  const [system, setSystem] = useState({
    remote: 'ui',
    url: 'https://www.local.devbitgame.com:9001/remoteEntry.js',
    module: './App',
  });

  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
      <System system={system} type={UIType.AUTH} />
    </Suspense>
  );
};

export default App;
