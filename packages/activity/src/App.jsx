import LocalButton from './Widget'
import React from 'react'

import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

setTimeout(() => {
  channel.postMessage({
    type: 'test',
    payload: `Activity say hello world!`,
  })
}, 1000)

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App Activity</h2>
    <LocalButton />
  </div>
)

export default App
