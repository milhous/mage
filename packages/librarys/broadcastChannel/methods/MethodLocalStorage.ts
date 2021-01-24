import { uuid, randomToken } from '../util';

// 获取LocalStorage
const getLocalStorage = (): Storage => {
    let localStorage: Storage = null;

    if (typeof window === 'undefined') return null;

    try {
        localStorage = window.localStorage;
        localStorage = window['ie8-eventlistener/storage'] || window.localStorage;
    } catch (e) {
        // New versions of Firefox throw a Security exception
        // if cookies are disabled. See
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1028153
    }
    return localStorage;
}

// 只读的localStorage 属性允许你访问一个Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。
// localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除 。
export default class MethodLocalStorage {
    // 前缀关键词
    readonly KEY_PREFIX: string = '@BTGBroadcastChannel-';

    // 频道名称
    private _name: string = '';
    // 频道
    private _channel: Storage = null;
    // 是否关闭
    private _closed: boolean = false;
    // 监听事件
    private _listener: (evt: StorageEvent) => void = null;
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
        this._channel = getLocalStorage();
        this._uuid = uuid();
        this._listener = (evt: StorageEvent): void => {
            if (evt.key === this._name) {
                const data = JSON.parse(evt.newValue);
    
                if (data.uuid === this._uuid) {
                    return;
                }
                
                if (typeof this._messagesCallback === 'function') {
                    this._messagesCallback(data);
                }

                this._messagesDispatch(data);
            }
        }

        window.addEventListener('storage', this._listener);
    }

    // 类型
    static type = 'localstorage';

    // 是否可使用
    static canBeUsed(): boolean {
        const ls = getLocalStorage();

        if (!ls) return false;

        try {
            const key = '__broadcastchannel_check';
            ls.setItem(key, 'works');
            ls.removeItem(key);
        } catch (e) {
            // Safari 10 in private mode will not allow write access to local
            // storage and fail with a QuotaExceededError. See
            // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API#Private_Browsing_Incognito_modes
            return false;
        }

        return true;
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

        const value = JSON.stringify(msg);
        this._channel.setItem(this._name, value);

        /**
         * StorageEvent does not fire the 'storage' event
         * in the window that changes the state of the local storage.
         * So we fire it manually
         */
        const evt: Event = document.createEvent('Event');
        evt.initEvent('storage', true, true);
        evt['key'] = this._name;
        evt['newValue'] = value;
        window.dispatchEvent(evt);
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

        window.removeEventListener('storage', this._listener);

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