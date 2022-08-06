/**
 * 投注类型
 * @property ACCOUNT 账户投注
 * @property CONTRACT 合约投注
 */
export enum BetType {
  ACCOUNT,
  CONTRACT,
}

/**
 * UI类型
 * @property TOOLBAR 工具栏
 * @property HEADER 头部
 * @property FOOTER 底部
 * @property LANGUAGES 语言
 * @property TIMEZONE 时区
 * @property AUTH 授权
 */
export enum UIType {
  TOOLBAR,
  HEADER,
  FOOTER,
  LANGUAGES,
  TIMEZONE,
  AUTH,
}

/**
 * UI授权类型
 * @property NONE 无
 * @property LOGIN 登录
 * @property SIGN_UP 注册
 * @property EMAIL_ACT 邮箱激活
 * @property FORGET_PASSWORD 忘记密码
 * @property BINDING 绑定邮箱
 * @property MERGE 合并邮箱
 * @property GOOGLE_AUTHENTICATOR 谷歌验证
 * @property GOOGLE_HELP 谷歌帮助
 */
export enum ModalType {
  NONE,
  LOGIN,
  SIGN_UP,
  EMAIL_ACT,
  FORGET_PASSWORD,
  BINDING,
  MERGE,
  GOOGLE_AUTHENTICATOR,
  GOOGLE_HELP,
}

/**
 * 钱包类型
 * @property METAMASK 狐狸
 * @property BINANCE_CHAIN_WALLET 币安
 * @property TRONLINK 波场
 */
export const WalletType = {
  METAMASK: 'metamask',
  BINANCE_CHAIN_WALLET: 'binance_chain_wallet',
  TRONLINK: 'tronlink',
};

/**
 * 频道事件类型
 * @property ACCOUNT_CHANGE 账户改变
 * @property LANGUAGES_CHANGE 语言改变
 * @property TIMEZONE_CHANGE 时区改变
 * @property CURRENCY_CHANGE 币种改变
 * @property MODAL_SHOW 弹层显示
 * @property MODAL_CLOSE 弹层关闭
 */
export const ChannelEventType = {
  ACCOUNT_CHANGE: 'channelAccountChange',
  LANGUAGES_CHANGE: 'channelLanguagesChange',
  TIMEZONE_CHANGE: 'channelTimezoneChange',
  CURRENCY_CHANGE: 'channelCurrencyChange',
  MODAL_SHOW: 'channelModalShow',
  MODAL_CLOSE: 'channelModalClose',
};

/**
 * 自定义事件类型
 * @property ACCOUNT_CHANGE 账户改变
 * @property LANGUAGES_CHANGE 语言改变
 * @property TIMEZONE_CHANGE 时区改变
 * @property CURRENCY_CHANGE 币种改变
 * @property MODAL_SHOW 弹层显示
 * @property MODAL_CLOSE 弹层关闭
 * @property BET_TYPE_CHANGE 投注类型改变
 */
export const CustomEventType = {
  ACCOUNT_CHANGE: 'customAccountChange',
  LANGUAGES_CHANGE: 'customLanguagesChange',
  TIMEZONE_CHANGE: 'customTimezoneChange',
  CURRENCY_CHANGE: 'customCurrencyChange',
  MODAL_SHOW: 'customModalShow',
  MODAL_CLOSE: 'customModalClose',
  BET_TYPE_CHANGE: 'customBetTypeChange',
};

/**
 * LocalStorage Key
 * @property TIMEZONE 时区
 */
export const LocalStorageKey = {
  TIMEZONE: 'timezone',
};

/**
 * Cookies Key
 * @property ACCESS_TOKEN 用户令牌
 * @property ACCESS_TOKEN_EXPIRES 用户令牌有效期
 * @property REFRESH_TOKEN 刷新令牌
 * @property REFRESH_TOKEN_EXPIRES 刷新令牌有效期
 * @property WALLET_TYPE 钱包类型
 * @property WALLET_ADDRESS 钱包地址
 * @property SHARE_INVITE_CODE 邀请码
 */
export const CookiesKey = {
  ACCESS_TOKEN: 'access_token',
  ACCESS_TOKEN_EXPIRES: 'access_token_expires',
  REFRESH_TOKEN: 'refresh_token',
  REFRESH_TOKEN_EXPIRES: 'refresh_token_expires',
  WALLET_TYPE: 'wallet_type',
  WALLET_ADDRESS: 'wallet_address',
  SHARE_INVITE_CODE: 'share_invite_code',
};
