import FacebookLogin from 'react-facebook-login';

import {ThirdParty} from '@libs/config/auth';
import {useThrottle} from '@libs/hooks';
import {isMobile} from '@libs/utils';
import {useTranslate} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';

import {apiPassThird, IApiLoginResponse} from '@app/auth/api';
import Assets from '@app/auth/assets';
// import {showLoginToast} from './index';

// Facebook Login
const ButtonFacebookLogin = (props: {name: string}): JSX.Element => {
  const {name} = props;
  const t = useTranslate(['auth']);
  const redirectUri = `${window.location.origin}/${name}/callback`;

  const onLogin = useThrottle(async (data: any): Promise<void> => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.FACEBOOK,
    });

    if (data.accessToken && !data.error) {
      try {
        const res: IApiLoginResponse = await apiPassThird({name, token: data.accessToken});

        // showLoginToast(res.rspCode);

        if (res.rspCode === OK_CODE && res.data.firstLogin) {
          analytics.customEvent('SignIn_success', {
            desc: '注册成功',
            oauthType: 'facebook',
          });

          //   window.dataLayer.push({
          //     event: 'sign_up',
          //     method: OAuthLoginType.FACEBOOK,
          //     'country code': regionIp,
          //   });
        }
      } catch (err) {
        console.log(err);

        error(t('login_fail'));
      }
    }
  });

  return (
    <FacebookLogin
      appId={ThirdParty.FACEBOOK_APPID}
      callback={onLogin}
      icon={<Assets.BtnLoginFacebook />}
      textButton=""
      isMobile={isMobile()}
      redirectUri={redirectUri}
    />
  );
};

export default ButtonFacebookLogin;
