<h1 align="center">BTGBroadcastChannel</h1>
<p align="center">
  <strong>仅支持同源的不同浏览器窗口，Tab页，frame或者 iframe 下的不同文档之间相互通信</strong>
  <br/>
  <span>+ 对于不兼容的环境采用降级策略，支持的浏览器最低达IE11，不支持Opera Mini</span><br />
</p>

---

web 领域可以实现的技术方案主要是类似于以下两种原理：

- 获取句柄，定向通讯
- 共享内存，结合轮询或者事件通知来完成业务逻辑

对于同源页面，常见的方式包括：

- 广播模式：Broadcast Channel / Service Worker / LocalStorage
- 共享存储模式：Shared Worker / IndexedDB / cookie
- 口口相传模式：window.open + window.opener
- 基于服务端：Websocket / Comet / SSE 等

对于非同源页面，则可以通过嵌入同源 iframe 作为“桥”，由于 iframe 与父页面间可以通过指定 origin 来忽略同源限制，将非同源页面通信转换为同源页面通信。

---

## 如何使用 BTGBroadcastChannel

```js
import { BTGBroadcastChannel } from "@libs/broadcastChannel";
```

#### 在应用中创建频道 && 发送消息

消息数据格式类似 Redux Action，由 type（消息类型）和 payload（消息数据）组成。在监听事件根据 type 进行数据分发。

```js
import { BTGBroadcastChannel } from "@libs/broadcastChannel";

const channel = new BTGBroadcastChannel("channelTest");
channel.postMessage({
  type: "test",
  payload: { txt: "Hello, world!" },
});
```

#### 在另外一个应用中创建相同名称频道 & 接收消息

```js
import { BTGBroadcastChannel } from "@libs/broadcastChannel";

const channel = new BroadcastChannel("channelTest");

channel.onMessage((msg) => {
  console.log(msg);
});

// > { type: "test", payload: { txt: "Hello, world!" } }
```

#### 新增 & 移除 消息监听

```js
import { BTGBroadcastChannel } from "@libs/broadcastChannel";

const channel = new BroadcastChannel("channelTest");
const handler = (msg) => console.log(msg);

// add ite
channel.addEventListener("test", handler);

// remove it
channel.removeEventListener("test", handler);
```

#### 关闭频道

```js
channel.close();
```

#### 设置配置

ttl - 消息存活时间（Time To Live），默认 30 s，仅在 IndexedDB 方式中有效。

loop - 轮询间隔时间，默认 150 ms，仅在 IndexedDB 方式中有效。

throttle - 发送节流时间，默认 200 ms，在该时间内，同类型的消息会被最新的覆盖。

```js
const options = {
  ttl: 1000 * 30,
  loop: 150,
  throttle: 200,
};
const channel = new BroadcastChannel("test", options);
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
