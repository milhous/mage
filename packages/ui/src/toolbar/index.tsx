import QRCode from 'qrcode.react';

import './index.less';

import ToolbarAndroid from './toolbar-android.svg';
import ToolbarGoogle from './toolbar-google.svg';
import ToolbarIOS from './toolbar-ios.svg';
import ToolbarLogo from './toolbar-logo.svg';

// app下载
const AppDownload = (): JSX.Element => {
  return (
    <ul className="ui-toolbar_app">
      <li>
        <ToolbarIOS />
        <AppQRCode />
      </li>
      <li>
        <ToolbarAndroid />
        <AppQRCode />
      </li>
      <li>
        <ToolbarGoogle />
        <AppQRCode />
      </li>
    </ul>
  );
};

// 下载二维码
const AppQRCode = (): JSX.Element => {
  return (
    <div className="ul-toolbar_QRCode">
      <QRCode value={`${location.origin}/app`} level="H" />
      <ToolbarLogo />
    </div>
  );
};

const UIToolbar = (): JSX.Element => {
  return (
    <div className="ui-toolbar">
      <div className="ui-toolbar_content">
        <article></article>
        <aside>
          <AppDownload />
        </aside>
      </div>
    </div>
  );
};

export default UIToolbar;
