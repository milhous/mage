import LocalButton from './Widget'
import React from 'react'
import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

const postmessage = () => {
  const random = Math.random().toFixed(2)
  const txt = `ID:${random} Activity App hello world!`

  channel.postMessage({
    type: 'test',
    payload: txt,
  })
}

const postmessageB = () => {
  const random = Math.random().toFixed(2)
  const txt = `ID:${random} Point App hello world B!`

  channel.postMessage({
    type: 'testb',
    payload: txt,
  })
}

const App = () => {
  const [msg, setMsg] = React.useState({})

  React.useEffect(() => {
    channel.onMessage(msg => {
      setMsg(msg)
    })

    return () => {
      channel.close()
    }
  }, [])

  return (
    <div>
      <h1>Dynamic System Host</h1>
      <h2>App User</h2>
      <button onClick={postmessage}>Post Message</button>
      <button onClick={postmessageB}>Post Message B</button>
      <p>receive message: {JSON.stringify(msg)}</p>
      <LocalButton />
    </div>
  )
}

export default App
