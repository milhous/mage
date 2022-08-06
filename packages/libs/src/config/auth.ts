/**
 * 第三方验证所需（登录注册 & 人机校验）
 * @property {string} facebook AppId
 * @property {string} google ClientId
 * @property {string} kakao JsKey
 * @property {string} telegram BotName
 * @property {string} google reCAPTCHA（人机校验）
 */
interface IThirdParty {
  FACEBOOK_APPID: string;
  GOOGLE_CLIENTID: string;
  KAKAO_JSKEY: string;
  TELEGRAM_BOTNAME: string;
  GOOGLE_RECAPTCHA: string;
}

/**
 * 平台授权（http请求）
 * @property {string} MOBILE 移动端浏览器
 * @property {string} PC 电脑端浏览器
 * @property {string} ANDROID 安卓APP
 * @property {string} IOS 苹果APP
 */
interface IAuthorizations {
  MOBILE: string;
  PC: string;
  ANDROID: string;
  IOS: string;
}

// 第三方验证所需（开发环境）
export const ThirdPartyDev: IThirdParty = {
  FACEBOOK_APPID: '485593582231529',
  GOOGLE_CLIENTID: '718667871755-l4k4epfsgtmo2vqpdqamlk229b92r34m.apps.googleusercontent.com',
  KAKAO_JSKEY: '99b9f42d09ffd583f269cc70f3ea1bf0',
  TELEGRAM_BOTNAME: 'bitgamesys_bot',
  GOOGLE_RECAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
};

// 第三方验证所需（预发环境）
export const ThirdPartyPre: IThirdParty = {
  FACEBOOK_APPID: '485593582231529',
  GOOGLE_CLIENTID: '611123614153-b55huj020b3enfp9t5dururttgp4so8d.apps.googleusercontent.com',
  KAKAO_JSKEY: '99b9f42d09ffd583f269cc70f3ea1bf0',
  TELEGRAM_BOTNAME: 'bitgame_prebot',
  GOOGLE_RECAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
};

// 第三方验证所需（生产环境）
export const ThirdPartyPrd: IThirdParty = {
  FACEBOOK_APPID: '351365382504829',
  GOOGLE_CLIENTID: '200625764429-due8sjbk63ks1d0sd073gs14ivpc16vp.apps.googleusercontent.com',
  KAKAO_JSKEY: '0979e7750dcddabf3128de820567184a',
  TELEGRAM_BOTNAME: 'bitgame_robot',
  GOOGLE_RECAPTCHA: '6LeDDLQZAAAAAK-BZ4NXBP9HN5MnDSSg4dJ99LJ6',
};

// 平台授权（开发环境）
export const AuthorizationsDev: IAuthorizations = {
  MOBILE: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  PC: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
  ANDROID: 'YW5kcm9pZDplOGJhMDY0ZGY2OTg1NTIyODgzZjE5ODZmZjRkZWIwNQ==',
  IOS: 'aW9zOmI2Zjg4NjY4MDk2ODUwZTQ5NDNjMzhkZmEwNTAyY2M5',
};

// 平台授权（预发环境）
export const AuthorizationsPre: IAuthorizations = {
  MOBILE: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  PC: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
  ANDROID: 'YW5kcm9pZDozZGQ0ZTYwYTdkYmQ1ZGNiYmI4ZmQxYzUwMzQ2OWM1Yg==',
  IOS: 'aW9zOjQzM2FmOWI0Y2VmYjU2ZjA4NzI0OGJkODliZWU4Yzg5',
};

// 平台授权（生产环境）
export const AuthorizationsPrd: IAuthorizations = {
  MOBILE: 'd2FwOjRjNmRlZjBhN2RBMTA1MGFmRDhlNjg3YmE2YjRhRmRkYzY1',
  PC: 'd3d3OmNiYmRBNTQ0NWIwMDU1M2ViYlMyMmMyUmE3YmM5OTYzZmRh',
  ANDROID: 'YW5kcm9pZDpkMWJiNWU4MjQwNzE1ZDdjYjg4NTFhOGM2YzhmMGZiNA==',
  IOS: 'aW9zOjY2YzUwMjBmZGJmNTVmNDE4ZTliMzA1Mjg4NTczNjA2',
};

let ThirdParty: IThirdParty;
let Authorizations: IAuthorizations;

if (__isDEV__) {
  Authorizations = AuthorizationsDev;
  ThirdParty = ThirdPartyDev;
} else if (window.location.origin.indexOf('prebitgame') >= 0) {
  Authorizations = AuthorizationsPre;
  ThirdParty = ThirdPartyPre;
} else {
  Authorizations = AuthorizationsPrd;
  ThirdParty = ThirdPartyPrd;
}

export {Authorizations, ThirdParty};
