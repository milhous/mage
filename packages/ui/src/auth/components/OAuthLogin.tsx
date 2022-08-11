import {useState, useMemo} from 'react';

import {useTranslate, getTranslate} from '@libs/i18n';
import {isApp, getQueryParam} from '@libs/utils';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';

import {apiPassThird, IApiLoginResponse} from '@app/auth/api';
import Assets from '@app/auth/assets';

import ButtonGoogleLogin from './ButtonGoogleLogin';
import ButtonTelegramLogin from './ButtonTelegramLogin';
import ButtonFacebookLogin from './ButtonFacebookLogin';
import ButtonLineLogin from './ButtonLineLogin';
import ButtonKakaoLogin from './ButtonKakaoLogin';
import ButtonMetaMaskLogin from './ButtonMetaMaskLogin';
import ButtonBinanceLogin from './ButtonBinanceLogin';
import ButtonTronLinkLogin from './ButtonTronLinkLogin';

/*------ 组件相关 ------*/
// 样式
import './OAuthLogin.less';

// 授权登录类型
const OAuthLoginType = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  LINE: 'line',
  KAKAO: 'kakao',
  TELEGRAM: 'telegram',
};

/**
 * Code Login
 * @param {string} name 名称
 * @return {boolean}
 */
const codeLogin = async (name: string): Promise<boolean> => {
  const auth_date = getQueryParam('auth_date');
  const hash = getQueryParam('hash');

  /**
   * 验证是否是回调回来的
   * telegram回调地址只能是 window.location.origin
   */
  if (auth_date && hash) {
    name = OAuthLoginType.TELEGRAM;
  } else if (location.pathname !== `/${name}/callback`) {
    return false;
  }

  let code = getQueryParam('code');

  if (OAuthLoginType.TELEGRAM === name) {
    const id = getQueryParam('id');
    const first_name = getQueryParam('first_name');
    const last_name = getQueryParam('last_name');
    const username = getQueryParam('username');
    const photo_url = getQueryParam('photo_url');

    code = JSON.stringify({
      id,
      first_name,
      last_name,
      username,
      photo_url,
      auth_date,
      hash,
    });
  }

  if (code) {
    window.history.pushState(null, '', `/`);

    try {
      const res: any = await apiPassThird({name, token: code});

      // showLoginToast(res.rspCode);

      if (res.rspCode === OK_CODE && res.data.firstLogin) {
        analytics.customEvent('SignIn_success', {
          desc: '注册成功',
          oauthType: 'code',
        });

        // window.dataLayer.push({
        //   event: 'sign_up',
        //   method: name,
        //   'country code': regionIp,
        // });
      }
    } catch (err) {
      console.log(err);

      error(getTranslate('login:login_fail'));
    }
  }

  return !!code;
};

// 检测登录
const detectLogin = async (): Promise<void> => {
  for (const type in OAuthLoginType) {
    const name = OAuthLoginType[type];
    const result = await codeLogin(name);

    if (result) {
      // setLoginSceneType(LoginSceneType.CALLBACK);

      break;
    }
  }
};

detectLogin();

// 授权登录
const OAuthLogin = (props: {type: string}): JSX.Element => {
  const {type} = props;
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
            <ButtonGoogleLogin name={OAuthLoginType.GOOGLE} />
          </li>
          {!isApp() && !telegramOAuthStatus && (
            <li className="btn-login_telegram">
              <ButtonTelegramLogin name={OAuthLoginType.TELEGRAM} />
            </li>
          )}
          <li className="btn-login_facebook">
            <ButtonFacebookLogin name={OAuthLoginType.FACEBOOK} />
          </li>
          <li className="btn-login_metamask">
            <ButtonMetaMaskLogin />
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
              <ButtonGoogleLogin name={OAuthLoginType.GOOGLE} />
            </li>
            {!isApp() && telegramOAuthStatus && (
              <li className="btn-login_telegram">
                <ButtonTelegramLogin name={OAuthLoginType.FACEBOOK} />
              </li>
            )}
            <li className="btn-login_facebook">
              <ButtonFacebookLogin name={OAuthLoginType.FACEBOOK} />
            </li>
            <li className="btn-login_line">
              <ButtonLineLogin name={OAuthLoginType.FACEBOOK} />
            </li>
            <li className="btn-login_kakao">
              <ButtonKakaoLogin name={OAuthLoginType.FACEBOOK} />
            </li>
            <li className="btn-login_tronlink">
              <ButtonTronLinkLogin />
            </li>
            <li className="btn-login_metamask">
              <ButtonMetaMaskLogin />
            </li>
            <li className="btn-login_binance">
              <ButtonBinanceLogin />
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

export default OAuthLogin;
