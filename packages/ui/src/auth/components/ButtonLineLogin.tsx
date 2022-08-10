import {useThrottle} from '@libs/hooks';
import {useTranslate} from '@libs/i18n';
import {OK_CODE} from '@libs/requests';
import analytics from '@libs/analytics';

import {error} from '@widget/toastify';

import {apiThirdAuthorize, IApiResponse} from '@app/auth/api';
import Assets from '@app/auth/assets';

// Line Login
const ButtonLineLogin = (props: {name: string}): JSX.Element => {
  const {name} = props;
  const t = useTranslate(['login']);

  const onLogin = useThrottle(async (): Promise<void> => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.LINE,
    });

    try {
      const res: IApiResponse = await apiThirdAuthorize({name});

      console.log('lineLogin', res);

      if (res.rspCode === OK_CODE && res.data) {
        // 302跳转
        window.location.href = res.data;
      }
    } catch (err) {
      console.log(err);

      error(t('login_fail'));
    }
  });

  return <Assets.BtnLoginLine onClick={onLogin} />;
};

export default ButtonLineLogin;
