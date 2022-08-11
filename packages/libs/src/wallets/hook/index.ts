import {useState, useEffect} from 'react';

import {WalletEventType} from '../config';

// 钱包 hook
const useWallets = (props: IWalletsProps): boolean => {
  const {name, onLogin, onCancel, onChange, onReset} = props;
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // 钱包登录
    const handleLogin = ({detail}: any) => {
      if (detail.name === name) {
        !!onLogin && onLogin(name);

        setLoading(true);
      }
    };

    // 取消登录
    const handleCanel = (evt: any) => {
      !!onCancel && onCancel();

      setLoading(false);
    };

    // 钱包更改
    const handleChange = (evt: any) => {
      const detail = evt.detail;

      if (detail.name === name) {
        !!onChange && onChange(name, detail.address);

        setLoading(false);
      }
    };

    // 钱包重置
    const handleReset = (evt: any) => {
      !!onReset && onReset();

      setLoading(false);
    };

    window.addEventListener(WalletEventType.LOGIN, handleLogin);
    window.addEventListener(WalletEventType.LOGIN_CANCEL, handleCanel);
    window.addEventListener(WalletEventType.ACCOUNT_CHANGE, handleChange);
    window.addEventListener(WalletEventType.RESET, handleReset);

    return () => {
      !!onReset && onReset();

      window.removeEventListener(WalletEventType.LOGIN, handleLogin);
      window.removeEventListener(WalletEventType.LOGIN_CANCEL, handleCanel);
      window.removeEventListener(WalletEventType.ACCOUNT_CHANGE, handleChange);
      window.removeEventListener(WalletEventType.RESET, handleReset);
    };
  }, []);

  return isLoading;
};

export default useWallets;
