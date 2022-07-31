import requests, {OK_CODE} from '@libs/requests';

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
 * 声明 - 基本信息
 * @param {number} data 数据
 */
export interface IDepositInfoResponse extends IApiResponse {
  data: IDepositInfoData;
}

/**
 * 声明 - 基本信息
 * @param {number} highestPrize 最高奖励（单位：USDT）
 * @param {number} startTime 活动开始时间（时间戳）
 * @param {number} endTime 活动结束时间（时间戳）
 * @param {IDepositInfoPrizeList} prizeList
 * @param {IDepositInfoUserInfo} userInfo
 */
interface IDepositInfoData {
  highestPrize: number;
  startTime: number;
  endTime: number;
  prizeList: IDepositInfoPrizeList[];
  userInfo: IDepositUserInfo;
}

/**
 * 声明 - 活动奖励
 * @param {number} level 档位
 * @param {number} rechargeAmount 累计充值金额（单位：USDT）
 * @param {number} prizeAmount 返奖金额（单位：USDT）
 */
export interface IDepositInfoPrizeList {
  level: number;
  rechargeAmount: number;
  prizeAmount: number;
}

/**
 * 声明 - 用户数据(依赖登录态)
 * @param {number} rechargeAmount 累计充值金额（单位：USDT）
 * @param {number} nextRechargeAmount 下个阶段充值要求（单位：USDT）
 * @param {number} prizeAmount 充值奖励（单位：USDT）
 * @param {number} nextPrizeAmount 下个阶段充值奖励（单位：USDT）
 * @param {number} lockAmount 待领取奖励（单位：USDT）
 * @param {number} validBetAmount 有效投注额（单位：USDT）
 * @param {number} reachValidBetAmount 已达到有效投注额（单位：USDT）
 */
export interface IDepositUserInfo {
  rechargeAmount: number;
  nextRechargeAmount: number;
  prizeAmount: number;
  nextPrizeAmount: number;
  lockAmount: number;
  validBetAmount: number;
  reachValidBetAmount: number;
}

/**
 * 基本信息
 * @param {string} actNo 活动编号
 * @return {IDepositInfoResponse} 数据
 */
export function apiDepositInfo(params: {actNo: string}): Promise<IDepositInfoResponse> {
  return new Promise((resolve, reject) => {
    requests
      .send(`/act/newRecharge/info`, 'GET', params, {
        Authorization: true,
      })
      .then((res: IDepositInfoResponse) => {
        if (res.rspCode === OK_CODE) {
          resolve(res);
        } else {
          reject(res.rspCode);
        }
      });
  });
}

/**
 * 声明 - 模拟计算
 * @param {number} data 数据
 */
export interface IDepositSimulateResponse extends IApiResponse {
  data: IDepositSimulateData;
}

/**
 * 声明 - 模拟计算
 * @param {number} prizeAmount 奖励金额（单位：USDT
 * @param {number} validBetAmount 有效投注额（单位：USDT）
 */
interface IDepositSimulateData {
  prizeAmount: number;
  validBetAmount: number;
}

/**
 * 模拟计算
 * @param {string} actNo 活动编号
 * @param {number} amount 充值金额
 * @return {IDepositInfoResponse} 数据
 */
export function apiDepositSimulate(params: {actNo: string; amount: number}): Promise<IDepositSimulateResponse> {
  return new Promise((resolve, reject) => {
    requests.send(`/act/newRecharge/simulate`, 'GET', params).then((res: IDepositSimulateResponse) => {
      if (res.rspCode === OK_CODE) {
        resolve(res);
      } else {
        reject(res.rspCode);
      }
    });
  });
}

/**
 * 声明 - 奖励通知信息
 * @param {number} data 数据
 */
export interface IDepositPrizeNotifyResponse extends IApiResponse {
  data: IDepositPrizeNotify[];
}

/**
 * 奖励通知信息
 * @param {string} userId 用户id（已脱敏）
 * @param {string} amount 奖励金额（单位：USDT）
 */
export interface IDepositPrizeNotify {
  userId: string;
  amount: string;
}

/**
 * 奖励通知信息
 * @param {string} actNo 活动编号
 * @return {IDepositInfoResponse} 数据
 */
export function apiDepositPrizeNotify(params: {actNo: string}): Promise<IDepositPrizeNotifyResponse> {
  return new Promise((resolve, reject) => {
    requests.send(`/act/newRecharge/prizeNotify`, 'GET', params).then((res: IDepositPrizeNotifyResponse) => {
      if (res.rspCode === OK_CODE) {
        resolve(res);
      } else {
        reject(res.rspCode);
      }
    });
  });
}
