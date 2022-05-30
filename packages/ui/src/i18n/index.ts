// eslint-disable-next-line @typescript-eslint/no-unused-vars
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Cookies from 'js-cookie';
import {initReactI18next, useTranslation} from 'react-i18next';

export type ILangType = 'en' | 'vi' | 'ja' | 'ko' | 'zh-Hans' | 'zh-Hant' | 'tr' | 'pt' | 'es';

export type ILangInfo = {lang: ILangType; alias: string; oldStandard: string};

export const LangConfigs: ILangInfo[] = [
  {lang: 'en', alias: 'English', oldStandard: 'en'},
  {lang: 'vi', alias: 'Tiếng Việt', oldStandard: 'vi'},
  {lang: 'ja', alias: '日本語', oldStandard: 'ja'},
  {lang: 'ko', alias: '한국어', oldStandard: 'ko'},
  {lang: 'tr', alias: 'Türkçe', oldStandard: 'tr'},
  {lang: 'pt', alias: 'Português', oldStandard: 'pt'},
  {lang: 'es', alias: 'Español', oldStandard: 'es'},
  {lang: 'zh-Hans', alias: '简体中文', oldStandard: 'zh-CN'},
  {lang: 'zh-Hant', alias: '繁體中文', oldStandard: 'zh-TW'},
];

// export const Langs = window.supportedLngs || (LangConfigs.map(v => v.lang) as LangType[]);

// i18n.changeLanguage('en');

/**
 * 获取支持语言列表
 * @returns {Array<string>}
 */
export const getSupportedLangs = (): string[] => {
  const langs = LangConfigs.map(v => v.lang);

  return langs;
};

/**
 * 获取当前语言
 * @returns {string}
 */
export const getLang = (): string => {
  const lang = Cookies.get('lang') || i18n.language || 'en';

  if (LangConfigs.find(v => v.lang === lang)) {
    return lang;
  } else {
    return 'en';
  }
};

/**
 * 获取翻译文案
 * @param {string} key 翻译key
 * @returns {string}
 */
export const getTranslate = (key: string): string => {
  return i18n.t(key);
};

/**
 * 获取 Translate Hook
 * @param {Array<string>} ns 命名空间
 * @returns {any}
 */
export const useTranslate = (ns: string[]): any => {
  const {t} = useTranslation(ns, {i18n});
  return t;
};

// 切换语言
export const changeLang = (lang: string): void => {
  i18n.changeLanguage(lang);
};

// 转换语言
const convertLangs = (): void => {
  if (typeof navigator === 'undefined' || navigator.languages.length === 0) {
    return;
  }

  const supportedLangs = getSupportedLangs();
  const navigatorLangs = new Set([navigator.language, ...navigator.languages]);
  const fallbackLangs: {[key: string]: string} = {
    'zh-CN': 'zh-Hans',
    'zh-TW': 'zh-Hant',
  };

  for (const code of navigatorLangs) {
    let lang = null;

    if (supportedLangs.includes(code)) {
      lang = code;
    } else if (code in fallbackLangs) {
      lang = fallbackLangs['' + code];
    }

    if (!!lang) {
      sessionStorage.setItem('i18nextLng', lang);

      break;
    }
  }
};

convertLangs();

const i18n = i18next.createInstance();

i18n
  // load translation using xhr -> see /public/locales
  .use(HttpApi)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options

  .init({
    react: {transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'span', 'a']},
    supportedLngs: getSupportedLangs(),
    ns: [] /* 'common' */,
    defaultNS: 'common',
    // debug: true,
    // nonExplicitSupportedLngs: false,
    load: 'currentOnly',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    initImmediate: false,
    // `/${APP_NAME}/locales/{{lng}}/{{ns}}.json`,
    backend: {
      loadPath: `${__webpack_public_path__}static/locales/{{lng}}/{{ns}}.json`,
      queryStringParams: {v: 'APP_GITHASH'},
    },
    detection: {
      htmlTag: document.documentElement,
      lookupSessionStorage: 'i18nextLng',
      lookupCookie: 'lang',
      caches: ['cookie'],
      cookieMinutes: 60 * 24 * 365,
      cookieOptions: {path: '/', sameSite: false},
    },
  });

export default i18n;
