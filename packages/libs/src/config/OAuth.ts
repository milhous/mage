/**
 * 第三方验证所需（登录注册 & 人机校验）
 * @property facebook AppId
 * @property google ClientId
 * @property kakao JsKey
 * @property telegram BotName
 * @property google reCAPTCHA（人机校验）
 */
const thirdPartyDev = {
  facebookAppId: '485593582231529',
  googleClientId: '718667871755-l4k4epfsgtmo2vqpdqamlk229b92r34m.apps.googleusercontent.com',
  kakaoJsKey: '99b9f42d09ffd583f269cc70f3ea1bf0',
  telegramBotName: 'bitgamesys_bot',
  googleReCAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
  loginSignUpBasicAndroid: 'YW5kcm9pZDplOGJhMDY0ZGY2OTg1NTIyODgzZjE5ODZmZjRkZWIwNQ==',
  loginSignUpBasicIOS: 'aW9zOmI2Zjg4NjY4MDk2ODUwZTQ5NDNjMzhkZmEwNTAyY2M5',
};

const thirdPartyPre = {
  facebookAppId: '485593582231529',
  googleClientId: '611123614153-b55huj020b3enfp9t5dururttgp4so8d.apps.googleusercontent.com',
  kakaoJsKey: '99b9f42d09ffd583f269cc70f3ea1bf0',
  telegramBotName: 'bitgame_prebot',
  googleReCAPTCHA: '6Le3x6cZAAAAAHz8tdeE4SGmAYqRAJDP0WhFcoVM',
  loginSignUpBasicAndroid: 'YW5kcm9pZDozZGQ0ZTYwYTdkYmQ1ZGNiYmI4ZmQxYzUwMzQ2OWM1Yg==',
  loginSignUpBasicIos: 'aW9zOjQzM2FmOWI0Y2VmYjU2ZjA4NzI0OGJkODliZWU4Yzg5',
};

const thirdPartyPrd = {
  facebookAppId: '351365382504829',
  googleClientId: '200625764429-due8sjbk63ks1d0sd073gs14ivpc16vp.apps.googleusercontent.com',
  kakaoJsKey: '0979e7750dcddabf3128de820567184a',
  telegramBotName: 'bitgame_robot',
  googleReCAPTCHA: '6LeDDLQZAAAAAK-BZ4NXBP9HN5MnDSSg4dJ99LJ6',
  loginSignUpBasicAndroid: 'YW5kcm9pZDpkMWJiNWU4MjQwNzE1ZDdjYjg4NTFhOGM2YzhmMGZiNA==',
  loginSignUpBasicIos: 'aW9zOjY2YzUwMjBmZGJmNTVmNDE4ZTliMzA1Mjg4NTczNjA2',
};

/**
 * 平台授权（http请求）
 */
const authorizationDev = {
  mobile: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  pc: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
};

const authorizationPre = {
  mobile: 'd2FwOkE1NVZ2THVRMmJlZWdoajQ1amxpcVp3YXI2RGNSMXdjWWxrVw==',
  pc: 'd3d3OjNBVVNYWG9leVdTQ3ZqdmNqb25MdTRXWnZqQTU1VnZMdVEyYlp3YXI2RA==',
};

const authorizationPrd = {
  mobile: 'd2FwOjRjNmRlZjBhN2RBMTA1MGFmRDhlNjg3YmE2YjRhRmRkYzY1',
  pc: 'd3d3OmNiYmRBNTQ0NWIwMDU1M2ViYlMyMmMyUmE3YmM5OTYzZmRh',
};
