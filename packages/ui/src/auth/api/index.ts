import bs58 from 'bs58';
import {BufferShim} from 'buffer-esm';

import requests, {OK_CODE} from '@libs/requests';
import auth from '@libs/auth';
import {getCurLang} from '@libs/i18n';

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
