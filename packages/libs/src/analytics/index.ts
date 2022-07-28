// This import loads the firebase namespace
import {FirebaseApp, initializeApp} from 'firebase/app';
import {getAnalytics, logEvent, isSupported, Analytics} from 'firebase/analytics';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database';

import {getQueryParams} from '../utils';
import {getCurLang} from '../i18n';

const firebaseConfig = {
  dev: {
    apiKey: 'AIzaSyD_115yzKqAO-OIzinR3GTr_Ik_92jt334',
    authDomain: 'bitgame-test-d8df4.firebaseapp.com',
    projectId: 'bitgame-test-d8df4',
    storageBucket: 'bitgame-test-d8df4.appspot.com',
    messagingSenderId: '432365561443',
    appId: '1:432365561443:web:f2566048b177142ae43a56',
    measurementId: 'G-2GE0SW9ZJ6',
  },
  pre: {
    apiKey: 'AIzaSyD4e6FZ0a53ytMn1aeysfh9g2sGKZAuhHQ',
    authDomain: 'bitgame-pre-fd2ab.firebaseapp.com',
    projectId: 'bitgame-pre-fd2ab',
    storageBucket: 'bitgame-pre-fd2ab.appspot.com',
    messagingSenderId: '843599532928',
    appId: '1:843599532928:web:029cea4d911fd33345a765',
    measurementId: 'G-CJ4LPQKRR2',
  },
  prod: {
    apiKey: 'AIzaSyDFKXXah8Rl-xxaNjcvi8eh0yQkrLz-SBs',
    authDomain: 'bitgame-4e5b2.firebaseapp.com',
    projectId: 'bitgame-4e5b2',
    storageBucket: 'bitgame-4e5b2.appspot.com',
    messagingSenderId: '171655153982',
    appId: '1:171655153982:web:4b36df20f360114433046f',
    measurementId: 'G-QVWJFQS8N1',
  },
};

/**
 * 声明 - 事件参数
 * @param {number | string} id ID
 * @param {string} desc 描述
 * @param {string} type 类型
 * @param {string} link 跳转链接
 * @param {string} origin 来源
 * @param {string} lang 语言
 * @param {string} platform 平台
 * @param {string} position 位置
 * @param {string} name 名称
 * @param {string} coin 币种
 */
interface IEventParams {
  desc?: string;
  id?: number | string;
  type?: string;
  link?: string;
  origin?: string;
  lang?: string;
  platform?: string;
  position?: string;
  name?: string;
  coin?: string;
  [propName: string]: any;
}

// 登录类型
const loginType = {
  BITGAME: 'bitgame',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
  LINE: 'line',
  KAKAO: 'kakao',
  TELEGRAM: 'telegram',
  TRON_LINK: 'tronlink',
  META_MASK: 'metamask',
  BINANCE: 'binance_chain_wallet',
};

// 第三方兑换类型
const cryptoExchangeType = {
  CHANGELLY: 'changelly',
  PAXFUL: 'paxful',
};

// 统计分析
class BTGAnalytics {
  static VERSION = '1.0.0';

  // Firebase App
  private _app: FirebaseApp | null = null;
  // Firebase Analytics
  private _analytics: Analytics | null = null;
  // 浏览器语言
  private _browserLang = '';
  // 平台浏览器
  private _platformLang = '';
  // 平台
  private _platform = '';

  constructor() {
    this._initFirebase();
  }

  // 登录类型
  get loginType() {
    return loginType;
  }

  // 第三方兑换平台
  get cryptoExchangeType() {
    return cryptoExchangeType;
  }

  // 初始化Firebase
  private _initFirebase(): void {
    let config = firebaseConfig.prod;

    if (__isDEV__) {
      config = firebaseConfig.dev;
    } else if (window.location.origin.indexOf('prebitgame') >= 0) {
      // 没有严格区分预发和产线，需要额外判断
      config = firebaseConfig.pre;
    }

    // Initialize Firebase
    isSupported().then(result => {
      if (result) {
        this._app = initializeApp(config);
        this._analytics = getAnalytics(this._app);
      }
    });
  }

  /**
   * 获取浏览器语言
   * @returns {string} lang
   */
  private _getBrowserLanguage(): string {
    let lang = window.navigator.language;

    lang = lang ? lang.split('-')[0] : 'en';

    return lang;
  }

  // 获取平台
  private _getPlatform(): string {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad/.test(userAgent);
    const isApp = 'native' in window;
    const isIOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    let platform = 'Desktop';

    if (isApp) {
      platform = isIOS ? 'IOS' : 'Android';
    } else if (isMobile) {
      platform = 'Mobile';
    }

    return platform;
  }

  /**
   * 自定义事件
   * @param {string} eventName 事件名称
   * @param {IEventParams} eventParams 事件参数
   */
  public customEvent(eventName: string, eventParams?: IEventParams): void {
    if (!!this._analytics) {
      this._platform = this._getPlatform();
      this._platformLang = getCurLang();
      this._browserLang = this._getBrowserLanguage();

      const params = {
        btg_platform: this._platform,
        btg_platform_lang: this._platformLang,
        btg_browser_lang: this._browserLang,
        btg_app_version: window.navigator.appVersion,
      };

      let name = eventName;

      if (!!eventParams && Object.keys(eventParams).length) {
        const extras: string[] = [];

        for (const key in eventParams) {
          const val = eventParams[key];

          if (key !== 'desc') {
            extras.push(val);
          }

          params['btg_' + key] = val;
        }

        if (extras.length) {
          name += '@' + extras.join('_');
        }
      }

      logEvent(this._analytics, name, params);

      const debug: string = getQueryParams('GodMode');

      if (debug === '1' || __isDEV__) {
        console.log('BTGAnalytics eventName:', name);
        console.log('BTGAnalytics eventParams:', params);
      }
    }
  }
}

export default new BTGAnalytics();
