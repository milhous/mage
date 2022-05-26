import * as url from 'url';

import { IDevConfig, IBasicConfig } from '../helpers/store.js';

const __filename = url.fileURLToPath(import.meta.url);

/**
 * 通用
 * @param {IDevConfig} devConfig 开发配置
 * @param {IBasicConfig} basicConfig 基础配置
 */
export default (devConfig: IDevConfig, basicConfig: IBasicConfig): any => {
    return {
        entry: {
            index: {
                import: basicConfig.src + '/index'
            }
        },
        devtool: devConfig.isDev ? 'source-map' : false,
        mode: devConfig.mode,
        target: 'web',
        output: {
            path: basicConfig.dist,
            filename: 'static/js/[name].[contenthash:8].js',
            assetModuleFilename: 'static/assets/[name].[contenthash:8][ext][query]',
            publicPath: 'auto',
            environment: {
              arrowFunction: false,
              bigIntLiteral: false,
              const: false,
              destructuring: false,
              forOf: false,
              dynamicImport: false,
              module: false,
            },
            // 防止window is undefined的错误.
            globalObject: 'this',
            pathinfo: false, //在打包数千个模块的项目中，这会导致造成垃圾回收性能压力
            clean: true
        },
        // cache: {
        //     version: `${basicConfig.name}-${devConfig.mode}`,
        //     type: 'filesystem',
        //     cacheDirectory: basicConfig.cache,
        //     // 缓存依赖，当缓存依赖修改时，缓存失效
        //     buildDependencies: {
        //       // 将你的配置添加依赖，更改配置时，使得缓存失效
        //       config: [__filename],
        //     }
        // },
        resolve: {
            modules: ['node_modules'],
            extensions: [
              '.js',
              '.jsx',
              '.mjs',
              '.ts',
              '.tsx',
              '.css',
              '.less',
              '.scss',
              '.sass',
              '.json',
              '.wasm',
              '.vue',
              '.svg',
              '.svga',
            ],
            alias: {
                '@': basicConfig.src
            },
        },
    };
};