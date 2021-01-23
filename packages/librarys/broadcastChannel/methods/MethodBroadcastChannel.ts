// 原生Broadcast Channel API 可以实现同源下浏览器不同窗口，Tab页，frame或者 iframe 下的 浏览器上下文 (通常是同一个网站下不同的页面)之间的简单通讯。
export default class MethodBroadcastChannel {
    // 频道名称
    private _name: string = '';
    // 频道
    private _channel: BroadcastChannel = null;
    // 是否关闭
    private _closed: boolean = false;
    // 消息回调
    private _messagesCallback: IMessageCallback = null;

    /**
     * @param {string} channelName 频道名称
     */
    constructor(channelName: string) {
        this._name = channelName;
        this._channel = new BroadcastChannel(channelName);

        this._channel.onmessage = (msg: MessageEvent<any>) => {
            if (typeof this._messagesCallback === 'function') {
                this._messagesCallback(msg.data);
            }
        };

        this._channel.onmessageerror = (err) => { 
            console.log(err);
        };

        console.log(this._channel);
    }

    static canBeUsed() {
        return typeof window !== 'undefined' && typeof BroadcastChannel === 'function';
    }

    /**
     * 发送消息
     * @param {IMessage} msg 消息
     */
    public postMessage(msg: IMessage): void {
        if (this._closed) {
            return;
        }

        this._channel.postMessage(msg);

        console.log('postMessage', this._name, msg);
    }

    /**
     * 监听消息
     * @param {IMessageCallback} fn 回调
     */
    public onMessage(fn: IMessageCallback): void {
        if (typeof fn !== 'function') {
            return;
        }

        this._messagesCallback = fn;

        console.log('onMessage', this._name);
    }

    /**
     * 关闭
     */
    public close(): void {
        if (this._closed) {
            return;
        }

        this._closed = true;

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
}