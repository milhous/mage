import axios, {AxiosInstance, AxiosPromise, Method} from 'axios';
import Cookies from 'js-cookie';

import domain from '../config/domain';
import auth from '../auth';
import {getCurLang} from '../i18n';

import './@types/requests.d';

export const OK_CODE = '0000';

if (!__isDEV__) {
  axios.defaults.withCredentials = true;
}

// 请求
class Requests implements IRequests {
  static VERSION = '1.0.0';

  private _axiosInstance: AxiosInstance | null = null;

  constructor() {
    this._init();
  }

  static instance: IRequests;

  static getInstance(): IRequests {
    if (!Requests.instance) {
      Requests.instance = new Requests();
    }

    return Requests.instance;
  }

  send(url: string, method: Method = 'get', data: any, headers: any = {}): AxiosPromise<any> {
    const axiosPromise: AxiosPromise<any> = (this._axiosInstance as AxiosInstance)({
      baseURL: '//' + domain.apiHost,
      url,
      headers,
      method,
      [['put', 'post', 'patch'].includes(String(method).toLowerCase()) ? 'data' : 'params']: data || {},
    });

    return axiosPromise;
  }

  private _init(): void {
    // 创建请求
    this._axiosInstance = axios.create({});

    // 初始化请求拦截器
    this._initInterceptorsRequest(this._axiosInstance);

    // 初始化响应拦截器
    this._initInterceptorsResponse(this._axiosInstance);
  }

  /**
   * 初始化请求拦截器
   * @param {AxiosInstance} instance 请求实例
   */
  private _initInterceptorsRequest(instance: AxiosInstance): void {
    instance.interceptors.request.use(
      config => {
        const {headers, method} = config;

        if (!!headers) {
          const isToken = 'Authorization' in headers && (headers['Authorization'] as boolean);
          const authorization = auth.getAuthorization(isToken);
          const lang = getCurLang();

          headers['Authorization'] = authorization;
          headers['Accept-Language'] = lang;

          if (
            ['put', 'post', 'patch', 'delete'].includes(('' + method).toLowerCase()) &&
            headers['Content-Type'] === 'application/x-www-form-urlencoded'
          ) {
            const data = config.data || config.params;
            const params = new URLSearchParams();

            for (const key in data) {
              params.append(key, data[key]);
            }

            config.data = params;
          }
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }

  /**
   * 初始化响应拦截器
   * @param {AxiosInstance} instance 请求实例
   */
  private _initInterceptorsResponse(instance: AxiosInstance): void {
    let refreshPromise: Promise<any> | null;
    let refreshed = false;

    // 添加响应拦截器
    instance.interceptors.response.use(
      response => {
        return response.data;
      },
      error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              console.warn(`invalid_token`, error.response);
              // 通知全局登录态失效
              window.dispatchEvent(new CustomEvent('LOGIN_EXPIRED'));
              const config = error.response.config;
              const url = config.url;

              if (String(url).indexOf('/pass/oauth/token') > -1) return Promise.reject(error);

              if (!refreshed) {
                refreshed = true;
                // refreshPromise = refreshUserToken().then(data => {
                //   refreshPromise = null;
                // });
              }

              if (refreshPromise) {
                return refreshPromise.then(() => {
                  delete config.headers.Authorization;
                  return instance(config);
                });
              } else {
                delete config.headers.Authorization;
                return instance(config);
              }
              break;
          }
        } else {
          if (location.href.indexOf('/game/details?gameNo') < 0) {
            const cf_reload_timestamp = Cookies.get('cf_reload_timestamp');

            if (!cf_reload_timestamp) {
              Cookies.set('cf_reload_timestamp', new Date().getTime().toString());
              location.reload();
            } else {
              const offset = new Date().getTime() - new Date(Number(cf_reload_timestamp)).getTime();

              if (offset > 60 * 1000) {
                Cookies.set('cf_reload_timestamp', new Date().getTime().toString());
                location.reload();
              }
            }
          }
        }
        return Promise.reject(error); // 返回接口返回的错误信息
      },
    );
  }
}

const requests: IRequests = Requests.getInstance();

export default requests;
