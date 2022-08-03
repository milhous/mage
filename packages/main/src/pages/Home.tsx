import {useState} from 'react';
import {Outlet} from 'react-router-dom';

import {UIType} from '@libs/config';
import WidgetSystem from '@widget/system';

import './Home.less';

// UI 系统信息
const systemInfoUI = {
  remote: 'ui',
  url: 'https://www.local.devbitgame.com:9001/remoteEntry.js',
  module: './App',
};

export default function Home(): JSX.Element {
  return (
    <>
      <WidgetSystem info={systemInfoUI} type={UIType.TOOLBAR} />
      <WidgetSystem info={systemInfoUI} type={UIType.HEADER} />
      <Outlet />
      <WidgetSystem info={systemInfoUI} type={UIType.FOOTER} />
    </>
  );
}
