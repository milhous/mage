/**
 * 钱包名称
 * @property BINANCE 币安
 * @property META_MASK 狐狸
 * @property TRON_LINK 波场
 */
export const WalletName: IWalletName = {
  BINANCE: 'binance_chain_wallet',
  META_MASK: 'metamask',
  TRON_LINK: 'tronlink',
};

/**
 * 事件类型
 * @property LOGIN 登录
 * @property CANCEL 取消登录
 * @property RESET 重置
 * @property CHANGE 账户更换
 */
export const WalletEventType: IWalletEventType = {
  LOGIN: 'WALLETS_LOGIN',
  LOGIN_CANCEL: 'WALLETS_LOGIN_CANCEL',
  RESET: 'WALLETS_RESET',
  ACCOUNT_CHANGE: 'WALLETS_ACCOUNT_CHANGE',
};
