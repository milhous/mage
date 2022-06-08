## 开发

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

5. 安装工具

```
# Automatically adds @types/ packages into your dependencies when you add a package that doesn't include its own types
yarn plugin import typescript

# This plugin adds support for various workspace-related commands.
yarn plugin import workspace-tools
```

```

# 应用初始化

npm run setup

# 所有应用启动本地服务

npm run start

# 所有应用打包构建

npm run build

# 单独应用启动本地服务

name=user npm run start:name

# 单独应用打包构建

name=user npm run build:name

# 应用 bundle 分析

npm run analyze

# 应用代码检查

npm run lint

# 应用清理 dist

npm run clean

```

### 项目初始化

// es2.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const common = require('./common.cjs');
console.log(common.foo); // output: 123

import.meta.url
特定的 **filename 和 **dirname 在 ES 模块中不被允许，我们需要使用可替换的 import.meta.url 替换。它包含一个绝对路径的 URL 文件。举例来说：
'file:///Users/rauschma/my-module.mjs'
重要的是：使用 url.fileURLToPath() 获取路径 - new URL().pathname 属性不总是工作：
import { fileURLToPath } from 'url';

// Unix

const urlStr1 = 'file:///tmp/with%20space.txt';
console.log(new URL(urlStr1).pathname);
// output: '/tmp/with%20space.txt'
console.log(fileURLToPath(urlStr1));
// output: '/tmp/with space.txt'

const urlStr2 = 'file:///home/thor/Mj%C3%B6lnir.txt';
console.log(new URL(urlStr2).pathname);
// output: '/home/thor/Mj%C3%B6lnir.txt'
console.log(fileURLToPath(urlStr2));
// output: '/home/thor/Mjölnir.txt'

// Windows

const urlStr3 = 'file:///C:/dir/';
console.log(new URL(urlStr3).pathname);
// output: '/C:/dir/'
console.log(fileURLToPath(urlStr3));
// output: 'C:\\dir\\'

import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../package.json', import.meta.url)));

yarn install

yarn plugin import typescript

yarn plugin import workspace-tools

// 所有包依赖项版本更新
yarn workspaces foreach -vtR run update

// yarn 版本更新最新
yarn set version latest

// 更新依赖项
yarn up

// 单包安装
yarn workspace @mage/cli add --dev webpack

// Alternatives to \_\_dirname in Node.js with ES modules
https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/

const **filename = url.fileURLToPath(import.meta.url);
const **dirname = url.fileURLToPath(new URL('.', import.meta.url));

// yarn workspace @packages/home add -i --dev react react-dom

// Could not find a declaration file for module 'postcss-pxtorem'
"compilerOptions" => "noImplicitAny": false

eager：不会生成额外的 chunk。
所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。
但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，在调用 import() 完成之前，该模块不会被执行。

singleton: 确保运行时模块为单例，避免初始化多次。

解决 HMR for federated modules ChunkLoadError: Loading hot update chunk
ModuleFederationPlugin 配置新增 chunks: ['main']
devServer 配置修改 liveReload: false, hot: true,
entry 配置修改 entry: basicConfig.src + '/index' 默认入口 main
package.json 配置修改 "main": "dist/static/js/main.js"

```

```
