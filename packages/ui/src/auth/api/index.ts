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
