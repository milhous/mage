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
  TOOLBAR = 0,
  HEADER,
  FOOTER,
  LANGUAGES,
  TIMEZONE,
  AUTH,
}

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
 * 频道事件类型
 * @property ACCOUNT_CHANGE 账户改变
 * @property LANGUAGES_CHANGE 语言改变
 * @property TIMEZONE_CHANGE 时区改变
 * @property CURRENCY_CHANGE 币种改变
 */
export const ChannelEventType = {
  ACCOUNT_CHANGE: 'channelAccountChange',
  LANGUAGES_CHANGE: 'channelLanguagesChange',
  TIMEZONE_CHANGE: 'channelTimezoneChange',
  CURRENCY_CHANGE: 'channelCurrencyChange',
};

/**
 * 自定义事件类型
 * @property ACCOUNT_CHANGE 账户改变
 * @property LANGUAGES_CHANGE 语言改变
 * @property TIMEZONE_CHANGE 时区改变
 * @property CURRENCY_CHANGE 币种改变
 * @property BET_TYPE_CHANGE 投注类型改变
 */
export const CustomEventType = {
  ACCOUNT_CHANGE: 'customAccountChange',
  LANGUAGES_CHANGE: 'customLanguagesChange',
  TIMEZONE_CHANGE: 'customTimezoneChange',
  CURRENCY_CHANGE: 'customCurrencyChange',
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
