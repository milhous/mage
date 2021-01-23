import LocalButton from '@app/Widget'
import React from 'react'
import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

setTimeout(() => {
  channel.postMessage({
    type: 'test',
    payload: `User say hello world!`,
  })
}, 1000)

const App = () => (
  <div>
    <h1>Dynamic System Host</h1>
    <h2>App User</h2>
    <LocalButton />
  </div>
)

export default App
