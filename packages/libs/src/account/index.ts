import {useState, useEffect} from 'react';

import {CustomEventType} from '../config';

/**
 * 用户信息
 * @param {number} uid 用户ID
 * @param {string} username 用户名称
 * @param {string} email 邮箱
 * @param {boolean} isLogin 是否登录
 */
interface IAccountInfo {
  uid: number | null;
  username: string;
  email: string;
  isLogin: boolean;
}

const account: IAccountInfo = {
  uid: null,
  username: '',
  email: '',
  isLogin: false,
};

// 获取当前账户
const getCurAccount = (): IAccountInfo => {
  return account;
};

/**
 * 切换账户
 * @param {string} timezone 时区
 */
export const changeAccount = (uid: number, username: string, email: string): void => {
  if (!!uid && !!username && !!email) {
    account.uid = uid;
    account.username = username;
    account.email = email;
    account.isLogin = true;
  } else {
    account.uid = null;
    account.username = '';
    account.email = '';
    account.isLogin = false;
  }

  window.dispatchEvent(new CustomEvent(CustomEventType.ACCOUNT_CHANGE, {detail: account}));
};

// hook - 账户
export const useAccount = () => {
  const [account, setAccount] = useState(getCurAccount());

  useEffect(() => {
    const onAccount: EventListener = ({detail}: any) => {
      setAccount(detail);
    };

    window.addEventListener(CustomEventType.ACCOUNT_CHANGE, onAccount);

    return () => window.removeEventListener(CustomEventType.ACCOUNT_CHANGE, onAccount);
  }, []);

  return account;
};
