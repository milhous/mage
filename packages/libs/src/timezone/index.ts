import {LocalStorageKey} from '../types';

// 时区配置
export const TimeZoneConfigs = {
  'UTC-12:00': -12,
  'UTC-11:00': -11,
  'UTC-10:00': -10,
  'UTC-09:30': -9.5,
  'UTC-09:00': -9,
  'UTC-08:00': -8,
  'UTC-07:00': -7,
  'UTC-06:00': -6,
  'UTC-05:00': -5,
  'UTC-04:00': -4,
  'UTC-03:00': -3,
  'UTC-02:30': -2.5,
  'UTC-02:00': -2,
  'UTC-01:00': -1,
  'UTC+00:00': 0,
  'UTC+01:00': 1,
  'UTC+02:00': 2,
  'UTC+03:00': 3,
  'UTC+04:00': 4,
  'UTC+04:30': 4.5,
  'UTC+05:00': 5,
  'UTC+05:30': 5.5,
  'UTC+05:45': 5.75,
  'UTC+06:00': 6,
  'UTC+06:30': 6.5,
  'UTC+07:00': 7,
  'UTC+08:00': 8,
  'UTC+08:45': 8.75,
  'UTC+09:00': 9,
  'UTC+09:30': 9.5,
  'UTC+10:00': 10,
  'UTC+10:30': 10.5,
  'UTC+11:00': 11,
  'UTC+12:00': 12,
  'UTC+12:45': 12.75,
  'UTC+13:00': 13,
  'UTC+14:00': 14,
};

/**
 * 获取客户端时区
 * @returns {string}
 */
export const getClientTimezone = (): string => {
  const offset = new Date().getTimezoneOffset();
  const o = Math.abs(offset);

  return 'UTC' + (offset < 0 ? '+' : '-') + ('00' + Math.floor(o / 60)).slice(-2) + ':' + ('00' + (o % 60)).slice(-2);
};

/**
 * 获取时区
 * @returns {string}
 */
export const getCurTimezone = (): string => {
  return (typeof window !== 'undefined' && window.localStorage?.timezone) || getClientTimezone();
};

/**
 * 切换时区
 * @param {string} timezone 时区
 */
export const changeTimezone = (timezone: string): void => {
  window.localStorage?.setItem(LocalStorageKey.TIMEZONE, timezone);
};
