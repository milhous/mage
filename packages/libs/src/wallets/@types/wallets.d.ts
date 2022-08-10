/**
 * 钱包名称
 * @property BINANCE 币安
 * @property META_MASK 狐狸
 * @property TRON_LINK 波场
 */
type IWalletName = {
  BINANCE: 'binance_chain_wallet';
  META_MASK: 'metamask';
  TRON_LINK: 'tronlink';
};

/**
 * 事件类型
 * @property LOGIN 登录
 * @property CANCEL 取消登录
 * @property RESET 重置
 * @property CHANGE 账户更换
 */
type IWalletEventType = {
  LOGIN: 'WALLETS_LOGIN';
  LOGIN_CANCEL: 'WALLETS_LOGIN_CANCEL';
  RESET: 'WALLETS_RESET';
  ACCOUNT_CHANGE: 'WALLETS_ACCOUNT_CHANGE';
};

/**
 * 声明 - 钱包管理
 * @method canBeUsed 指定钱包是否可使用
 * @method getAddress 获取钱包地址
 * @method getSignature 获取钱包签名
 */
declare interface IWallets {
  // 钱包名称
  WalletName: IWalletName;
  // 钱包事件
  WalletEventType: IWalletEventType;
  canBeUsed(name: string): boolean;
  getAddress(name: string): Promise<string>;
  getSignature(name: string, message: string, address: string): Promise<string>;
}
