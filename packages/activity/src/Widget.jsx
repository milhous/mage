import React, {userState} from 'react'
import moment from 'moment'

import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const postmessage = channel => {
  const random = Math.random().toFixed(2)
  const txt = `ID:${random} Activity Widget hello world!`

  channel.postMessage({
    type: 'test',
    payload: txt,
  })
}

export default function Widget() {
  const [channel, setChannel] = React.useState(null)
  const [msg, setMsg] = React.useState({})

  React.useEffect(() => {
    const channel = new BTGBroadcastChannel('channelTest')

    channel.onMessage(msg => {
      setMsg(msg)
    })

    setChannel(channel)

    return () => {
      channel.close()
    }
  }, [])

  return (
    <div
      style={{
        borderRadius: '4px',
        padding: '2em',
        backgroundColor: 'purple',
        color: 'white',
      }}>
      <h2>App 3 Widget</h2>
      <p>
        Using <strong>momentjs</strong> for format the date
      </p>
      <p>{moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
      <button
        onClick={() => {
          postmessage(channel)
        }}>
        Post Message
      </button>
      <button
        onClick={() => {
          channel.close()
        }}>
        close channel
      </button>
      <p>receive message: {JSON.stringify(msg)}</p>
    </div>
  )
}
