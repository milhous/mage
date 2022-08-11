import {useThrottle} from '@libs/hooks';
import wallets from '@libs/wallets';
import analytics from '@libs/analytics';

import Assets from '@app/auth/assets';

const {WalletName, WalletEventType, useWallets} = wallets;

// MetaMask Login
const ButtonMetaMaskLogin = (): JSX.Element => {
  const isLoading = useWallets({name: WalletName.META_MASK});

  const onClick = useThrottle((): void => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.META_MASK,
    });

    if (isLoading) {
      return;
    }

    window.dispatchEvent(new CustomEvent(WalletEventType.LOGIN, {detail: {name: WalletName.META_MASK}}));
  });

  return (
    <div className={isLoading ? 'walletLoginBtn loading' : 'walletLoginBtn'} onClick={onClick}>
      <Assets.BtnMetamask />
    </div>
  );
};

export default ButtonMetaMaskLogin;
