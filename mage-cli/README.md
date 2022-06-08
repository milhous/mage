## 开发

### 项目结构

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
|                 |－ start启动（单个项目）
|           |－ helpers 辅助
|                 |－ csv csv 读取/创建
|                 |－ logger 日志
|                 |－ store 配置（应用 & webpack）
|                 |－ types 类型
|                 |－ utils 工具
|     |－ template 项目模板
|           |－ locales 多语言
|           |－ src 源文件
|           |－ app.config.js 自定义配置（用于webpack）
|     |－ types 类型声明（项目共用）
|     |－ tsconfig.base.json tsconfig 基础配置
```

### 配置 yarn

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
