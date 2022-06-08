## Mage

> 实现微前端解决方案

- 💡 微前端、支持 ESM.
- ⚡️ 结合 SWC 快速构建重载.
- 🛠️ 支持 TypeScript、JSX、CSS、Less、SVG, SVGA 等模块.
- 📦 Yarn3 实现 MonoRepo 和应用预配置 webpack 构建.
- 🔩 通用的插件、共享 webpack 插件接口.
- 🔑 TS 重构项目、提供灵活的 api、Plugin 以及完整的类型提示.

### 目录结构

```
|－ mage
|     |－ bin 可执行命令
|     |－ cat https证书（用于本地开发）
|     |－ public 模版页
|     |－ src 源文件
|           |－ cli 命令行界面
|                 |－ build 构建
|                 |－ i18n 多语言（导入/导出）
|                 |－ index 归集
|                 |－ info 信息（应用）
|                 |－ init 初始化（创建应用）
|                 |－ launch 启动（多个应用）
|                 |－ start 启动（单个应用）
|           |－ helpers 辅助
|                 |－ csv csv 读取/创建
|                 |－ logger 日志
|                 |－ store 配置（应用 & webpack）
|                 |－ types 类型
|                 |－ utils 工具
|           |－ webpack 配置
|                 |－ common 通用
|                 |－ css 样式
|                 |－ development 开发
|                 |－ file 文件（img, svg, svga, font）
|                 |－ index 归集
|                 |－ module 脚本
|                 |－ plugin 插件
|                 |－ production 生产
|     |－ template 应用模板
|           |－ locales 多语言
|           |－ src 源文件
|           |－ app.config.js 自定义配置（用于webpack）
|     |－ types 类型声明（项目共用）
|     |－ tsconfig.base.json tsconfig 基础配置
```

### 配置 Yarn

1. 切换新版本, 替代 lerna 管理 workspaces

```
yarn set version berry
```

2. 设置 npm 源地址

```
# 命令行
yarn config set npmRegistryServer https://registry.npm.taobao.org

# .yarnrc.yml
npmRegistryServer: "https://registry.npm.taobao.org"

```

3. 设置代理

```
# 命令行
yarn config set httpProxy http://host:port

yarn config set httpsProxy http://host:port

# .yarnrc.yml
httpProxy: "http://host:port"

httpsProxy: "http://host:port"

```

4. 设置项目包管理器配置 & 开启 ESM 支持

```
# 命令行
yarn config set nodeLinker pnpm

yarn config set pnpEnableEsmLoader true

# .yarnrc.yml
nodeLinker: pnpm

pnpEnableEsmLoader: true
```

5. 安装插件

```
# Automatically adds @types/ packages into your dependencies when you add a package that doesn't include its own types
yarn plugin import typescript

# This plugin adds support for various workspace-related commands.
yarn plugin import workspace-tools
```

6. 安装 node_modules

```
yarn install
```

## 构建 mage

```
# 进入构建命令文件夹
cd mage-cli

# 创建符号链接（symbolic link，软链接）
npm link

# 构建 mage 代码
yarn run build
```

### 命令介绍

| Method      | Description     |
| ----------- | --------------- |
| mage build  | 构建应用        |
| mage i18n   | 多语言导入/导出 |
| mage info   | 显示应用信息    |
| mage init   | 初始化应用      |
| mage launch | 启动多个应用    |
| mage start  | 启动单个应用    |

新建 & 开发应用可参考下面流程

```
# 查看已有应用信息（名称，端口号）
mage info

# 初始化应用
mage init

# 启动应用
mage launch

# 多语言导入/导出（默认生成在根目录csv文件夹）
mage i18n

# 构建引用（在应用文件夹中执行）
mage build
```
