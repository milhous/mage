import {ChannelEventType} from '../types';
import {changeLang} from '../i18n';
import {BTGBroadcastChannel} from '../broadcastChannel';

const channel = new BTGBroadcastChannel();

channel.onMessage(msg => {
  const {type, payload} = msg;

  switch (type) {
    case ChannelEventType.LANGUAGES_CHANGE:
      changeLang(payload.val);

      break;
  }
});
