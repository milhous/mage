export const OK_CODE = '0000';

/**
 * @param {string} rspCode 状态码
 * @param {number} data 数据
 * @param {string} message 业务信息
 */
interface IApiResponse {
  rspCode: string;
  data: any;
  message: string;
}

/**
 * 声明 - 邀请基本信息
 * @param {Array<IActivityFindAllResponseData>} data 数据
 */
export interface IGetInvitationInfoResponse extends IApiResponse {
  data: IGetInvitationInfoData;
}

/**
 * 声明
 * @param {number} firstBet 首笔投注金额（单位：USDT）
 * @param {number} lutPrize 待发放&待领取金额
 * @param {number} betDivisor 下线投注约数（被邀请人投注要求）
 * @param {number} rebateAmount 返利金额（单位：USDT）
 * @param {number} singleLimit 单人限额(单用户提供USDT上限)
 * @param {number} rebateLimit 推广员返利限额（邀请人USDT领取上限）
 * @param {number} flowRate 流水倍率（需满足该值则可提现)
 * @param {number} inviteLimt 邀请链接数量上限
 * @param {number} inviteCode 用户默认邀请码（登录态）
 * @param {IGetInvitationOverviewData} overviewData 概览数据（登录态）
 */
export interface IGetInvitationInfoData {
  firstBet: number;
  lutPrize: number;
  betDivisor: number;
  rebateAmount: number;
  singleLimit: number;
  rebateLimit: number;
  flowRate: number;
  inviteLimt: number;
  inviteCode: string;
  overviewData: IGetInvitationOverviewData;
}

/**
 * 声明 - 数据概览
 * @param {number} totalRebate 累计返利金额(单位:USDT)
 * @param {number} totalLutPrize 累计lut奖励金额（单位:LUT）
 * @param {number} referralCount 邀请用户数
 * @param {number} referralBetCount 下线投注用户数
 * @param {number} referralBetAmount 下线投注金额(单位:USDT)
 */
export interface IGetInvitationOverviewData {
  totalRebate: number;
  totalLutPrize: number;
  referralCount: number;
  referralBetCount: number;
  referralBetAmount: number;
}

// // 邀请基础信息
// export function apiGetInvitationInfo(): Promise<IGetInvitationInfoResponse> {
//   return new Promise((resolve, reject) => {
//     request(`/act/refer/new/info`, 'GET', null, {
//       Authorization: true,
//     }).then((res: IGetInvitationInfoResponse) => {
//       if (res.rspCode === OK_CODE) {
//         resolve(res);
//       } else {
//         reject(res.rspCode);
//       }
//     });
//   });
// }

/**
 * 声明 - 邀请下线分页查询
 * @param {IGetInvitationDetailResponse} data 数据
 */
export interface IGetInvitationDetailResponse extends IApiResponse {
  data: IGetInvitationDetailData;
}

/**
 * 声明
 * @param {number} pages 总数
 * @param {number} pageNum 页数
 * @param {Array<IGetInvitationListData>} list 数据
 */
export interface IGetInvitationDetailData {
  pages: number;
  pageNum: number;
  list: IGetInvitationListData[];
}

/**
 * 声明
 * @param {number} userId 用户id
 * @param {number} adName 广告名称
 * @param {number} firstBetAmount 首次投注金额（单位:USDT）
 * @param {number} totalBetAmount 累计投注金额（单位:USDT）
 * @param {number} createTime 创建时间（时间戳）
 */
export interface IGetInvitationListData {
  userId: number;
  adName: number;
  firstBetAmount: number;
  totalBetAmount: number;
  createTime: number;
}

// // 邀请下线分页查询
// export function apiGetInvitationDetail(params: {
//   pageNum: number;
//   pageSize: number;
//   inviteCode?: string;
// }): Promise<IGetInvitationDetailResponse> {
//   return new Promise((resolve, reject) => {
//     request(`/act/refer/new/findReferralPage`, 'POST', params, {
//       Authorization: true,
//     }).then((res: IGetInvitationDetailResponse) => {
//       if (res.rspCode === OK_CODE) {
//         resolve(res);
//       } else {
//         reject(res.rspCode);
//       }
//     });
//   });
// }

/**
 * 声明 - 推荐广告列表
 * @param {Array<IGetInvitationChannelResponse>} data 数据
 */
export interface IGetInvitationChannelResponse extends IApiResponse {
  data: IGetInvitationChannelData[];
}

/**
 * 声明
 * @param {string} inviteCode 邀请码
 * @param {string} name 广告名称
 * @param {boolean} isDefault 是否默认
 * @param {number} createTime 创建时间(时间戳)
 * @param {number} totalLutPrize 累计lut奖励金额（单位:LUT）
 * @param {number} totalRebate 累计返利金额(单位:USDT)
 * @param {number} referralCount 邀请用户数
 * @param {number} referralBetCount 下线投注用户数
 * @param {number} referralBetAmount 下线投注金额
 */
export interface IGetInvitationChannelData {
  inviteCode: string;
  name: string;
  isDefault: boolean;
  createTime: number;
  totalLutPrize: number;
  totalRebate: number;
  referralCount: number;
  referralBetCount: number;
  referralBetAmount: number;
}

// // 推荐广告列表
// export function apiGetInvitationChannel(): Promise<IGetInvitationChannelResponse> {
//   return new Promise((resolve, reject) => {
//     request(`/act/refer/new/findInviteList`, 'GET', null, {
//       Authorization: true,
//     }).then((res: IGetInvitationChannelResponse) => {
//       if (res.rspCode === OK_CODE) {
//         resolve(res);
//       } else {
//         reject(res.rspCode);
//       }
//     });
//   });
// }

// // 添加\修改推荐广告
// export function apiGetInvitationRemark(params: {
//   name: string;
//   inviteCode?: string;
// }): Promise<IApiResponse> {
//   return new Promise((resolve, reject) => {
//     request(`/act/refer/new/save`, 'GET', params, {
//       Authorization: true,
//     }).then((res: IApiResponse) => {
//       if (res.rspCode === OK_CODE) {
//         resolve(res);
//       } else {
//         reject(res.rspCode);
//       }
//     });
//   });
// }

// // 推荐广告默认设置
// export function apiGetInvitationDefault(params: {
//   inviteCode: string;
// }): Promise<IApiResponse> {
//   return new Promise((resolve, reject) => {
//     request(`/act/refer/new/setDefault`, 'GET', params, {
//       Authorization: true,
//     }).then((res: IApiResponse) => {
//       if (res.rspCode === OK_CODE) {
//         resolve(res);
//       } else {
//         reject(res.rspCode);
//       }
//     });
//   });
// }
