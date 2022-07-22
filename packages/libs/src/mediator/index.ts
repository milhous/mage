import {ChannelEventType, LocalStorageKey} from '../types';
import {changeLang} from '../i18n';
import {changeTimezone} from '../timezone';
import {BTGBroadcastChannel} from '../broadcastChannel';

const channel = new BTGBroadcastChannel();

channel.onMessage(msg => {
  const {type, payload} = msg;

  switch (type) {
    case ChannelEventType.LANGUAGES_CHANGE:
      changeLang(payload.val);

      break;
    case ChannelEventType.TIMEZONE_CHANGE:
      changeTimezone(payload.val);

      break;
  }
});
