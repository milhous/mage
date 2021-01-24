import { uuid, randomToken } from '../util';

// 原生Broadcast Channel API 可以实现同源下浏览器不同窗口，Tab页，frame或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单通讯。
export default class MethodBroadcastChannel {
    // 前缀关键词
    readonly KEY_PREFIX: string = '@BTGBroadcastChannel-';

    // 频道名称
    private _name: string = '';
    // 频道
    private _channel: BroadcastChannel = null;
    // 是否关闭
    private _closed: boolean = false;
    // 监听事件
    private _listener: (evt: MessageEvent<any>) => void = null;
    // 子监听事件
    private _sublistenersMap: Map<string, IBTGBroadcastChannelSet> = new Map();
    // 消息回调
    private _messagesCallback: IBTGBroadcastChannelCallback = null;
    // 消息token，防止重复触发
    private _messagesToken: Set<string> = new Set(); 

    // uuid
    private _uuid: string = null;

    /**
     * @param {string} channelName 频道名称
     */
    constructor(channelName: string) {
        this._name = this.KEY_PREFIX + channelName;
        this._channel = new BroadcastChannel(channelName);
        this._uuid = uuid();
        this._listener = (evt: MessageEvent<any>) => {
            const data = evt.data;

            if (data.uuid === this._uuid) {
                return;
            }
            
            if (typeof this._messagesCallback === 'function') {
                this._messagesCallback(data);
            }

            this._messagesDispatch(data);
        };

        this._channel.onmessage = this._listener;
        this._channel.onmessageerror = (err) => { 
            console.log(err);
        };
    }

    // 类型
    static type = 'broadcastChannel';

    // 是否可使用
    static canBeUsed(): boolean {
        return typeof window !== 'undefined' && typeof BroadcastChannel === 'function';
    }

    /**
     * 发送消息
     * @param {IMessage} msg 消息
     */
    public postMessage(msg: IBTGBroadcastChannelMessage): void {
        if (this._closed) {
            return;
        }

        msg.uuid = this._uuid;
        msg.token = randomToken();

        this._channel.postMessage(msg);
    }

    /**
     * 监听消息
     * @param {IMessageCallback} fn 回调
     */
    public onMessage(fn: IBTGBroadcastChannelCallback): void {
        if (typeof fn !== 'function') {
            return;
        }

        this._messagesCallback = fn;
    }

    /**
     * 关闭
     */
    public close(): void {
        if (this._closed) {
            return;
        }

        this._channel.close();

        this._channel = null;
        this._closed = true;
        this._messagesCallback = null;
        this._listener = null;

        for (let sublisteners of this._sublistenersMap.values()) {
            sublisteners.clear();
        }

        this._sublistenersMap.clear();

        this._messagesToken.clear();
    }

    /**
     * 新增监听
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public addEventListener(type: string, handler: IBTGBroadcastChannelCallback): void {
        if (typeof handler !== 'function') {
            return;
        }

        if (!this._sublistenersMap.has(type)) {
            this._sublistenersMap.set(type, new Set());
        }

        const sublisteners: IBTGBroadcastChannelSet = this._sublistenersMap.get(type);

        sublisteners.add(handler);
    }

    /**
     * 新增监听 
     * @param {string} type 类型
     * @param {IMessageCallback} handler 事件
     */
    public removeEventListener(type: string, handler: IBTGBroadcastChannelCallback): void {
        if (typeof handler !== 'function' || !this._sublistenersMap.has(type)) {
            return;
        }

        const sublisteners: IBTGBroadcastChannelSet = this._sublistenersMap.get(type);

        for (let listener of sublisteners) {
            if (listener === handler) {
                sublisteners.delete(listener);

                break;
            }
        }
    }

    /**
     * 消息分发
     * @param {IBTGBroadcastChannelMessage} data 数据
     */
    private _messagesDispatch(data: IBTGBroadcastChannelMessage): void {
        const { type, token } = data;

        if (this._sublistenersMap.size === 0) {
            return;
        }

        if (this._sublistenersMap.has(type) && !this._messagesToken.has(token)) {
            const sublisteners: IBTGBroadcastChannelSet = this._sublistenersMap.get(type);

            for (let listener of sublisteners) {
                if (typeof listener === 'function') {
                    listener(data);
                }
            }

            this._messagesToken.add(token);
        }
    }
}