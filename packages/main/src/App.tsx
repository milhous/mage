import {Suspense, lazy, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import loadComponent from '@libs/loadComponent';
import WidgetSpinner from '@widget/spinner';

import './App.less';

import Home from './pages/Home';

interface ISystemInfo {
  remote: string;
  url: string;
  module: string;
}

const System = (props: {system: ISystemInfo}): JSX.Element => {
  const {system} = props;
  const {remote, module, url} = system;

  const Component = lazy(loadComponent(remote, 'default', module, url));

  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Component />
    </Suspense>
  );
};

/**
 * 系统类型
 * @property REFERRAL 邀请
 * @property AFFILIATE 代理
 */
enum SystemType {
  REFERRAL = 0,
  AFFILIATE,
}

// 系统接口
const SystemPorts = {
  [SystemType.REFERRAL]: 9007,
  [SystemType.AFFILIATE]: 9013,
};

const getSystemInfo = (type: number): ISystemInfo => {
  const remote = SystemType[type].toLowerCase();
  const port = SystemPorts[type];
  const protocol = location.protocol;
  const url = `${protocol}//www.local.devbitgame.com:${port}/remoteEntry.js`;
  const module = './App';

  return {
    remote,
    url,
    module,
  };
};

const App = () => {
  return (
    <Suspense fallback={<WidgetSpinner />}>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/referral/*" element={<System system={getSystemInfo(SystemType.REFERRAL)} />} />
          <Route path="/affiliate/*" element={<System system={getSystemInfo(SystemType.AFFILIATE)} />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
