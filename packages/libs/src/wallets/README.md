<h1 align="center">BTGWallets</h1>
<p align="center">
  <strong>钱包适配器，解决各个钱包功能相同但API不同问题，方便调用，统一管理</strong>
  <br/>
  <span>+ 支持通过自定义事件（WALLETS_ACCOUNT_CHANGE）监听账户切换</span><br />
  <span>+ 支持Binance，Metamask，Tronlink</span><br />
</p>

## 如何使用 BTGWallets

```js
import wallets from '@libs/wallets';
```

## 属性 

#### walletsName

钱包名称

##### Usage

```js
wallets.walletsName
```

##### Returns

| Returns                  | Description | Data Type |
| ------------------------ | ----------- | --------- |
| walletsName.META_MASK    | Metamask    | string    |
| walletsName.BINANCE      | Binance     | string    |
| walletsName.TRON_LINK    | Tronlink    | string    |

##### Example

```js
import wallets from '@libs/wallets';

const canBeUsed = wallets.canBeUsed(wallets.walletsName.META_MASK);
```

---

#### WalletsEventType

钱包事件类型

##### Usage

```js
wallets.walletsEventType
```

##### Returns

| Returns                            | Description | Data Type |
| ---------------------------------- | ----------- | --------- |
| walletsEventType.LOGIN             | 登录        | string    |
| walletsEventType.LOGIN_CANCEL      | 取消登录    | string    |
| walletsEventType.RESET             | 重置        | string    |
| walletsEventType.ACCOUNT_CHANGE    | 账户变更    | string    |

##### Example

```js
import wallets from '@libs/wallets';

// 钱包登录
window.dispatchEvent(
  new CustomEvent(wallets.walletsEventType.LOGIN, { detail: { type: wallets.walletsName.META_MASK } }),
);

// 取消登录
window.dispatchEvent(
  new CustomEvent(wallets.walletsEventType.LOGIN_CANCEL, { detail: { type: wallets.walletsName.META_MASK } }),
);

// 重置钱包
window.dispatchEvent(new CustomEvent(wallets.walletsEventType.RESET));

// 监听钱包账户变更
window.addEventListener(wallets.walletsEventType.ACCOUNT_CHANGE, (evt: any) => {
    const detail = evt.detail;
    // 钱包名称
    const name = detail.type;
    // 钱包地址
    const address = detail.address;
    
    todo(name, address);
});
    
```

---

## 方法

#### canBeUsed

判断钱包是否可用

##### Usage

```js
wallets.canBeUsed(name);
```

##### Parameters

string

##### Returns

boolean

##### Example

```js
import wallets from '@libs/wallets';

const canBeUsed = wallets.canBeUsed(wallets.walletsName.META_MASK);

// 判断钱包是否可用
if (!canBeUsed) {
    // 提示下载
    WalletsDownLoad.show({ type: wallets.walletsName.META_MASK });

    // 重置钱包
    window.dispatchEvent(new CustomEvent(wallets.walletsEventType.RESET));

    return;
}
```

---

#### getAddress

获取钱包地址

##### Usage

```js
wallets.getAddress(name)
```

##### Parameters

string

##### Returns

string

##### Example

```js
import wallets from '@libs/wallets';

(async (): Promise<void> => {
    const address = await wallets.getAddress(wallets.walletsName.META_MASK);
    
    if (address !== '') {
        // 钱包不支持提示
        error(i18n.t('wallets:noSupport'));

        // 重置钱包
        window.dispatchEvent(new CustomEvent(wallets.walletsEventType.RESET));
        
        return;
    }
    
    todo();
})();
```

---

#### getSignature

获取钱包签名

##### Usage

```js
wallets.getSignature(name, message, address)
```

##### Parameters

| Parameter | Description | Data Type |
| --------- | ----------- | --------- |
| name      | 钱包名称    | string    |
| message   | 签名信息    | string    |
| address   | 钱包地址    | string    |

##### Returns

string

##### Example

```js
import { getSignData } from '@/services/wallets';
import wallets from '@libs/wallets';

(async (): Promise<void> => {
    // 钱包名称
    const name = wallets.walletsName.META_MASK;
    // 获取钱包地址
    const address = await wallets.getAddress(name);
    // 获取签名信息
    const message = await getSignData({ name, address });
    // 获取signature
    const signature = await wallets.getSignature(name, message, address);

    todo();
})();
```
