/**
 * 第三方验证所需（登录注册 & 人机校验）
 * @property facebook AppId
 * @property google ClientId
 * @property kakao JsKey
 * @property telegram BotName
 * @property google reCAPTCHA（人机校验）
 */
export const thirdPartyDev = {
  facebookAppId: '485593582231529',
  googleClientId: '718667871755-l4k4epfsgtmo2vqpdqamlk229b92r34m.apps.googleusercontent.com',
  kakaoJsKey: '99b9f42d09ffd583f269cc70f3ea1bf0',
  telegramBotName: 'bitgamesys_bot',
  googleReCAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
};

export const thirdPartyPre = {
  facebookAppId: '485593582231529',
  googleClientId: '611123614153-b55huj020b3enfp9t5dururttgp4so8d.apps.googleusercontent.com',
  kakaoJsKey: '99b9f42d09ffd583f269cc70f3ea1bf0',
  telegramBotName: 'bitgame_prebot',
  googleReCAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
};

export const thirdPartyPrd = {
  facebookAppId: '351365382504829',
  googleClientId: '200625764429-due8sjbk63ks1d0sd073gs14ivpc16vp.apps.googleusercontent.com',
  kakaoJsKey: '0979e7750dcddabf3128de820567184a',
  telegramBotName: 'bitgame_robot',
  googleReCAPTCHA: '6LeDDLQZAAAAAK-BZ4NXBP9HN5MnDSSg4dJ99LJ6',
};

/**
 * 平台授权（http请求）
 * @property {string} MOBILE 移动端浏览器
 * @property {string} PC 电脑端浏览器
 * @property {string} ANDROID 安卓APP
 * @property {string} IOS 苹果APP
 */
export const AuthorizationsDev = {
  MOBILE: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  PC: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
  ANDROID: 'YW5kcm9pZDplOGJhMDY0ZGY2OTg1NTIyODgzZjE5ODZmZjRkZWIwNQ==',
  IOS: 'aW9zOmI2Zjg4NjY4MDk2ODUwZTQ5NDNjMzhkZmEwNTAyY2M5',
};

export const AuthorizationsPre = {
  MOBILE: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  PC: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
  ANDROID: 'YW5kcm9pZDozZGQ0ZTYwYTdkYmQ1ZGNiYmI4ZmQxYzUwMzQ2OWM1Yg==',
  IOS: 'aW9zOjQzM2FmOWI0Y2VmYjU2ZjA4NzI0OGJkODliZWU4Yzg5',
};

export const AuthorizationsPrd = {
  MOBILE: 'd2FwOjRjNmRlZjBhN2RBMTA1MGFmRDhlNjg3YmE2YjRhRmRkYzY1',
  PC: 'd3d3OmNiYmRBNTQ0NWIwMDU1M2ViYlMyMmMyUmE3YmM5OTYzZmRh',
  ANDROID: 'YW5kcm9pZDpkMWJiNWU4MjQwNzE1ZDdjYjg4NTFhOGM2YzhmMGZiNA==',
  IOS: 'aW9zOjY2YzUwMjBmZGJmNTVmNDE4ZTliMzA1Mjg4NTczNjA2',
};
