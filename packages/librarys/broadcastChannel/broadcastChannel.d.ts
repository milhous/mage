/**
 * 声明 - 消息
 * @param {string} type 类型
 * @param {IMessagePayload} payload 数据
 */
declare interface IMessage {
    type: string;
    payload: IMessagePayload;
}

// 声明 - 消息数据
declare interface IMessagePayload {
    [key: string]: any;
}

/**
 * 声明 - 消息回调
 */
declare type IMessageCallback = (msg: IMessage) => void;
