import KakaoLogin from 'react-kakao-login';

import {ThirdParty} from '@libs/config/auth';
import {useThrottle} from '@libs/hooks';
import {isMobile} from '@libs/utils';
import {useTranslate} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';

// import {apiThirdAuthorize, apiPassThird, IApiLoginResponse, LoginSceneType, setLoginSceneType} from '@/api/login';

import {apiPassThird, IApiLoginResponse} from '@app/auth/api';
import Assets from '@app/auth/assets';
// import {showLoginToast} from './index';

declare global {
  interface Window {
    Kakao: any;
  }
}

// Kakao Login
const ButtonKakaoLogin = (props: {name: string}): JSX.Element => {
  const {name} = props;
  const t = useTranslate(['auth']);

  const onClick = useThrottle((renderProps: any): void => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.KAKAO,
    });

    if (isMobile() && 'Kakao' in window && window.Kakao.isInitialized()) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.origin}/kakao/callback`,
      });
    } else {
      renderProps.onClick();
    }
  });

  const onLogin = useThrottle(async (data: any): Promise<void> => {
    console.log('kakaoLogin', data);

    if (data.response.access_token) {
      try {
        const res: IApiLoginResponse = await apiPassThird({name, token: data.response.access_token});

        // showLoginToast(res.rspCode);

        if (res.rspCode === OK_CODE && res.data.firstLogin) {
          analytics.customEvent('SignIn_success', {
            desc: '注册成功',
            oauthType: 'kakao',
          });

          // window.dataLayer.push({
          //   event: 'sign_up',
          //   method: OAuthLoginType.KAKAO,
          //   'country code': regionIp,
          // });
        }
      } catch (err) {
        console.log(err);

        error(t('login_fail'));
      }
    }
  });

  return (
    <KakaoLogin
      token={ThirdParty.KAKAO_JSKEY}
      onSuccess={onLogin}
      onFail={onLogin}
      render={renderProps => {
        return (
          <Assets.BtnLoginKakao
            onClick={(evt: React.MouseEvent) => {
              evt.preventDefault();

              onClick(renderProps);
            }}
          />
        );
      }}
    />
  );
};

export default ButtonKakaoLogin;
