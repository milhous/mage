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
|     |－ lerna.json lerna配置文件
|     |－ build 应用构建副本（用于线上发布）
|     |－ cli 命令行界面
|           |－ bin 可执行命令
|           |－ config 构建配置
|           |－ helpers 常用工具
|           |－ public 模版页
|           |－ scripts 构建脚本
|     |－ packages 应用包
|           |－ main 主应用(包含头尾以及登录注册弹窗，包含lang/utc/loginStatus状态) 开发端口号:9000
|                 |－
|           |－ home 首页 开发端口号:9001
|                 |－
|           |－ match 赛事应用(包含DAPP，期望可以独立运行，是否独立成库待定) 开发端口号:9003
|                 |－
|           |－ game 游戏应用 开发端口号:9002
|                 |－
|           |－ points 幸运币应用 开发端口号:9005
|                 |－
|           |－ promotion 活动应用 开发端口号:9004
|                 |－
|           |－ user 用户中心应用 开发端口号:9006
|                 |－
|           |－ i18n 多语言库(每个app引用自己所需的翻译，并且按需加载)
|                 |－
|           |－ ui UI组件库
|                 |－
|           |－ librarys 共享库
|                 |－ broadcastChannel 跨应用通讯模块
```

## 如何使用

> Mage 配置构建完成后, 可以参考下面流程新建 & 开发应用

```
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
