import Web3Utils from 'web3-utils';

import {WalletName, WalletEventType} from '../config';

// 币安钱包
export default class MethodBinance {
  // 类型
  static type = WalletName.BINANCE;

  constructor() {
    this._init();
  }

  // 是否可使用
  static canBeUsed(): boolean {
    return typeof window !== 'undefined' && 'BinanceChain' in window;
  }

  /**
   * 获取钱包地址
   * @return {string} address
   */
  public async getAddress(): Promise<string> {
    const accounts = await (window as any).BinanceChain.request({method: 'eth_accounts'});
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
    const signature = await (window as any).BinanceChain.bnbSign(address, Web3Utils.utf8ToHex(message)).then(
      (res: any) => {
        return res.signature;
      },
    );

    return signature;
  }

  // 初始化
  private _init(): void {
    (window as any).BinanceChain.on('accountsChanged', (accounts: any) => {
      const address = this._getAddressByAccount(accounts);
      const detail = {
        name: WalletName.BINANCE,
        address,
      };

      window.dispatchEvent(new CustomEvent(WalletEventType.ACCOUNT_CHANGE, {detail}));
    });
  }

  /**
   * 通过账户信息获取地址
   * @param {Array<string>} accounts 账户信息
   * @return {string} address
   */
  private _getAddressByAccount(accounts: string[]): string {
    let address = '';

    if (
      Array.isArray(accounts) &&
      accounts.length &&
      typeof accounts[0] === 'string' &&
      accounts[0].indexOf('bnb') < 0
    ) {
      address = accounts[0];
    }

    return address;
  }
}
