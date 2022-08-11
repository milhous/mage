import './@types/wallets.d';

import {WalletName, WalletEventType} from './config';

// 币安钱包
import MethodBinance from './methods/MethodBinance';
// 狐狸钱包
import MethodMetamask from './methods/MethodMetamask';
// 波场钱包
import MethodTronlink from './methods/MethodTronlink';

// 钱包管理
class Wallets implements IWallets {
  static VERSION = '1.0.0';

  // 币安钱包
  private _walletBinance: any = null;
  // 狐狸钱包
  private _walletMetamask: any = null;
  // 波场钱包
  private _walletTronlink: any = null;

  constructor() {}

  static instance: IWallets;

  static getInstance(): IWallets {
    if (!Wallets.instance) {
      Wallets.instance = new Wallets();
    }

    return Wallets.instance;
  }

  // 钱包名称
  get WalletName(): IWalletName {
    return WalletName;
  }

  // 钱包事件
  get WalletEventType(): IWalletEventType {
    return WalletEventType;
  }

  /**
   * 是否可使用
   * @param {string} name 钱包名称
   * @return {boolean} result
   */
  public canBeUsed(name: string): boolean {
    let result = false;

    switch (name) {
      case WalletName.BINANCE:
        result = MethodBinance.canBeUsed();

        break;
      case WalletName.META_MASK:
        result = MethodMetamask.canBeUsed();

        break;
      case WalletName.TRON_LINK:
        result = MethodTronlink.canBeUsed();

        break;
    }

    return result;
  }

  /**
   * 获取钱包地址
   * @param {string} name 钱包名称
   * @return {string} address
   */
  public async getAddress(name: string): Promise<string> {
    let address = '';
    const wallet = this._getWallet(name);

    if (!!wallet) {
      address = await wallet.getAddress();
    }

    return address;
  }

  /**
   * 获取钱包签名
   * @param {string} name 钱包名称
   * @param {string} address 钱包地址
   * @param {string} message 签名数据
   * @returns {string} signature
   */
  public async getSignature(name: string, message: string, address: string): Promise<string> {
    let signature = '';
    const wallet = this._getWallet(name);

    if (!!wallet) {
      signature = await wallet.getSignature(message, address);
    }

    return signature;
  }

  /**
   * 获取钱包
   * @param {string} name 钱包名称
   * @return {Object} wallet
   */
  private _getWallet(name: string): any {
    let wallet = null;

    switch (name) {
      case WalletName.BINANCE:
        if (this._walletBinance === null) {
          this._walletBinance = new MethodBinance();
        }

        wallet = this._walletBinance;

        break;
      case WalletName.META_MASK:
        if (this._walletMetamask === null) {
          this._walletMetamask = new MethodMetamask();
        }

        wallet = this._walletMetamask;

        break;
      case WalletName.TRON_LINK:
        if (this._walletTronlink === null) {
          this._walletTronlink = new MethodTronlink();
        }

        wallet = this._walletTronlink;

        break;
    }

    return wallet;
  }
}

const wallets: IWallets = Wallets.getInstance();

export default wallets;
