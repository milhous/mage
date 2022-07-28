/**
 * UI类型
 * @property TOOLBAR 工具栏
 * @property HEADER 头部
 * @property FOOTER 底部
 * @property LANGUAGES 语言
 * @property TIMEZONE 时区
 */
export enum UIType {
  TOOLBAR = 0,
  HEADER,
  FOOTER,
  LANGUAGES,
  TIMEZONE,
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
 */
export const CustomEventType = {
  ACCOUNT_CHANGE: 'customAccountChange',
  LANGUAGES_CHANGE: 'customLanguagesChange',
  TIMEZONE_CHANGE: 'customTimezoneChange',
  CURRENCY_CHANGE: 'customCurrencyChange',
};

/**
 * LocalStorage Key
 * @property TIMEZONE 时区
 */
export const LocalStorageKey = {
  TIMEZONE: 'timezone',
};
