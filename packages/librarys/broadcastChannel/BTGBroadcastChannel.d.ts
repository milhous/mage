/**
 * 声明 - 消息
 * @param {string} type 类型
 * @param {IMessagePayload} payload 数据
 * @param {string} uuid uuid用来判断是否是自己消息源
 * @param {string} token token用来判断是否重复发送消息
 */
declare interface IBTGBroadcastChannelMessage {
    type: string;
    payload: IBTGBroadcastChannelPayload;
    uuid: string;
    token: string;
}

// 声明 - 消息数据
declare interface IBTGBroadcastChannelPayload {
    [key: string]: any;
}

/**
 * 声明 - 消息回调
 */
declare type IBTGBroadcastChannelCallback = (msg: IBTGBroadcastChannelMessage) => void;

/**
 * 声明 - 消息监听集合
 */
declare type IBTGBroadcastChannelMap = Map<string, IBTGBroadcastChannelSet>;

declare type IBTGBroadcastChannelSet = Set<IBTGBroadcastChannelCallback>;

