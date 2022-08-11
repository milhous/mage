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
 * hook属性
 * @property name 钱包名称
 * @property onLogin 钱包登录
 * @property onCancel 取消登录
 * @property onChange 钱包更改
 * @property onReset 钱包重置
 */
interface IWalletsProps {
  name: string;
  onLogin?: (name: string) => void;
  onCancel?: () => void;
  onChange?: (name: string, address: string) => void;
  onReset?: () => void;
}

/**
 * 声明 - 钱包管理
 * @property {IWalletName} WalletName 钱包名称
 * @property {IWalletEventType}  WalletEventType 钱包事件
 * @property {(props: IWalletsProps) => boolean}  useWallets 钱包hook
 * @method canBeUsed 指定钱包是否可使用
 * @method getAddress 获取钱包地址
 * @method getSignature 获取钱包签名
 */
declare interface IWallets {
  WalletName: IWalletName;
  WalletEventType: IWalletEventType;
  useWallets: (props: IWalletsProps) => boolean;

  canBeUsed(name: string): boolean;
  getAddress(name: string): Promise<string>;
  getSignature(name: string, message: string, address: string): Promise<string>;
}
