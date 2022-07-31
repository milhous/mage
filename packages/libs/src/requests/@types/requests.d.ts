/**
 * 声明 - 请求
 * @method send 发送
 */
declare interface IRequests {
  send(url: string, method: Method = 'get', data: any, headers: any = {}): AxiosPromise<any> | null;
}
