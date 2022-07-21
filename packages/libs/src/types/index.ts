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
 * @property LANGUAGES_CHANGE 语言改变
 * @property TIMEZONE_CHANGE 时区改变
 * @property CURRENCY_CHANGE 币种改变
 */
export const ChannelEventType = {
  LANGUAGES_CHANGE: 'languagesChange',
  TIMEZONE_CHANGE: 'timezoneChange',
  CURRENCY_CHANGE: 'currencyChange',
};
