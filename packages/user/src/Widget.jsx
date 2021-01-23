import React from 'react'
import moment from 'moment'
import styles from './main.scss'

import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

export default function Widget() {
  const [msg, setMsg] = React.useState({})

  React.useEffect(() => {
    channel.onMessage(msg => {
      setMsg(msg)

      console.log('User on message:', msg)
    })

    return () => {
      channel.close()
    }
  }, [])

  return (
    <div className={styles.widget}>
      <h2>App 2 Widget</h2>
      <p>App2 Moment Dep: {moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>msg: {JSON.stringify(msg)}</p>
    </div>
  )
}
