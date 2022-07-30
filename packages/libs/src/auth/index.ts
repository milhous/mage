import dayjs from 'dayjs';
import Cookies from 'js-cookie';

import {CookiesKey} from '@app/config';
import {AuthorizationsDev, AuthorizationsPre, AuthorizationsPrd} from '@app/config/OAuth';
import {isMobile, isApp, isIOS} from '@app/utils';

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

  constructor() {}

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

  clear() {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('wallet_address');
    Cookies.remove('wallet_type');
    Cookies.remove('access_token_expires');
    Cookies.remove('refresh_token_expires');
    Cookies.remove('share_invite_code');
    _accessToken = undefined;
    _refreshToken = undefined;
    _walletAddress = undefined;
    _walletType = undefined;
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
    const token = this._getAccessToken();
    const authorization = this._getAuthorization();

    headers['Authorization'] = headers?.Authorization && token ? `Bearer ${token}` : `Basic ${authorization}`;

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

const auth: IAuth = Auth.getInstance();

export default auth;
