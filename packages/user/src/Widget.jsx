import React from 'react'
import moment from 'moment'
import styles from './main.scss'

export default function Widget() {
  return (
    <div className={styles.widget}>
      <h2>App 2 Widget</h2>
      <p>App2 Moment Dep: {moment().format('MMMM Do YYYY, h:mm:ss a')}</p>
    </div>
  )
}
