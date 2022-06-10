# website-v2

主站 2.0

# 目标

1.打包工具从 webpack4.0 升级到 webpack5.0(可以支持微前端类架构，依赖新的 Module Federation 打包功能)  
2.react 从 16.3 升级到 17.0(为 18.0 的升级做垫脚石)  
3.主站架构更新  
4.采用响应式布局方案，断点采用 768px/1200px/1600px，共 4 套样式方案(1200px 和 1600px 原则上应该差别不大，只是为了兼容更大分辨率做了些细节调整)

## 项目结构

```
|－ bitgame
|     |－ build 应用构建副本（用于线上发布）
|     |－ csv 多语言导出
|     |－ cli 命令行
|     |－ packages 应用包
|           |－ main 主应用
|                 |－ 端口号: 3000
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
|           |－ ui 组件库
|           |－ libs 模块库
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

# 升级 node_modules 版本（只会修改package.json对应版本）
ncu -u --deep
```

## 使用 Mage

查阅 [Mage](./mage-cli/README.md) 文档

## 使用 UI

查阅 [UI](./packages/ui/README.md) 文档

## 使用 Libs

查阅 [Libs](./packages/libs/README.md) 文档
