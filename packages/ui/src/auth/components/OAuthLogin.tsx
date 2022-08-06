import {useState, useMemo} from 'react';

import {useTranslate} from '@libs/i18n';
import {isApp} from '@libs/utils';

// 静态资源
import Assets from '@app/auth/assets';
import * as OAuthButton from './OAuthButton';
import * as WalletButton from './WalletsButton';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import KakaoLogin from 'react-kakao-login';

/*------ 组件相关 ------*/
// 样式
import './OAuthLogin.less';

// 授权登录
export const OAuthLogin = (type: string): JSX.Element => {
  const [telegramOAuthStatus, setTelegramOAuthStatus] = useState(false);
  const t = useTranslate(['common']);
  const id = useMemo((): string => {
    return type === 'login' ? 'login_others' : 'sign_up_others';
  }, [type]);

  return (
    <>
      <input id="OAuthLogin" type="checkbox" />
      <div className="ui-auth_OAuth">
        <ul id={id}>
          <li className="btn-login_google">
            <OAuthButton.ButtonGoogleLogin />
          </li>
          {!isApp() && !telegramOAuthStatus && (
            <li className="btn-login_telegram">
              <OAuthButton.ButtonTelegramLogin />
            </li>
          )}
          <li className="btn-login_facebook">
            <OAuthButton.ButtonFacebookLogin />
          </li>
          <li className="btn-login_metamask">
            <WalletButton.ButtonMetaMaskLogin />
          </li>
        </ul>
        <label
          className="btn-login_more"
          htmlFor="OAuthLogin"
          onClick={() => {
            setTelegramOAuthStatus(true);
          }}
        >
          <Assets.IconArrow />
          <span>{t('more')}</span>
        </label>
        <div>
          <ul>
            <li className="btn-login_google">
              <OAuthButton.ButtonGoogleLogin />
            </li>
            {!isApp() && telegramOAuthStatus && (
              <li className="btn-login_telegram">
                <OAuthButton.ButtonTelegramLogin />
              </li>
            )}
            <li className="btn-login_facebook">
              <OAuthButton.ButtonFacebookLogin />
            </li>
            <li className="btn-login_line">
              <OAuthButton.ButtonLineLogin />
            </li>
            <li className="btn-login_kakao">
              <OAuthButton.ButtonKakaoLogin />
            </li>
            <li className="btn-login_tronlink">
              <WalletButton.ButtonTronLinkLogin />
            </li>
            <li className="btn-login_metamask">
              <WalletButton.ButtonMetaMaskLogin />
            </li>
            <li className="btn-login_binance">
              <WalletButton.ButtonBinanceLogin />
            </li>
          </ul>
          <label
            className="btn-login_toggle"
            htmlFor="OAuthLogin"
            onClick={() => {
              setTelegramOAuthStatus(false);
            }}
          >
            <Assets.BtnLoginToggle />
          </label>
        </div>
      </div>
    </>
  );
};
