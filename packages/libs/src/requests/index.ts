import axios, {AxiosInstance, AxiosRequestHeaders, Method} from 'axios';
import Cookies from 'js-cookie';

import {AuthorizationsDev, AuthorizationsPre, AuthorizationsPrd} from '@app/config/OAuth';
import {isMobile, isApp, isIOS} from '@app/utils';
import {getCurLang} from '@app/i18n';

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

  send(): void {}

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
          const token = this._getAccessToken();
          const lang = getCurLang();
          const authorization = this._getAuthorization();

          headers['Accept-Language'] = lang;
          headers['Authorization'] = headers?.Authorization && token ? `Bearer ${token}` : `Basic ${authorization}`;

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
      function (response) {
        return response.data;
      },
      function (error) {
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
                refreshPromise = refreshUserToken().then(data => {
                  refreshPromise = null;
                });
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

  /**
   * 获取 Access Token
   * @returns {string | undefined}
   */
  private _getAccessToken(): string | undefined {
    const tokenExpires = Cookies.get('access_token_expires') || '0';
    const expiresTime = new Date(Number(tokenExpires)).getTime();
    const curTime = new Date().getTime();

    // 判断是否快要过期
    if (expiresTime - curTime <= 60 * 60 * 1000) {
      return undefined;
    }

    return Cookies.get('access_token');
  }

  /**
   * 获取平台授权码
   * @returns {string}
   */
  private _getAuthorization(): string {
    const authorizations = this._getAuthorizations();
    let authorization = '';

    if (isApp()) {
      authorization = isIOS() ? authorizations.IOS : authorizations.ANDROID;
    } else {
      authorization = isMobile() ? authorizations.MOBILE : authorizations.PC;
    }

    return authorization;
  }

  /**
   * 获取平台授权信息
   * @returns {Record<string, string>}
   */
  private _getAuthorizations(): Record<string, string> {
    let authorizations: Record<string, string> = {};

    if (__isDEV__) {
      authorizations = AuthorizationsDev;
    } else if (window.location.origin.indexOf('prebitgame') >= 0) {
      authorizations = AuthorizationsPre;
    } else {
      authorizations = AuthorizationsPrd;
    }

    return authorizations;
  }
}

const requests: IRequests = Requests.getInstance();

export default requests;
