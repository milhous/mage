import {useState} from 'react';
import {Outlet} from 'react-router-dom';

import {UIType} from '@libs/config';
import {getRemoteURL} from '@libs/utils';
import WidgetSystem from '@widget/system';

import './Home.less';

// UI 系统信息
const systemInfoUI = {
  remote: 'ui',
  url: getRemoteURL('ui', 9001),
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
