import GoogleLogin from 'react-google-login';

import {ThirdParty} from '@libs/config/auth';
import {useThrottle} from '@libs/hooks';
import {isMobile} from '@libs/utils';
import {useTranslate} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';

import {apiPassThird, IApiResponse} from '@app/auth/api';
import Assets from '@app/auth/assets';
// import {showLoginToast} from './index';

// Google Login
const ButtonGoogleLogin = (props: {name: string}): JSX.Element => {
  const {name} = props;
  const t = useTranslate(['auth']);

  const onClick = useThrottle((renderProps: any): void => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.GOOGLE,
    });

    if (isMobile()) {
      const time = new Date().getTime().toString();
      const uri = encodeURIComponent(window.location.origin + '/google/callback');
      const scope = 'email profile';

      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/identifier?scope=${scope}&response_type=code&state=wap${time}&redirect_uri=${uri}&client_id=${ThirdParty.GOOGLE_CLIENTID}&flowName=GeneralOAuthFlow`;
    } else {
      renderProps.onClick();
    }
  });

  const onLogin = useThrottle(async (data: any): Promise<void> => {
    if (data.tokenId) {
      try {
        const res: IApiResponse = await apiPassThird({name, token: data.tokenId});

        // showLoginToast(res.rspCode);

        if (res.rspCode === OK_CODE && res.data.firstLogin) {
          analytics.customEvent('SignIn_success', {
            desc: '注册成功',
            oauthType: 'google',
          });

          //   window.dataLayer.push({
          //     event: 'sign_up',
          //     method: OAuthLoginType.GOOGLE,
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
    <GoogleLogin
      clientId={ThirdParty.GOOGLE_CLIENTID}
      onSuccess={onLogin}
      onFailure={onLogin}
      buttonText=""
      render={renderProps => (
        <Assets.BtnLoginGoogle
          onClick={(evt: React.MouseEvent) => {
            evt.preventDefault();

            onClick(renderProps);
          }}
        />
      )}
    />
  );
};

export default ButtonGoogleLogin;
