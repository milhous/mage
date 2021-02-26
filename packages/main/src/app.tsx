import React from 'react'
import '@ui/styles/reset.less'

import {Footer} from '@ui/components'

import '@libs/flexible'
import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('BTGMAIN')

const app = () => {
  return (
    <div>
      <Footer />
    </div>
  )
}

export default app
