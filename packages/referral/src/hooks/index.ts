import {useState, useEffect} from 'react';
import {ReferralEventType} from '@app/types';

/**
 * 基础信息
 * @param {number} firstBet 首笔投注金额（单位：USDT）
 * @param {number} lutPrize 待发放&待领取金额
 * @param {number} betDivisor 下线投注约数（被邀请人投注要求）
 * @param {number} rebateAmount 返利金额（单位：USDT）
 * @param {number} singleLimit 单人限额(单用户提供USDT上限)
 * @param {number} rebateLimit 推广员返利限额（邀请人USDT领取上限）
 * @param {number} flowRate 流水倍率（需满足该值则可提现)
 * @param {number} inviteLimt 邀请链接数量上限
 */
let basics = {
  firstBet: 0,
  lutPrize: 0,
  betDivisor: 0,
  rebateAmount: 0,
  singleLimit: 0,
  rebateLimit: 0,
  flowRate: 0,
  inviteLimit: 0,
};

/**
 * 邀请信息
 * @property {string} code 邀请码
 * @property {string} link 邀请链接
 */
const invite = {
  code: '',
  link: '',
};

/**
 * 数据概览
 * @property {number} totalRebate 累计返利金额(单位:USDT)
 * @property {number} totalLutPrize 累计lut奖励金额（单位:LUT）
 * @property {number} referralCount 邀请用户数
 * @property {number} referralBetCount 下线投注用户数
 * @property {number} referralBetAmount 下线投注金额(单位:USDT)
 */
let overview = {
  totalRebate: 0,
  totalLutPrize: 0,
  referralCount: 0,
  referralBetCount: 0,
  referralBetAmount: 0,
};

// 渠道信息
let channel: any[] = [];

// 基础信息
export const useInviteBasics = () => {
  const [firstBet, setFirstBet] = useState<number>(basics.firstBet);
  const [lutPrize, setLutPrize] = useState<number>(basics.lutPrize);
  const [betDivisor, setBetDivisor] = useState<number>(basics.betDivisor);
  const [rebateAmount, setRebateAmount] = useState<number>(basics.rebateAmount);
  const [singleLimit, setSingleLimit] = useState<number>(basics.singleLimit);
  const [rebateLimit, setRebateLimit] = useState<number>(basics.rebateLimit);
  const [flowRate, setFlowRate] = useState<number>(basics.flowRate);
  const [inviteLimit, setInviteLimt] = useState<number>(basics.inviteLimit);

  const onUpdate = (evt: any): void => {
    const data = evt.detail;

    setFirstBet(data.firstBet);
    setLutPrize(data.lutPrize);
    setBetDivisor(data.betDivisor);
    setRebateAmount(data.rebateAmount);
    setSingleLimit(data.singleLimit);
    setRebateLimit(data.rebateLimit);
    setFlowRate(data.flowRate);
    setInviteLimt(data.inviteLimt);

    basics = {
      firstBet: data.firstBet,
      lutPrize: data.lutPrize,
      betDivisor: data.betDivisor,
      rebateAmount: data.rebateAmount,
      singleLimit: data.singleLimit,
      rebateLimit: data.rebateLimit,
      flowRate: data.flowRate,
      inviteLimit: data.inviteLimt,
    };
  };

  useEffect(() => {
    window.addEventListener(ReferralEventType.UPDATE_BASICS, onUpdate);

    return () => {
      window.removeEventListener(ReferralEventType.UPDATE_BASICS, onUpdate);
    };
  }, []);

  return {
    firstBet,
    lutPrize,
    betDivisor,
    rebateAmount,
    singleLimit,
    rebateLimit,
    flowRate,
    inviteLimit,
  };
};

// 邀请码
export const useInviteInfo = () => {
  const [code, setCode] = useState<string>(invite.code);
  const [link, setLink] = useState<string>(invite.link);

  const onUpdate = (evt: any): void => {
    const data = evt.detail;

    const link = `${location.origin}/?invite=${data}`;

    invite.code = data;
    invite.link = link;

    setCode(data);
    setLink(link);
  };

  useEffect(() => {
    window.addEventListener(ReferralEventType.UPDATE_INVITE, onUpdate);

    return () => {
      window.removeEventListener(ReferralEventType.UPDATE_INVITE, onUpdate);
    };
  }, []);

  return {
    code,
    link,
  };
};

// 邀请概览
export const useInviteOverview = () => {
  const [totalRebate, setTotalRebate] = useState<number>(overview.totalRebate);
  const [totalLutPrize, setTotalLutPrize] = useState<number>(overview.totalLutPrize);
  const [referralCount, setReferralCount] = useState<number>(overview.referralCount);
  const [referralBetCount, setReferralBetCount] = useState<number>(overview.referralBetCount);
  const [referralBetAmount, setReferralBetAmount] = useState<number>(overview.referralBetAmount);

  const onUpdate = (evt: any): void => {
    const data = evt.detail;

    overview = data;

    setTotalRebate(data.totalRebate);
    setTotalLutPrize(data.totalLutPrize);
    setReferralCount(data.referralCount);
    setReferralBetCount(data.referralBetCount);
    setReferralBetAmount(data.referralBetAmount);
  };

  useEffect(() => {
    window.addEventListener(ReferralEventType.UPDATE_OVERVIEW, onUpdate);

    return () => {
      window.removeEventListener(ReferralEventType.UPDATE_OVERVIEW, onUpdate);
    };
  }, []);

  return {
    totalRebate,
    totalLutPrize,
    referralCount,
    referralBetCount,
    referralBetAmount,
  };
};

// 渠道信息
export const useInviteChannel = () => {
  const [channelData, setChannelData] = useState<any[]>(channel);

  const onUpdate = (evt: any): void => {
    const data = evt.detail;

    channel = data;

    setChannelData(data);
  };

  useEffect(() => {
    window.addEventListener(ReferralEventType.UPDATE_CHANNEL, onUpdate);

    return () => {
      window.removeEventListener(ReferralEventType.UPDATE_CHANNEL, onUpdate);
    };
  }, []);

  return channelData;
};
