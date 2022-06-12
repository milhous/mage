### </> UIFaq: IUIFaqProps

常见问题

```
import UIFaq from '@ui/faq';

const title = '常见问题';
const list: {question: string; answer: string}[] = [];

<UIFaq title={title} list={list} />
```

| Method      | Description     |
| ----------- | --------------- |
| mage build  | 构建应用        |
| mage i18n   | 多语言导入/导出 |
| mage info   | 显示应用信息    |
| mage init   | 初始化应用      |
| mage launch | 启动多个应用    |
| mage start  | 启动单个应用    |

title: string;
list: {question: string; answer: string}[];
