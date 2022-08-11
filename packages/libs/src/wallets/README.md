<h1 align="center">Wallets</h1>
<p align="center">
  <strong>钱包适配器，解决各个钱包功能相同但API不同问题，方便调用，统一管理</strong>
  <br/>
  <span>+ 支持通过自定义事件（WALLETS_ACCOUNT_CHANGE）监听账户切换</span><br />
  <span>+ 支持Binance，Metamask，Tronlink</span><br />
</p>

## 如何使用 Wallets

```js
import wallets from "@libs/wallets";
```

## 属性

#### wallets.WalletName

钱包名称

##### Usage

```js
wallets.WalletName;
```

##### Returns

| Property             | Type   | Description |
| -------------------- | ------ | ----------- |
| WalletName.META_MASK | string | Metamask    |
| WalletName.BINANCE   | string | Binance     |
| WalletName.TRON_LINK | string | Tronlink    |

##### Example

```js
import wallets from "@libs/wallets";

const canBeUsed = wallets.canBeUsed(wallets.WalletName.META_MASK);
```

---

#### wallets.WalletEventType

钱包事件类型

##### Usage

```js
wallets.WalletEventType;
```

##### Returns

| Property                       | Type   | Description |
| ------------------------------ | ------ | ----------- |
| WalletEventType.LOGIN          | string | 登录        |
| WalletEventType.LOGIN_CANCEL   | string | 取消登录    |
| WalletEventType.RESET          | string | 重置        |
| WalletEventType.ACCOUNT_CHANGE | string | 账户变更    |

##### Example

```js
import wallets from "@libs/wallets";

// 钱包登录
window.dispatchEvent(
  new CustomEvent(wallets.WalletEventType.LOGIN, {
    detail: { name: wallets.WalletName.META_MASK },
  })
);

// 取消登录
window.dispatchEvent(
  new CustomEvent(wallets.WalletEventType.LOGIN_CANCEL, {
    detail: { name: wallets.WalletName.META_MASK },
  })
);

// 重置钱包
window.dispatchEvent(new CustomEvent(wallets.WalletEventType.RESET));

// 监听钱包账户变更
window.addEventListener(wallets.WalletEventType.ACCOUNT_CHANGE, (evt: any) => {
  const detail = evt.detail;
  // 钱包名称
  const name = detail.type;
  // 钱包地址
  const address = detail.address;

  todo(name, address);
});
```

---

#### wallets.useWallets

钱包 Hook，一般用于更新钱包状态

##### Usage

```js
wallets.useWallets({ name, onLogin, onCancel, onChange, onReset });
```

##### Returns

| Property                | Type                                    | Description        |
| ----------------------- | --------------------------------------- | ------------------ |
| name                    | string                                  | 钱包名称           |
| onLogin(name)           | (name: string) => void                  | 钱包登录（非必传） |
| onCancel                | () => void                              | 取消登录（非必传） |
| onChange(name, address) | (name: string, address: string) => void | 钱包更改（非必传） |
| onReset                 | () => void                              | 钱包重置（非必传） |

##### Example

```js
import wallets from "@libs/wallets";

// MetaMask
export const ButtonMetaMaskLogin = (): JSX.Element => {
  const isLoading = useWallet({ type: wallets.walletsName.META_MASK });

  return (
    <div className={isLoading ? "walletLoginBtn loading" : "walletLoginBtn"}>
      <SVG src={Assets.btnMetamask} />
    </div>
  );
};
```

---

## 方法

#### wallets.canBeUsed()

判断钱包是否可用

##### Usage

```js
wallets.canBeUsed(name);
```

##### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| name      | string | 钱包名称    |

##### Returns

boolean

##### Example

```js
import wallets from "@libs/wallets";

const canBeUsed = wallets.canBeUsed(wallets.WalletName.META_MASK);

// 判断钱包是否可用
if (!canBeUsed) {
  // 提示下载
  WalletsDownLoad.show({ type: wallets.WalletName.META_MASK });

  // 重置钱包
  window.dispatchEvent(new CustomEvent(wallets.WalletEventType.RESET));

  return;
}
```

---

#### wallets.getAddress()

获取钱包地址

##### Usage

```js
wallets.getAddress(name);
```

##### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| name      | string | 钱包名称    |

##### Returns

string

##### Example

```js
import wallets from "@libs/wallets";

(async (): Promise<void> => {
  const address = await wallets.getAddress(wallets.WalletName.META_MASK);

  if (address !== "") {
    // 钱包不支持提示
    error(i18n.t("wallets:noSupport"));

    // 重置钱包
    window.dispatchEvent(new CustomEvent(wallets.WalletEventType.RESET));

    return;
  }

  todo();
})();
```

---

#### wallets.getSignature()

获取钱包签名

##### Usage

```js
wallets.getSignature(name, message, address);
```

##### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| name      | string | 钱包名称    |
| message   | string | 签名信息    |
| address   | string | 钱包地址    |

##### Returns

string

##### Example

```js
import { getSignData } from "@/services/wallets";
import wallets from "@libs/wallets";

(async (): Promise<void> => {
  // 钱包名称
  const name = wallets.WalletName.META_MASK;
  // 获取钱包地址
  const address = await wallets.getAddress(name);
  // 获取签名信息
  const message = await getSignData({ name, address });
  // 获取signature
  const signature = await wallets.getSignature(name, message, address);

  todo();
})();
```
