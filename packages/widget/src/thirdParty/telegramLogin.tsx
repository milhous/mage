import {useRef, useEffect} from 'react';

import {useLang} from '@libs/i18n';

declare global {
  interface Window {
    TelegramLoginWidget: any;
  }
}

/**
 *  声明
 * @param {string} botName 机器人名称
 * @param {string} buttonSize 按钮尺寸 large, medium, small
 * @param {number} cornerRadius 图标圆角
 * @param {string} requestAccess 请求权限 write
 * @param {boolean} usePic 是否使用用户头像
 * @param {function} dataOnauth 授权回调函数
 * @param {string} dataAuthUrl 授权回调地址
 * @param {number} widgetVersion 组件版本号
 * @param {React.ReactNode} children ReactNode
 */
interface ITelegramProps {
  botName?: string;
  buttonSize?: 'large' | 'medium' | 'small';
  cornerRadius?: number;
  requestAccess?: string;
  usePic?: boolean;
  dataOnauth?: (res: ITelegramDataOnauth) => void;
  dataAuthUrl?: string;
  widgetVersion?: number;
  children?: React.ReactNode;
}

/**
 * 声明
 * @param {string} id ID
 * @param {string} first_name 姓
 * @param {string} last_name 名
 * @param {string} username 用户名
 * @param {string} photo_url 头像地址
 * @param {string} auth_date 授权时间
 * @param {string} hash 哈希值
 */
interface ITelegramDataOnauth {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
}

/**
 * Telegram Login
 * @param {ITelegramProps} props 属性
 */
const TelegramLogin = (props: ITelegramProps): JSX.Element => {
  const {
    botName = '',
    buttonSize = 'large',
    requestAccess = 'write',
    usePic = false,
    widgetVersion = 14,
    dataOnauth,
    dataAuthUrl,
    cornerRadius,
  } = props;
  const lang = useLang();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null || botName === '') return;

    const iframId = 'telegram-login-' + botName;
    const ifram = document.getElementById(iframId);

    if (!!ifram) {
      const elem = ifram.cloneNode(true);

      ref.current.appendChild(elem);
    } else {
      window.TelegramLoginWidget = {
        dataOnauth: (res: ITelegramDataOnauth) => {
          if (typeof dataOnauth === 'function') {
            dataOnauth(res);
          }
        },
      };

      const script = document.createElement('script');
      script.src = `https://telegram.org/js/telegram-widget.js?${widgetVersion}`;
      script.setAttribute('data-telegram-login', botName as string);
      script.setAttribute('data-size', buttonSize as string);

      if (cornerRadius !== undefined) {
        script.setAttribute('data-radius', '' + (cornerRadius as number));
      }

      script.setAttribute('data-request-access', requestAccess as string);
      script.setAttribute('data-userpic', '' + (usePic as boolean));
      script.setAttribute('data-lang', lang as string);

      if (typeof dataAuthUrl === 'string' && dataAuthUrl !== '') {
        script.setAttribute('data-auth-url', encodeURIComponent(dataAuthUrl));
      } else {
        script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
      }

      script.async = true;

      ref.current.appendChild(script);
    }
  }, [botName, buttonSize, cornerRadius, dataOnauth, requestAccess, usePic]);

  return (
    <>
      {props.children}
      <div ref={ref}></div>
    </>
  );
};

export default TelegramLogin;
