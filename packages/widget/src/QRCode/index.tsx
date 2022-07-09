import QRCode from 'qrcode.react';

import './index.less';
import QRCodeLogo from './QRCode-logo.svg';

// 二维码
const WidgetQRCode = (props: {url: string; children?: React.ReactNode | React.ReactNode[]}): JSX.Element => {
  const {url, children} = props;

  return (
    <div className="widget-QRCode">
      <QRCode value={url} level="H" />
      {!!children ? children : <QRCodeLogo />}
    </div>
  );
};

export default WidgetQRCode;
