import {ChannelEventType, LocalStorageKey} from '../config';
import {changeAccount} from '../account';
import * as languages from '../i18n';
import * as timezone from '../timezone';
import {BTGBroadcastChannel} from '../broadcastChannel';

const channel = new BTGBroadcastChannel();

channel.onMessage(msg => {
  const {type, payload} = msg;

  switch (type) {
    case ChannelEventType.ACCOUNT_CHANGE:
      changeAccount(payload.uid, payload.username, payload.email);

      break;
    case ChannelEventType.LANGUAGES_CHANGE:
      languages.changeLang(payload.lang);

      break;
    case ChannelEventType.TIMEZONE_CHANGE:
      timezone.changeTimezone(payload.utc);

      break;
  }
});

/**
 * 切换语言
 * @param {string} lang 语言
 */
export const changeLang = (lang: string) => {
  languages.changeLang(lang);

  channel.postMessage({
    type: ChannelEventType.LANGUAGES_CHANGE,
    payload: {
      lang,
    },
  });
};

/**
 * 切换时区
 * @param {string} utc 时区
 */
export const changeTimezone = (utc: string) => {
  timezone.changeTimezone(utc);

  channel.postMessage({
    type: ChannelEventType.TIMEZONE_CHANGE,
    payload: {
      utc,
    },
  });
};
