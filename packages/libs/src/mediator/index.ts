import {ChannelEventType, LocalStorageKey} from '../config';
import {changeAccount} from '../account';
import * as languages from '../i18n';
import * as timezone from '../timezone';
import * as modal from '../modal';
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
    case ChannelEventType.MODAL_SHOW:
      modal.showModal(payload.type, payload.data);

      break;
    case ChannelEventType.MODAL_CLOSE:
      modal.closeModal(payload.type);

      break;
  }
});

/**
 * 切换语言
 * @param {string} lang 语言
 */
export const changeLang = (lang: string): void => {
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
export const changeTimezone = (utc: string): void => {
  timezone.changeTimezone(utc);

  channel.postMessage({
    type: ChannelEventType.TIMEZONE_CHANGE,
    payload: {
      utc,
    },
  });
};

/**
 * 显示弹层
 * @param {number} type 类型
 * @param {string} data 数据
 */
export const showModal = (type: number, data?: any): void => {
  modal.showModal(type, data);
};

/**
 * 关闭弹层
 * @param {number} type 类型
 */
export const closeModal = (type: number): void => {
  modal.closeModal(type);
};
