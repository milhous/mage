import {useState, useEffect} from 'react';

import {WalletName, WalletEventType} from '../config';

type IWalletFunc = () => void;

type IWalletEventDetail = {
  name: string;
  address?: string;
};

const useWallet = (props: {name: string}): any => {
  const {name} = props;
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 钱包登录
    const onLogin = ({detail}: any) => {
      if (detail.type === name && !walletState.lock) {
        walletLogin(type);
      }

      if (walletState.name === type) {
        setLoading(true);
      }
    };

    // 取消登录
    const onCanel = (evt: any) => {
      resetWalletState();

      setLoading(false);
    };

    // 钱包更改
    const onChange = (evt: any) => {
      const detail = evt.detail;

      if (detail.type === type) {
        walletChange(type, detail.address);
      }
    };

    // 重置
    const onReset = (evt: any) => {
      resetWalletState();

      setLoading(false);
    };

    window.addEventListener(wallets.walletsEventType.LOGIN, onLogin);
    window.addEventListener(wallets.walletsEventType.LOGIN_CANCEL, onCanel);
    window.addEventListener(wallets.walletsEventType.ACCOUNT_CHANGE, onChange);
    window.addEventListener(wallets.walletsEventType.RESET, onReset);

    return () => {
      resetWalletState();

      window.removeEventListener(wallets.walletsEventType.LOGIN, onLogin);
      window.removeEventListener(wallets.walletsEventType.LOGIN_CANCEL, onCanel);
      window.removeEventListener(wallets.walletsEventType.ACCOUNT_CHANGE, onChange);
      window.removeEventListener(wallets.walletsEventType.RESET, onReset);
    };
  }, []);

  return isLoading;
};
