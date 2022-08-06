/**
 * 声明 - 营销（渠道，分享，邀请）
 * @method send 发送
 */
declare interface IMarketing {
  send(url: string, method: Method, data?: any, headers?: any): AxiosPromise<any>;
}
