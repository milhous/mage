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
    public postMessage(msg: IMessage): void {
        this._channel.postMessage(msg);
    }

    /**
     * 监听消息
     * @param {IMessageCallback} fn 回调
     */
    public onMessage(fn: IMessageCallback): void {
        this._channel.onMessage(fn);
    }

    /**
     * 关闭
     */
    public close(): void {
        this._channel.close();
    }

    /**
     * 新增监听
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public addEventListener(type: string, handler: IMessageCallback): void {

    }

    /**
     * 新增监听 
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public removeEventListener(type: string, handler: IMessageCallback): void {

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
    }
}