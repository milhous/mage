import {StrictMode, Suspense} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';

import {getRemoteURL} from '@libs/utils';
import WidgetSpinner from '@widget/spinner';
import WidgetSystem from '@widget/system';

import './App.less';

import Home from './pages/Home';

interface ISystemInfo {
  remote: string;
  url: string;
  module: string;
}

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

/**
 * 获取系统信息
 * @param type
 * @returns {ISystemInfo}
 */
const getSystemInfo = (type: number): ISystemInfo => {
  const remote = SystemType[type].toLowerCase();
  const port = SystemPorts[type];
  const url = getRemoteURL(remote, port);
  const module = './App';

  return {
    remote,
    url,
    module,
  };
};

const App = () => {
  return (
    <StrictMode>
      <Suspense fallback={<WidgetSpinner />}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/referral/*" element={<WidgetSystem info={getSystemInfo(SystemType.REFERRAL)} />} />
            <Route path="/affiliate/*" element={<WidgetSystem info={getSystemInfo(SystemType.AFFILIATE)} />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </Suspense>
    </StrictMode>
  );
};

export default App;
