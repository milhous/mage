import bs58 from 'bs58';
import {BufferShim} from 'buffer-esm';

import {WalletType} from '@libs/config';
import {isMobile} from '@libs/utils';
import auth from '@libs/auth';
import {getCurLang} from '@libs/i18n';
import requests, {OK_CODE} from '@libs/requests';

/**
 * @param {string} rspCode 状态码
 * @param {number} data 数据
 * @param {string} message 业务信息
 */
export interface IApiResponse {
  rspCode: string;
  data: any;
  message: string;
}

/**
 * 声明
 * @param {string} userName 用户账号（可邮件、id）
 * @param {string} password 密码
 * @param {string} captcha 人机验证码
 * @param {string} deviceId 设备id
 * @param {string} appVersion app版本
 * @param {string} language 语言
 * @param {string} googleOptCode 谷歌验证码
 */
export interface IApiLoginParams {
  userName: string;
  password: string;
  captcha: string;
  deviceId?: string;
  appVersion?: string;
  language?: string;
  googleOptCode?: string;
}

/**
 * @param {IApiLoginData} data 数据
 */
export interface IApiLoginResponse extends IApiResponse {
  data: IApiLoginData;
}

/**
 * @param {string} exp 用户令牌有效期
 * @param {string} access_token 用户令牌
 * @param {string} refresh_token 刷新令牌
 */
export interface IApiLoginData {
  exp: string;
  access_token: string;
  refresh_token: string;
}

// 登录
export const apiLogin = (params: IApiLoginParams): Promise<IApiLoginResponse> => {
  return new Promise(resolve => {
    params.userName = params.userName.trim();

    if (!('deviceId' in params)) {
      params.deviceId = auth.getDeviceId();
    }

    if (!('language' in params)) {
      params.language = getCurLang();
    }

    // setParamsWithStorage('apiLogin', params);

    // setLoginSceneType(LoginSceneType.PLATFORM);

    const data = Object.assign({}, params, {password: bs58.encode(BufferShim.from(params.password))});

    requests.send('/pass/login', 'POST', data).then((res: IApiLoginResponse) => {
      if (res.rspCode === OK_CODE) {
        // removeMarketingInfo(MarketingQueryKey.TRACK);
        // //移除代理用户名
        // removeMarketingInfo(MarketingQueryKey.AGENCY);
      }

      // loginHandler(res);

      resolve(res);
    });
  });
};

/**
 * @param {Array<string>} data 数据
 */
interface IApiRegSloganResponse extends IApiResponse {
  data: string[];
}

//注册、登陆时显示标语
export const apiRegSlogan = (params: {langue: string}): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    requests.send(`/sp/activity/regSlogan`, 'GET', params).then((res: IApiRegSloganResponse) => {
      if (res.rspCode === OK_CODE) {
        resolve(res.data);
      } else {
        reject(res.rspCode);
      }
    });
  });
};

/**
 * @param {number} data 数据
 */
interface IApiBetNumResponse extends IApiResponse {
  data: number;
}

//平台总投注数
export const apiBetNum = (): Promise<number> => {
  return new Promise((resolve, reject) => {
    requests.send(`/sp/platform/betNum`, 'GET').then((res: IApiBetNumResponse) => {
      if (res.rspCode === OK_CODE) {
        resolve(res.data);
      } else {
        reject(res.rspCode);
      }
    });
  });
};

/**
 * 声明
 * @param {string} name 登录名称 google, facebook, line, kakao
 * @param {string} token 第三方token
 * @param {string} code 第三方临时授权码
 * @param {string} email 邮箱地址:绑定需要，验证无需
 * @param {string} otpCode 邮件验证码
 * @param {string} googleOptCode 谷歌验证验证码
 * @param {string | null} referrerUserId 推荐人ID
 * @param {number} platform 平台
 * @param {string} trackCode 渠道码
 * @param {string} agencyUser 代理用户名
 * @param {string} deviceId 设备ID
 * @param {string} language 语言
 */
export interface IApiPassThirdParams {
  name: string;
  token?: string;
  code?: string;
  email?: string;
  otpCode?: string;
  googleOptCode?: string;
  referrerUserId?: string | null;
  platform?: number;
  trackCode?: string;
  agencyUser?: string;
  deviceId?: string;
  language?: string;
  address?: string;
}

const wallets = ['binance_chain_wallet', 'metamask', 'tronlink'];

// 第三方联合登录回调
export const apiPassThird = (params: IApiPassThirdParams): Promise<IApiLoginResponse> => {
  return new Promise((resolve, reject) => {
    const marketingInfo = getMarketingInfo();

    if (marketingInfo.trackCode !== '') {
      params.trackCode = marketingInfo.trackCode;
    }
    if (marketingInfo.agencyUser !== '') {
      params.agencyUser = marketingInfo.agencyUser;
    }
    if (!('referrerUserId' in params) && marketingInfo.invite !== '') {
      params.referrerUserId = marketingInfo.invite;
    }

    if (!('deviceId' in params)) {
      params.deviceId = auth.getDeviceId();
    }

    if (!('language' in params)) {
      params.language = getCurLang();
    }

    if (!('platform' in params)) {
      params.platform = auth.getPlatformType();
    }
    // setParamsWithStorage('apiPassThird', params);

    // setLoginSceneType(LoginSceneType.OAUTH);

    const name = params.name.toUpperCase();
    const data = {...params};

    if (isMobile() && !(name in WalletType)) {
      data.code = data.token;

      delete data.token;
    }

    if ('token' in data && data.name === 'line') {
      data.code = data.token;

      delete data.token;
    }

    requests.send(`/pass/third/callback/${params.name}`, 'POST', data).then((res: IApiLoginResponse) => {
      if (res.rspCode === OK_CODE) {
        // removeMarketingInfo(MarketingQueryKey.TRACK);
        // //移除代理用户名
        // removeMarketingInfo(MarketingQueryKey.AGENCY);
      }

      // 验证码错误或已过期
      if (res.rspCode !== '3002') {
        // setResponseWithStorage('apiPassThird', res);
      }

      // loginHandler(res);

      resolve(res);
    });
  });
};

/**
 * 声明
 * @param {string} name 登录名称 google, facebook, line, kakao
 */
export interface IApiThirdAuthorizeParams {
  name: string;
}

// 第三方授权登录
export const apiThirdAuthorize = (params: IApiThirdAuthorizeParams): Promise<IApiResponse> => {
  return new Promise((resolve, reject) => {
    requests.send(`/pass/third/authorize/${params.name}`, 'POST', params).then((res: IApiResponse) => {
      resolve(res);
    });
  });
};
