import Web3Utils from 'web3-utils';

import { WalletsName, WalletsEventType } from '../config';

// 狐狸钱包
export default class MethodMetamask {
  // 类型
  static type = WalletsName.META_MASK;

  constructor() {
    this._init();
  }

  // 是否可使用
  static canBeUsed(): boolean {
    return typeof window !== 'undefined' && typeof (window as any).ethereum !== 'undefined';
  }

  // 初始化
  private _init(): void {
    (window as any).ethereum.on('accountsChanged', (accounts: any) => {
      const address = this._getAddressByAccount(accounts);
      const detail = {
        type: MethodMetamask.type,
        address,
      };

      window.dispatchEvent(new CustomEvent(WalletsEventType.ACCOUNT_CHANGE, { detail }));
    });
  }

  /**
   * 通过账户信息获取地址
   * @param {Array<string>} accounts 账户信息
   * @return {string} address
   */
  private _getAddressByAccount(accounts: string[]): string {
    let address = '';

    if (Array.isArray(accounts) && accounts.length && typeof accounts[0] === 'string') {
      address = accounts[0];
    }

    return address;
  }

  /**
   * 获取钱包地址
   * @return {string} address
   */
  public async getAddress(): Promise<string> {
    const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
    const address = this._getAddressByAccount(accounts);

    return address;
  }

  /**
   * 获取钱包签名
   * @param {string} address 钱包地址
   * @param {string} message 签名数据
   * @returns {string} signature
   */
  public async getSignature(message: string, address: string): Promise<string> {
    const signature = await (window as any).ethereum.request({
      method: 'personal_sign',
      params: [Web3Utils.utf8ToHex(message), address],
    });

    return signature;
  }
}
