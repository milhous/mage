## Marketing Interface

用来管理 url 营销参数，这些营销参数为市场营销的获客媒介，当前已有渠道码（trackCode）、邀请码（invite）、代理码（agencyUser）和分享码（share）。

#### Properties

| Property     | Type | Description |
| ------------ | ---- | ----------- |
| useMarketing | Hook | 营销信息    |

#### Methods

| Method                             | Description   |
| ---------------------------------- | ------------- |
| getInfo()                          | 获取所有信息  |
| getKeyInfo(key, isRemove, isFuzzy) | 获取 Key 信息 |
| setKeyInfo(key, data)              | 设置 Key 信息 |
| removeKeyInfo(key)                 | 移除 Key 信息 |

## marketing.useMarketing

营销信息，用于 react hook

#### Example

```
import marketing from '@libs/marketing';

const { trackCode, trackCodeFrom } = marketing.useMarketing();
```

## marketing.getInfo()

获取所有信息

#### Signature:

```
getInfo(): IMarketingInfo;
```

#### Returns

IMarketingInfo

## marketing.getKeyInfo()

获取 Key 信息

#### Signature:

```
getKeyInfo(key: string, isRemove?: boolean, isFuzzy?: boolean): IMarketingItems;
```

#### Parameters

| Parameter | Type    | Description  |
| --------- | ------- | ------------ |
| key       | string  | 键名         |
| isRemove  | boolean | 是否移除     |
| isFuzzy   | boolean | 是否模糊查询 |

#### Returns

IMarketingItems

## marketing.setKeyInfo()

设置 Key 信息

#### Signature:

```
setKeyInfo(key: string, data: IMarketingItems): void;
```

#### Parameters

| Parameter | Type            | Description |
| --------- | --------------- | ----------- |
| key       | string          | 键名        |
| data      | IMarketingItems | 数据        |

#### Returns

void

## marketing.removeKeyInfo()

移除 Key 信息

#### Signature:

```
removeKeyInfo(key: string): void;
```

#### Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| key       | string | 键名        |

#### Returns

void
