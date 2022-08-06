import {useState, useEffect} from 'react';

import {getQueryParam, removeQueryParam} from '../utils';

import './@types/requests.d';

/**
 * 声明
 * @param {string} trackCode 渠道码
 * @param {number} trackFrom 渠道来源
 * @param {string} invite 邀请码
 * @param {number} inviteFrom 邀请来源
 * @param {string} share 邀请码
 * @param {number} shareFrom 邀请来源
 * @param {string} agencyUser 代理码
 * @param {number} agencyUserFrom 代理来源
 */
export interface IMarketingInfo {
  trackCode: string;
  trackCodeFrom: number;
  invite: string;
  inviteFrom: number;
  share: string;
  shareFrom: number;
  agencyUser: string;
  agencyUserFrom: number;
}

/**
 * 声明 - 单项
 * @property {string} code 码
 * @property {number} from 来源
 */
export interface IMarketingItems {
  code: string;
  from: number;
}

// 事件类型
const MarketingEventType = {
  UPDATE: 'MARKETING_UPDATE',
};

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

  // 获取信息
  public getInfos(): IMarketingInfo {
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
   * 根据key获取信息
   * @param {string} key 键名
   * @param {boolean} isRemove 是否移除
   * @param {number} from 信息来源  0:default, 1:localStorage, 2:query parameters
   */
  public getInfo(key: string, isRemove = true): IMarketingItems {
    let code: string = getQueryParam(key);
    let from = MarketingSourceType.DEFAULT;

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
   * 设置信息
   * @param {string} key 键名
   */
  public setInfo(key: string, data: IMarketingItems): void {
    this[`_${key}`] = data.code;
    this[`_${key}From'`] = data.from;

    localStorage.setItem(key, data.code);

    window.dispatchEvent(
      new CustomEvent(MarketingEventType.UPDATE, {
        detail: marketingInfo,
      }),
    );
  }

  /**
   * 移除信息
   * @param {string} key 键名
   */
  public removeInfo(key: string): void {
    marketingInfo[key] = '';
    marketingInfo[key + 'From'] = MarketingSourceType.DEFAULT;

    localStorage.removeItem(key);

    window.dispatchEvent(
      new CustomEvent(MarketingEventType.UPDATE, {
        detail: marketingInfo,
      }),
    );
  }

  public getUrlTrackCodeKey(): string {
    const queryParams = new URLSearchParams(location.search);
    let trackCodeKey = MarketingCodeType.TRACK;
    for (const [key, value] of queryParams) {
      if (key.toLowerCase() == 'trackcode') {
        trackCodeKey = key;
      }
    }
    return trackCodeKey;
  }

  // 初始化
  private _init(): void {
    const trackInfoKey = getUrlTrackCodeKey();
    const trackInfo = this.getInfo(trackInfoKey, false);
    const inviteInfo = this.getInfo(MarketingCodeType.INVITE);
    const shareInfo = this.getInfo(MarketingCodeType.SHARE);
    const agencyInfo = this.getInfo(MarketingCodeType.AGENCY);

    // 渠道 & 邀请
    if (trackInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setInfo(MarketingCodeType.TRACK, trackInfo);
      this.removeInfo(MarketingCodeType.INVITE);
    } else if (inviteInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setInfo(MarketingCodeType.INVITE, inviteInfo);
      this.removeInfo(MarketingCodeType.TRACK);

      localStorage.removeItem('trackCodeTurnTable');
    } else if (trackInfo.code !== '') {
      2;
      this.setInfo(MarketingCodeType.TRACK, trackInfo);
    } else if (inviteInfo.code !== '') {
      this.setInfo(MarketingCodeType.INVITE, inviteInfo);
    }

    // 分享
    if (shareInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setInfo(MarketingCodeType.SHARE, shareInfo);
    } else if (shareInfo.code !== '') {
      this.setInfo(MarketingCodeType.SHARE, shareInfo);
    }

    // 代理
    if (agencyInfo.from === MarketingSourceType.QUERY_PARAMETERS) {
      this.setInfo(MarketingCodeType.AGENCY, agencyInfo);
    } else if (agencyInfo.code !== '') {
      this.setInfo(MarketingCodeType.AGENCY, agencyInfo);
    }
  }
}

const marketing: IMarketing = Marketing.getInstance();

// Hook
export const useMarketingInfo = (): IMarketingInfo => {
  const [info, setInfo] = useState<IMarketingInfo>(marketing.getInfo());

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

export default marketing;
