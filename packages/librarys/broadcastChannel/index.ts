import { chooseMethod } from './methodChooser';

export class BTGBroadcastChannel {
    static VERSION = '1.0.0';

    // 频道名称
    private _name: string = '';
    // 频道
    private _channel: any = null;

    /**
     * @param {string} name 频道名称
     */
    constructor(name: string) {
        this._create(name);
    }

    /**
     * 发送消息
     * @param {IMessage} msg 消息
     */
    public postMessage(msg: IBTGBroadcastChannelMessage): void {
        !!this._channel && this._channel.postMessage(msg);
    }

    /**
     * 监听消息
     * @param {IMessageCallback} fn 回调
     */
    public onMessage(fn: IBTGBroadcastChannelCallback): void {
        !!this._channel && this._channel.onMessage(fn);
    }

    /**
     * 关闭
     */
    public close(): void {
        !!this._channel && this._channel.close();
    }

    /**
     * 新增监听
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public addEventListener(type: string, handler: IBTGBroadcastChannelCallback): void {
        !!this._channel && this._channel.addEventListener(type, handler);
    }

    /**
     * 新增监听 
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public removeEventListener(type: string, handler: IBTGBroadcastChannelCallback): void {
        !!this._channel && this._channel.removeEventListener(type, handler);
    }

    /**
     * 创建
     * @param {string} channelName 频道名称
     */
    private _create(channelName: string): void {
        if (typeof channelName !== 'string' || channelName === '') {
            return;
        }

        this._name = channelName;
        const method = chooseMethod();

        if (!!method) {
            this._channel = new method(this._name);
        }

        console.log('BTGBroadcastChannel method:', method.type);
    }
}