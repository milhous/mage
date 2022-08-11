import {useThrottle} from '@libs/hooks';
import wallets from '@libs/wallets';
import analytics from '@libs/analytics';

import Assets from '@app/auth/assets';

const {WalletName, WalletEventType, useWallets} = wallets;

// TronLink Login
const ButtonTronLinkLogin = (): JSX.Element => {
  const isLoading = useWallets({name: WalletName.TRON_LINK});

  const onClick = useThrottle((): void => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.TRON_LINK,
    });

    if (isLoading) {
      return;
    }

    window.dispatchEvent(new CustomEvent(WalletEventType.LOGIN, {detail: {name: WalletName.TRON_LINK}}));
  });

  return (
    <div className={isLoading ? 'walletLoginBtn loading' : 'walletLoginBtn'} onClick={onClick}>
      <Assets.BtnTronLink />
    </div>
  );
};

export default ButtonTronLinkLogin;
