declare const uploadUri: string;
declare const staticUri: string;
declare const apiUri: string;
declare const gameUri: string;
declare const wsUrl: string;

declare const chnGameUri: string;
declare const backupDomain: string;
declare const matchStatus: string;

// 获取host
const hostname = location.hostname;
const domainHost = hostname.split('.').slice(-2).join('.');
const secondaryDomainName = hostname.split('.')[0];
const prefix = secondaryDomainName.split('-')[0];

let domain = {
  host: location.host,
  apiHost: `api.${domainHost}`,
  staticAssetsUrl: `static.${domainHost}`,
  originStaticAssetsUrl: `static.${domainHost}`,
  uploadUri: '',
  staticUri: '',
  gameUri: '',
  wsUrl: `api.${domainHost}`,
  chnGameUri: '',
  backupDomain: '',
  matchStatus: '1',
  domainHost,
  prefix,
};

if (__isDEV__ && secondaryDomainName !== 'www') {
  domain = {
    ...domain,
    apiHost: `${prefix}-api.${domainHost}`,
    wsUrl: `${prefix}-api.${domainHost}`,
    staticAssetsUrl: `${prefix}-static.${domainHost}`,
    originStaticAssetsUrl: `${prefix}-static.${domainHost}`,
  };
}

// 最终检测一次是否启用了多域名以及域名加速
if (
  typeof uploadUri !== 'undefined' &&
  typeof staticUri !== 'undefined' &&
  typeof apiUri !== 'undefined' &&
  typeof gameUri !== 'undefined' &&
  typeof wsUrl !== 'undefined'
) {
  domain = {
    ...domain,
    apiHost: apiUri,
    staticAssetsUrl: uploadUri,
    uploadUri,
    staticUri,
    gameUri,
    wsUrl,
    chnGameUri,
    backupDomain,
    matchStatus,
  };

  // 特殊判断云环境
  if (domainHost.indexOf('btgame') >= 0) {
    domain = {
      ...domain,
      chnGameUri: domain.gameUri,
      backupDomain: '',
    };
  }
}

export default domain;
