import {WalletName, WalletEventType} from '../config';

// 波场钱包
export default class MethodTronlink {
  // 类型
  static WalletName = WalletName.TRON_LINK;

  constructor() {
    this._init();
  }

  // 是否可使用
  static canBeUsed(): boolean {
    return typeof window !== 'undefined' && 'tronWeb' in window && (window as any).tronWeb.defaultAddress.base58;
  }

  /**
   * 获取钱包地址
   * @return {string} address
   */
  public async getAddress(): Promise<string> {
    const accounts = (window as any).tronWeb.defaultAddress;
    const address = this._getAddressByAccount(accounts);

    return address;
  }

  /**
   * 获取钱包签名
   * @param {string} address 钱包地址
   * @returns {string} signature
   */
  public async getSignature(message: string): Promise<string> {
    const signature = await (window as any).tronWeb.trx.sign(message);

    return signature;
  }

  // 初始化
  private _init(): void {
    (window as any).tronWeb.on('addressChanged', (account: any) => {
      const address = this._getAddressByAccount(account);
      const detail = {
        name: WalletName.TRON_LINK,
        address,
      };

      window.dispatchEvent(new CustomEvent(WalletEventType.ACCOUNT_CHANGE, {detail}));
    });
  }

  /**
   * 通过账户信息获取地址
   * @param {Object} accounts 账户信息
   * @return {string} address
   */
  private _getAddressByAccount(accounts: any): string {
    let address = '';

    if (accounts.hasOwnProperty('base58') && typeof accounts.base58 === 'string') {
      address = accounts.base58;
    }

    return address;
  }
}
