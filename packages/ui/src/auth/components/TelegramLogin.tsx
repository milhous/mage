import {ThirdParty} from '@libs/config/auth';
import {useThrottle} from '@libs/hooks';
import {getQueryParam, isMobile} from '@libs/utils';
import {useTranslate, useLang} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';
import TelegramLogin from '@widget/thirdParty/telegramLogin';

// import {apiThirdAuthorize, apiPassThird, IApiLoginResponse, LoginSceneType, setLoginSceneType} from '@/api/login';

import {apiThirdAuthorize, apiPassThird, IApiLoginResponse, LoginSceneType, setLoginSceneType} from '@app/auth/api';
import Assets from '@app/auth/assets';
// Hook
// import {showLoginToast} from './index';

// Telegram Login
export const ButtonTelegramLogin = (): JSX.Element => {
  const {t} = useTranslate(['login']);
  // const redirectUri = isMobile() ? `${window.location.origin}/${OAuthLoginType.TELEGRAM}/callback` : '';
  const redirectUri = isMobile() ? `${window.location.origin}` : '';

  const onLogin = useThrottle(async (data: any): Promise<void> => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.TELEGRAM,
    });

    const token = JSON.stringify(data);

    try {
      const res: IApiLoginResponse = await apiPassThird({name: OAuthLoginType.TELEGRAM, token});

      showLoginToast(res.rspCode);

      if (res.rspCode === OK_CODE && res.data.firstLogin) {
        analytics.customEvent('SignIn_success', {
          desc: '注册成功',
          oauthType: 'Telegram',
        });

        window.dataLayer.push({
          event: 'sign_up',
          method: OAuthLoginType.TELEGRAM,
          'country code': regionIp,
        });
      }
    } catch (err) {
      console.log(err);

      error(t('login_fail'));
    }
  });

  return (
    <TelegramLogin botName={ThirdParty.TELEGRAM_BOTNAME} dataAuthUrl={redirectUri} dataOnauth={onLogin}>
      <Assets.BtnLoginTelegram />
    </TelegramLogin>
  );
};
