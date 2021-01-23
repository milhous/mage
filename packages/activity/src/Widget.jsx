import React, {userState} from 'react'
import moment from 'moment'

import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

export default function Widget() {
  const [msg, setMsg] = React.useState({})

  React.useEffect(() => {
    channel.onMessage(msg => {
      setMsg(msg)

      console.log('Activity on message:', msg)
    })

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
      <p>msg: {JSON.stringify(msg)}</p>
    </div>
  )
}
