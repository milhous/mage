import React from 'react'

import {BTGBroadcastChannel} from '@libs/broadcastChannel'

const channel = new BTGBroadcastChannel('channelTest')

const postmessage = () => {
  const random = Math.random().toFixed(2)
  const txt = `ID:${random} Point App hello world!`

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

function loadComponent(scope, module) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default')
    const container = window[scope] // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default)
    const factory = await window[scope].get(module)
    const Module = factory()
    return Module
  }
}

const useDynamicScript = args => {
  const [ready, setReady] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  React.useEffect(() => {
    if (!args.url) {
      return
    }

    const element = document.createElement('script')

    element.src = args.url
    element.type = 'text/javascript'
    element.async = true

    setReady(false)
    setFailed(false)

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`)
      setReady(true)
    }

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`)
      setReady(false)
      setFailed(true)
    }

    document.head.appendChild(element)

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`)
      document.head.removeChild(element)
    }
  }, [args.url])

  return {
    ready,
    failed,
  }
}

function System({system = {}}) {
  const {ready, failed} = useDynamicScript({
    url: system && system.url,
  })

  if (!system) {
    return <h2>Not system specified</h2>
  }

  if (!ready) {
    return <h2>Loading dynamic script: {system.url}</h2>
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {system.url}</h2>
  }

  const Component = React.lazy(loadComponent(system.scope, system.module))

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  )
}

function App() {
  const [system, setSystem] = React.useState(undefined)

  function setApp2() {
    setSystem({
      url: 'http://localhost:9002/remoteEntry.js',
      scope: 'user',
      module: './Widget',
    })
  }

  function setApp3() {
    setSystem({
      url: 'http://localhost:9003/remoteEntry.js',
      scope: 'activity',
      module: './Widget',
    })
  }

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
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}>
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and <strong>exposes</strong>.
        It will no load components that have been loaded already.
      </p>
      <button onClick={postmessage}>Post Message</button>
      <button onClick={postmessageB}>Post Message B</button>
      <p>receive message: {JSON.stringify(msg)}</p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{marginTop: '2em'}}>
        <System system={system} />
      </div>
    </div>
  )
}

export default App
