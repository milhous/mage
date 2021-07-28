import Widget from '@app/Widget';
import React from 'react';
import '@libs/flexible';
import { BTGBroadcastChannel } from '@libs/broadcastChannel';
import contract from '@app/assets/contract.svg';
import SVG from 'react-inlinesvg';

import styles from './main.less';

const channel = new BTGBroadcastChannel('channelTest');

const postmessage = () => {
  const random = Math.random().toFixed(2);
  const txt = `ID:${random} User App hello world!`;

  channel.postMessage({
    type: 'test',
    payload: txt,
  });
};

const App = () => {
  const [msg, setMsg] = React.useState({});

  React.useEffect(() => {
    channel.onMessage(msg => {
      setMsg(msg);
    });

    return () => {
      channel.close();
    };
  }, []);

  return (
    <div>
      <h1>Dynamic System Host</h1>
      <h2>App User</h2>
      <button onClick={postmessage}>Post Message</button>
      <p>receive message: {JSON.stringify(msg)}</p>
      <Widget />
      <div className={styles.svg}></div>
      <SVG src={contract} />
    </div>
  );
};

export default App;
