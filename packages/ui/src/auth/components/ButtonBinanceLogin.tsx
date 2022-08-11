import {useThrottle} from '@libs/hooks';
import wallets from '@libs/wallets';
import analytics from '@libs/analytics';

import Assets from '@app/auth/assets';

const {WalletName, WalletEventType, useWallets} = wallets;

// Binance Login
const ButtonBinanceLogin = (): JSX.Element => {
  const isLoading = useWallets({name: WalletName.BINANCE});

  const onClick = useThrottle((): void => {
    analytics.customEvent('Login_socialMediaLogin', {
      desc: '点击登录弹窗联合登录按钮',
      type: analytics.loginType.BINANCE,
    });

    if (isLoading) {
      return;
    }

    window.dispatchEvent(new CustomEvent(WalletEventType.LOGIN, {detail: {name: WalletName.BINANCE}}));
  });

  return (
    <div className={isLoading ? 'walletLoginBtn loading' : 'walletLoginBtn'} onClick={onClick}>
      <Assets.BtnBinance />
    </div>
  );
};

export default ButtonBinanceLogin;
