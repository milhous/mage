## </> 常见问题 UIFaq

```
import UIFaq from '@ui/faq';

const title = '常见问题';
const list: {question: string; answer: string}[] = [];

<UIFaq title={title} list={list} />
```

> Props

| Name  | Type                                 | Description |
| ----- | ------------------------------------ | ----------- |
| title | string                               | 标题        |
| list  | {question: string; answer: string}[] | 问题 & 解答 |
