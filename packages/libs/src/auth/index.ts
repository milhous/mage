import dayjs from 'dayjs';
import Cookies from 'js-cookie';

import {CookiesKey} from '../config';
import {AuthorizationsDev, AuthorizationsPre, AuthorizationsPrd} from '../config/auth';
import {isMobile, isApp, isIOS} from '../utils';

import './@types/auth.d';

// 授权验证
class Auth implements IAuth {
  static VERSION = '1.0.0';

  // 用户令牌
  private _accessToken: string | undefined = undefined;
  // 刷新令牌
  private _refreshToken: string | undefined = undefined;
  // 钱包类型
  private _walletType: string | undefined = undefined;
  // 钱包地址
  private _walletAddress: string | undefined = undefined;

  constructor() {
    this._accessToken = Cookies.get(CookiesKey.ACCESS_TOKEN);
    this._refreshToken = Cookies.get(CookiesKey.REFRESH_TOKEN);
    this._walletType = Cookies.get(CookiesKey.WALLET_TYPE);
    this._walletAddress = Cookies.get(CookiesKey.WALLET_ADDRESS);
  }

  static instance: IAuth;

  static getInstance(): IAuth {
    if (!Auth.instance) {
      Auth.instance = new Auth();
    }

    return Auth.instance;
  }

  /**
   *
   * @param {IAuthInitProps} props 用户令牌有效期
   */
  init(props: IAuthInitProps): void {
    const {accessToken, refreshToken, exp, walletAddress, walletType} = props;

    this._accessToken = accessToken;
    this._refreshToken = refreshToken;
    this._walletType = walletType;
    this._walletAddress = walletAddress;

    // 用户令牌有效日期
    const accessTokenExpireDate = dayjs(Number(exp)).toDate();

    // 用户令牌
    Cookies.set(CookiesKey.ACCESS_TOKEN, accessToken, {
      expires: accessTokenExpireDate,
    });

    // 用户令牌有效期
    Cookies.set(CookiesKey.ACCESS_TOKEN_EXPIRES, accessTokenExpireDate.getTime().toString(), {
      expires: accessTokenExpireDate,
    });

    // 刷新令牌有效日期
    const refreshTokenExpireDate = dayjs(Number(exp)).add(30, 'days').toDate();

    // 用来刷新用户令牌的令牌，设置为30天过期
    if (refreshToken) {
      Cookies.set('refresh_token', refreshToken, {
        expires: refreshTokenExpireDate,
      });
    }

    Cookies.set('refresh_token_expires', refreshTokenExpireDate.getTime().toString(), {
      expires: refreshTokenExpireDate,
    });

    //如果是钱包登录的需要本地记录钱包信息
    if (!!walletType && !!walletAddress) {
      Cookies.set(CookiesKey.WALLET_TYPE, walletType, {
        expires: refreshTokenExpireDate,
      });

      Cookies.set(CookiesKey.WALLET_ADDRESS, walletAddress, {
        expires: refreshTokenExpireDate,
      });
    }
  }

  // 清理
  clear() {
    this._accessToken = undefined;
    this._refreshToken = undefined;
    this._walletAddress = undefined;
    this._walletType = undefined;

    Cookies.remove(CookiesKey.ACCESS_TOKEN);
    Cookies.remove(CookiesKey.ACCESS_TOKEN_EXPIRES);
    Cookies.remove(CookiesKey.REFRESH_TOKEN);
    Cookies.remove(CookiesKey.REFRESH_TOKEN_EXPIRES);
    Cookies.remove(CookiesKey.WALLET_TYPE);
    Cookies.remove(CookiesKey.WALLET_ADDRESS);
    Cookies.remove(CookiesKey.SHARE_INVITE_CODE);
  }

  /**
   * 获取用户令牌
   * @returns {string | undefined}
   */
  public getAccessToken(): string | undefined {
    const tokenExpires = Cookies.get(CookiesKey.ACCESS_TOKEN_EXPIRES) || '0';
    const expiresTime = new Date(Number(tokenExpires)).getTime();
    const curTime = new Date().getTime();

    // 判断是否快要过期
    if (expiresTime - curTime <= 60 * 60 * 1000) {
      return undefined;
    }

    return this._accessToken;
  }

  /**
   * 获取平台授权码
   * @param {boolean} isToken 是否需要含有token授权码
   * @returns {string}
   */
  public getAuthorization(isToken = false): string {
    const token = this.getAccessToken();
    let authorization = '';

    if (isToken && !!token) {
      authorization = token;
    } else {
      const authorizations = this._getAuthorizations();

      if (isApp()) {
        authorization = isIOS() ? authorizations.IOS : authorizations.ANDROID;
      } else {
        authorization = isMobile() ? authorizations.MOBILE : authorizations.PC;
      }
    }

    return `Basic ${authorization}`;
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

const auth: IAuth = Auth.getInstance();

export default auth;
