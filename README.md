# website-v2

主站 2.0

## 项目结构

```
|－ bitgame
|     |－ build 应用构建副本（用于线上发布）
|     |－ csv 多语言导出
|     |－ cli 命令行
|     |－ packages 应用包
|           |－ libs 模块库
|           |－ widget 挂件
|           |－ main 主应用
|                 |－ 端口号: 3000
|           |－ ui UI组件
|                 |－ 端口号: 9001
|           |－ home 首页
|                 |－ 端口号: 3000
|           |－ match
|                 |－ 端口号: 3000
|           |－ game 游戏
|                 |－ 端口号: 3000
|           |－ points 幸运币
|                 |－ 端口号: 3000
|           |－ promotion 活动
|                 |－ 端口号: 3000
|           |－ referral 邀请
|                 |－ 端口号: 9007
|           |－ affiliate 代理
|                 |－ 端口号: 9013
```

## 如何使用

> Mage 配置构建完成后, 可以参考下面流程新建 & 开发应用

```
# 在根目录创建 .env.development 文件, 用于 mage launch 默认启动应用, 复制缩进内容：
    # 配置process.env

    # 启动项目偏好设置
    LAUNCH = main

# 查看已有应用信息（名称，端口号）
mage info

# 创建和初始化应用
mage init

# 选择启动相关应用
mage launch

# 多语言导入/导出（默认生成在根目录csv文件夹）
mage i18n

# 应用打包构建（单个应用）
name=affiliate yarn run build:name

# 升级 node_modules 版本（只会修改package.json版本号）
ncu -u --deep
```

## 开发建议

svg 体积过大时, 建议使用 url, 避免使用 inline, 导致 js 体积大, 页面需要较长时间加载才能显示

> 为了区分导入类型, url 导入时, 导入名首字母小写. inline 导入时, 导入名首字母大写.

```
# svg 体积较大时，比如 banner
import svg from './assets/file.svg?url'

<img src={svg} width="200" height="200" />

# svg 体积较小时，比如 icon
import Svg from './assets/file.svg'

<Svg width="200" height="200" />
```

## 使用 Mage

查阅 [Mage](./mage-cli/README.md) 文档

## 使用 UI

查阅 [UI](./packages/ui/README.md) 文档

## 使用 Libs

查阅 [Libs](./packages/libs/README.md) 文档

## 使用 WIDGET

查阅 [WIDGET](./packages/widget/README.md) 文档
