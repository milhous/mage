/**
 * 获取配置信息
 * @param {object} originalOptions 配置信息
 * @return {IBTGBroadcastChannelOptions}
 */
export function fillOptionsWithDefaults(originalOptions: any = {}): IBTGBroadcastChannelOptions {
  const options = JSON.parse(JSON.stringify(originalOptions));

  // 消息存活时间（Time To Live）
  if (!('ttl' in options)) {
    options.ttl = 1000 * 30;
  }

  // 轮询间隔时间
  if (!('loop' in options)) {
    options.loop = 100;
  }

  // 发送节流时间
  if (!('throttle' in options)) {
    options.throttle = 100;
  }

  return options;
}
