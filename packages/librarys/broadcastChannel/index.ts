import { chooseMethod } from './methodChooser';
import { fillOptionsWithDefaults } from './options';


export class BTGBroadcastChannel {
    static VERSION = '1.0.0';

    // 频道名称
    private _name: string = '';
    // 配置信息
    private _options: IBTGBroadcastChannelOptions = null;
    // 频道
    private _channel: any = null;
    // 起始时间
    private _time: number = null;
    // messages集合
    private _messagesMap: Map<string, IBTGBroadcastChannelMessage> = new Map();

    /**
     * @param {string} name 频道名称
     * @param {object} options 配置信息
     */
    constructor(name: string, options: any = {}) {
        this._name = name;
        this._options = fillOptionsWithDefaults(options);

        this._create();
    }

    /**
     * 发送消息
     * @param {IMessage} msg 消息
     */
    public postMessage(msg: IBTGBroadcastChannelMessage): void {
        if (this._channel === null) {
            return;
        }

        if (this._messagesMap.size === 0) {
            window.requestAnimationFrame(this._loop.bind(this));
        }

        this._messagesMap.set(msg.type, msg);
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

    // 创建
    private _create(): void {
        if (typeof this._name !== 'string' || this._name === '') {
            return;
        }

        const method = chooseMethod();

        if (!!method) {
            this._channel = new method();
            this._channel.init(this._name, this._options);
        }

        console.log('BTGBroadcastChannel method:', method.type, this._options);
    }

    /**
     * 循环
     * @param {number} timestamp 时间戳
     */
    private _loop(timestamp: number): void {
        if (this._time === null) {
            this._time = timestamp;
        }

        if (timestamp - this._time > this._options.throttle) {
            this._time = null;

            this._update();
        }

        if (this._messagesMap.size) {
            window.requestAnimationFrame(this._loop.bind(this));
        }
    }

    // 更新
    private _update(): void {
        for (let msg of this._messagesMap.values()) {
            this._channel.postMessage(msg);
        }

        this._messagesMap.clear();
    }
}