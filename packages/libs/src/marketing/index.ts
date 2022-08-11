import {useState, useEffect} from 'react';

import {getQueryParam, removeQueryParam} from '../utils';

import './@types/marketing.d';

/**
 * 营销码类型
 * @property TRACK 渠道码
 * @property AGENCY 代理码
 * @property INVITE 邀请码
 * @property SHARE 分享码
 */
export const MarketingCodeType = {
  TRACK: 'trackCode',
  AGENCY: 'agencyUser',
  INVITE: 'invite',
  SHARE: 'share',
};

/**
 * 来源类型
 * @property DEFAULT 0 默认无
 * @property LOCALSTORAGE 1 localStorage
 * @property QUERY_PARAMETERS 2 URL参数
 */
enum MarketingSourceType {
  DEFAULT,
  LOCAL_STORAGE,
  QUERY_PARAMETERS,
}

// 事件类型
const MarketingEventType = {
  UPDATE: 'MARKETING_UPDATE',
};

// 营销
class Marketing implements IMarketing {
  static VERSION = '1.0.0';

  // 渠道
  private _trackCode = '';
  private _trackCodeFrom = MarketingSourceType.DEFAULT;
  // 邀请
  private _invite = '';
  private _inviteFrom = MarketingSourceType.DEFAULT;
  // 分享
  private _share = '';
  private _shareFrom = MarketingSourceType.DEFAULT;
  // 代理
  private _agencyUser = '';
  private _agencyUserFrom = MarketingSourceType.DEFAULT;

  // hook
  public useMarketingInfo = (): IMarketingInfo => {
    const [info, setInfo] = useState<IMarketingInfo>(this.getInfo());

    useEffect(() => {
      const onUpdate = (evt: any) => {
        setInfo(evt.detail);
      };

      window.addEventListener(MarketingEventType.UPDATE, onUpdate);

      return () => {
        window.removeEventListener(MarketingEventType.UPDATE, onUpdate);
      };
    }, []);

    return {...info};
  };

  constructor() {
    this._init();
  }

  static instance: IMarketing;

  static getInstance(): IMarketing {
    if (!Marketing.instance) {
      Marketing.instance = new Marketing();
    }

    return Marketing.instance;
  }

  // 获取所有信息
  public getInfo(): IMarketingInfo {
    return {
      trackCode: this._trackCode,
      trackCodeFrom: this._trackCodeFrom,
      invite: this._invite,
      inviteFrom: this._inviteFrom,
      share: this._share,
      shareFrom: this._shareFrom,
      agencyUser: this._agencyUser,
      agencyUserFrom: this._agencyUserFrom,
    };
  }

  /**
   * 获取Key信息
   * @param {string} key 键名
   * @param {boolean} isRemove 是否移除
   * @param {boolean} isFuzzy 是否模糊查询
   * @returns {IMarketingItems}
   */
  public getKeyInfo(key: string, isRemove = true, isFuzzy = false): IMarketingItems {
    let code = '';
    let from = MarketingSourceType.DEFAULT;

    if (!this._checkKeyExists(key)) {
      return {
        code,
        from,
      };
    }

    code = getQueryParam(key, undefined, isFuzzy);

    if (code) {
      if (isRemove) {
        const search = removeQueryParam(key, location.search);
        window.history.replaceState(null, '', [location.pathname, search].join('?'));
      }

      from = MarketingSourceType.QUERY_PARAMETERS;
    } else {
      code = localStorage.getItem(key) || '';

      from = MarketingSourceType.LOCAL_STORAGE;
    }

    return {
      code,
      from,
    };
  }

  /**
   * 设置Key信息
   * @param {string} key 键名
   * @param {IMarketingItems} data 数据
   */
  public setKeyInfo(key: string, data: IMarketingItems): void {
    if (!this._checkKeyExists(key)) {
      return;
    }

    this[`_${key}`] = data.code;
    this[`_${key}From`] = data.from;

    localStorage.setItem(key, data.code);

    this._dispatch();
  }

  /**
   * 移除信息
   * @param {string} key 键名
   */
  public removeKeyInfo(key: string): void {
    if (!this._checkKeyExists(key)) {
      return;
    }

    this[`_${key}`] = '';
    this[`_${key}From`] = MarketingSourceType.DEFAULT;

    localStorage.removeItem(key);

    this._dispatch();
  }

  // 初始化
  private _init(): void {
    const trackInfo = this.getKeyInfo(MarketingCodeType.TRACK, false, true);
    const inviteInfo = this.getKeyInfo(MarketingCodeType.INVITE);
    const shareInfo = this.getKeyInfo(MarketingCodeType.SHARE);
    const agencyInfo = this.getKeyInfo(MarketingCodeType.AGENCY);

    // 渠道 & 邀请
    if (trackInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setKeyInfo(MarketingCodeType.TRACK, trackInfo);
      this.removeKeyInfo(MarketingCodeType.INVITE);
    } else if (inviteInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setKeyInfo(MarketingCodeType.INVITE, inviteInfo);
      this.removeKeyInfo(MarketingCodeType.TRACK);

      localStorage.removeItem('trackCodeTurnTable');
    } else if (trackInfo.code !== '') {
      this.setKeyInfo(MarketingCodeType.TRACK, trackInfo);
    } else if (inviteInfo.code !== '') {
      this.setKeyInfo(MarketingCodeType.INVITE, inviteInfo);
    }

    // 分享
    if (shareInfo.from === MarketingSourceType.QUERY_PARAMETERS || shareInfo.code !== '') {
      this.setKeyInfo(MarketingCodeType.SHARE, shareInfo);
    }

    // 代理
    if (agencyInfo.from === MarketingSourceType.QUERY_PARAMETERS || agencyInfo.code !== '') {
      this.setKeyInfo(MarketingCodeType.AGENCY, agencyInfo);
    }
  }

  /**
   * 检测key是否存在
   * @param {string} key 键名
   * @returns {boolean}
   */
  private _checkKeyExists(key: string): boolean {
    return this.hasOwnProperty(`_${key}`);
  }

  // 发布数据更新
  private _dispatch(): void {
    const detail = this.getInfo();

    window.dispatchEvent(
      new CustomEvent(MarketingEventType.UPDATE, {
        detail,
      }),
    );
  }
}

const marketing: IMarketing = Marketing.getInstance();

export default marketing;
