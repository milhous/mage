<h1 align="center">BroadcastChannel</h1>
<p align="center">
  <strong>应用于同源的不同浏览器窗口，Tab页，frame或者 iframe 下的不同文档之间相互通信</strong>
  <br/>
  <span>+ 对于不兼容的环境采用降级策略，支持的浏览器最低达IE11，不支持Opera Mini</span><br />
</p>

---

将跨页面通讯类比计算机进程间的通讯，web 领域可以实现的技术方案主要是类似于以下两种原理：

- 获取句柄，定向通讯
- 共享内存，结合轮询或者事件通知来完成业务逻辑

对于同源页面，常见的方式包括：

- 广播模式：Broadcast Channe / Service Worker / LocalStorage
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

对于非同源页面，则可以通过嵌入同源 iframe 作为“桥”，由于 iframe 与父页面间可以通过指定 origin 来忽略同源限制，将非同源页面通信转换为同源页面通信。

---

A BroadcastChannel that allows you to send data between different browser-tabs or nodejs-processes.

- It works completely **client-side** and **offline**.
- Tested on **old browsers**, **new browsers**, **WebWorkers**, **Iframes** and **NodeJs**

This behaves similar to the [BroadcastChannel-API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) which is currently only featured in [some browsers](https://caniuse.com/#feat=broadcastchannel).

## Using the BroadcastChannel

```bash
npm install --save broadcast-channel
```

#### Create a channel in one tab/process and send a message.

```js
const { BroadcastChannel } = require("broadcast-channel");
const channel = new BroadcastChannel("foobar");
channel.postMessage("I am not alone");
```

#### Create a channel with the same name in another tab/process and recieve messages.

```js
const { BroadcastChannel } = require("broadcast-channel");
const channel = new BroadcastChannel("foobar");
channel.onmessage = (msg) => console.dir(msg);
// > 'I am not alone'
```

#### Add and remove multiple eventlisteners

```js
const { BroadcastChannel } = require("broadcast-channel");
const channel = new BroadcastChannel("foobar");

const handler = (msg) => console.log(msg);
channel.addEventListener("message", handler);

// remove it
channel.removeEventListener("message", handler);
```

#### Close the channel if you do not need it anymore.

```js
channel.close();
```

#### Set options when creating a channel (optional):

```js
const options = {
    type: 'localstorage', // (optional) enforce a type, oneOf['native', 'idb', 'localstorage', 'node']
    webWorkerSupport: true; // (optional) set this to false if you know that your channel will never be used in a WebWorker (increases performance)
};
const channel = new BroadcastChannel('foobar', options);
```

#### Create a typed channel in typescript:

```typescript
import { BroadcastChannel } from "broadcast-channel";
declare type Message = {
  foo: string;
};
const channel: BroadcastChannel<Message> = new BroadcastChannel("foobar");
channel.postMessage({
  foo: "bar",
});
```

#### Enforce a options globally

When you use this module in a test-suite, it is recommended to enforce the fast `simulate` method on all channels so your tests run faster. You can do this with `enforceOptions()`. If you set this, all channels have the enforced options, no mather what options are given in the constructor.

```typescript
import { enforceOptions } from "broadcast-channel";

// enforce this config for all channels
enforceOptions({
  type: "simulate",
});

// reset the enforcement
enforceOptions(null);
```

#### Clear tmp-folder:

When used in NodeJs, the BroadcastChannel will communicate with other processes over filesystem based sockets.
When you create a huge amount of channels, like you would do when running unit tests, you might get problems because there are too many folders in the tmp-directory. Calling `BroadcastChannel.clearNodeFolder()` will clear the tmp-folder and it is recommended to run this at the beginning of your test-suite.

```typescript
import { clearNodeFolder } from "broadcast-channel";
// jest
beforeAll(async () => {
  const hasRun = await clearNodeFolder();
  console.log(hasRun); // > true on NodeJs, false on Browsers
});
```

```typescript
import { clearNodeFolder } from "broadcast-channel";
// mocha
before(async () => {
  const hasRun = await clearNodeFolder();
  console.log(hasRun); // > true on NodeJs, false on Browsers
});
```

#### Handling IndexedDB onclose events

IndexedDB databases can close unexpectedly for various reasons. This could happen, for example, if the underlying storage is removed or if the user clears the database in the browser's history preferences. Most often we have seen this happen in Mobile Safari. By default, we let the connection close and stop polling for changes. If you would like to continue listening you should close BroadcastChannel and create a new one.

Example of how you might do this:

```typescript
const { BroadcastChannel } = require("broadcast-channel");

let channel;

const createChannel = () => {
  channel = new BroadcastChannel(CHANNEL_NAME, {
    idb: {
      onclose: () => {
        // the onclose event is just the IndexedDB closing.
        // you should also close the channel before creating
        // a new one.
        channel.close();
        createChannel();
      },
    },
  });

  channel.onmessage = (message) => {
    // handle message
  };
};
```

## Methods:

对于不兼容的环境采用降级策略，自动选择合适的方式（ BroadCast Channel -> Service Worker -> IndexedDB -> LocalStorage ），确保各应用之间通讯畅通。

| Method                | Used in                                                                     | Description                                                                                                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **BroadCast Channel** | [Modern Browsers](https://caniuse.com/?search=BroadCast%20Channel)          | 创建一个用于广播的通信频道。当所有页面都监听同一频道的消息时，其中某一个页面通过它发送的消息就会被其他所有页面收到。                                                                                          |
| **Service Worker**    | [Browsers with ServiceWorker](https://caniuse.com/?search=Service%20Worker) | 是一个可以长期运行在后台的 Worker，能够实现与页面的双向通信。多页面的 Service Worker 可以共享，将 Service Worker 作为消息的处理中心即可实现广播效果。                                                         |
| **IndexedDB**         | [Browsers with WebWorkers](https://caniuse.com/?search=IndexedDB)           | 消息发送方将消息存至 IndexedDB 中，接收方（例如所有页面）则通过轮询去获取最新的信息。                                                                                                                         |
| **LocalStorage**      | [Older Browsers](https://caniuse.com/?search=LocalStorage)                  | 当 LocalStorage 变化时，会触发 storage 事件。利用这个特性，可以在发送消息时，把消息写入到某个 LocalStorage 中，然后在各个页面内，通过监听 storage 事件即可收到通知。Safari 隐身模式下无法设置 LocalStorage 值 |

## Using the LeaderElection

This module also comes with a leader-election which can be used so elect a leader between different BroadcastChannels.
For example if you have a stable connection from the frontend to your server, you can use the LeaderElection to save server-side performance by only connecting once, even if the user has opened your website in multiple tabs.

In this example the leader is marked with the crown ♛:
![leader-election.gif](docs/files/leader-election.gif)

Create a channel and an elector.

```js
const { BroadcastChannel, createLeaderElection } = require("broadcast-channel");
const channel = new BroadcastChannel("foobar");
const elector = createLeaderElection(channel);
```

Wait until the elector becomes leader.

```js
const { createLeaderElection } = require("broadcast-channel");
const elector = createLeaderElection(channel);
elector.awaitLeadership().then(() => {
  console.log("this tab is now leader");
});
```

If more than one tab is becoming leader adjust `LeaderElectionOptions` configuration.

```js
const { createLeaderElection } = require("broadcast-channel");
const elector = createLeaderElection(channel, {
  fallbackInterval: 2000, // optional configuration for how often will renegotiation for leader occur
  responseTime: 1000, // optional configuration for how long will instances have to respond
});
elector.awaitLeadership().then(() => {
  console.log("this tab is now leader");
});
```

Let the leader die. (automatically happens if the tab is closed or the process exits).

```js
const elector = createLeaderElection(channel);
await elector.die();
```

## What this is

This module is optimised for:

- **low latency**: When you postMessage on one channel, it should take as low as possible time until other channels recieve the message.
- **lossless**: When you send a message, it should be impossible that the message is lost before other channels recieved it
- **low idle workload**: During the time when no messages are send, there should be a low processor footprint.

## What this is not

- This is not a polyfill. Do not set this module to `window.BroadcastChannel`. This implementation behaves similiar to the [BroadcastChannel-Standard](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) with these limitations:
  - You can only send data that can be `JSON.stringify`-ed.
  - While the offical API emits [onmessage-events](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel/onmessage), this module directly emitts the data which was posted
- This is not a replacement for a message queue. If you use this in NodeJs and want send more than 50 messages per second, you should use proper [IPC-Tooling](https://en.wikipedia.org/wiki/Message_queue)

## Browser Support

I have tested this in all browsers that I could find. For ie8 and ie9 you must transpile the code before you can use this. If you want to know if this works with your browser, [open the demo page](https://pubkey.github.io/broadcast-channel/e2e.html).

## Thanks

Thanks to [Hemanth.HM](https://github.com/hemanth) for the module name.
