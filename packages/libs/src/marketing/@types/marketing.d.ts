/**
 * 声明
 * @param {string} trackCode 渠道码
 * @param {number} trackFrom 渠道来源
 * @param {string} invite 邀请码
 * @param {number} inviteFrom 邀请来源
 * @param {string} share 分享码
 * @param {number} shareFrom 分享来源
 * @param {string} agencyUser 代理码
 * @param {number} agencyUserFrom 代理来源
 */
interface IMarketingInfo {
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
interface IMarketingItems {
  code: string;
  from: number;
}

/**
 * 声明 - 营销（渠道，分享，邀请）
 * @property {hook} useMarketingInfo 信息hook
 * @method getInfo 获取所有信息
 * @method getKeyInfo 获取Key信息
 * @method setKeyInfo 设置Key信息
 * @method removeKeyInfo 移除Key信息
 */
declare interface IMarketing {
  useMarketingInfo: () => IMarketingInfo;

  getInfo(): IMarketingInfo;
  getKeyInfo(key: string, isRemove?: boolean, isFuzzy?: boolean): IMarketingItems;
  setKeyInfo(key: string, data: IMarketingItems): void;
  removeKeyInfo(key: string): void;
}
