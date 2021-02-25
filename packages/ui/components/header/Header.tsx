import React from 'react'

// import {BTGBroadcastChannel} from '@libs/broadcastChannel'
// const channel = new BTGBroadcastChannel('BTGMAIN')
import {Row , Col} from '../grid'

export const Header = () => {
  return (
    <div>
      <Row between="xs">
        <Col>
        <Row start="xs">
          <Col>123</Col>
          <Col>MATCH</Col>
          <Col>MATCH</Col>
          <Col>MATCH</Col>
          <Col>MATCH</Col>
        </Row>
        </Col>
        <Col>123</Col>
      </Row>
    </div>
  )
}
