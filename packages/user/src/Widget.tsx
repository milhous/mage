import React from 'react';
import moment from 'moment';
import styles from './widget.less';

import { BTGBroadcastChannel } from '@libs/broadcastChannel';

const channel = new BTGBroadcastChannel('channelTest');

const postmessage = channel => {
  const random = Math.random().toFixed(2);
  const txt = `ID:${random} User Widget hello world!`;

  channel.postMessage({
    type: 'test',
    payload: txt,
  });
};

export default function Widget() {
  const [msg, setMsg] = React.useState({});
  const messageHandler = React.useCallback(msg => {
    setMsg(msg);
  }, []);

  React.useEffect(() => {
    channel.addEventListener('test', messageHandler);

    return () => {
      channel.removeEventListener('test', messageHandler);
    };
  }, [messageHandler]);

  return (
    <div className={styles.widget}>
      <h2>App 2 Widget</h2>
      <p>App2 Moment Dep: {moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
      <button
        onClick={() => {
          postmessage(channel);
        }}
      >
        Post Message
      </button>
      <button
        onClick={() => {
          channel.close();

          setMsg('close channel');
        }}
      >
        close channel
      </button>
      <button
        onClick={() => {
          channel.removeEventListener('test', messageHandler);

          setMsg('remove EventListener');
        }}
      >
        remove EventListener
      </button>
      <p>receive message: {JSON.stringify(msg)}</p>
    </div>
  );
}
