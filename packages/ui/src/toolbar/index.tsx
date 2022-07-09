import WidgetQRCode from '@widget/QRCode';

import './index.less';

import ToolbarAndroid from './assets/toolbar-android.svg';
import ToolbarGoogle from './assets/toolbar-google.svg';
import ToolbarIOS from './assets/toolbar-ios.svg';

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
    <div className="ui-toolbar_QRCode">
      <div>
        <WidgetQRCode url={`${location.origin}/app`} />
      </div>
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
