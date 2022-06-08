// location.hostname

// 获取host
const hostname = document.location.hostname;
export const domainHost = hostname.split('.').slice(-2).join('.');
export const secondaryDomainName = hostname.split('.')[0];
export const prefix = secondaryDomainName.split('-')[0];
