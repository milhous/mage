const path = require('path');
const child_process = require('child_process');
const { resolveAppPath } = require('../helpers/paths');
const { getBuildDependenciesConfigs } = require('../helpers/project');
const { version } = require('../package.json');
const gitVersion = child_process.execSync('git rev-parse --abbrev-ref HEAD').toString();

module.exports = async(args) => {
    const buildDependenciesConfigs = await getBuildDependenciesConfigs();

    return {
        entry: {
            index: resolveAppPath(args.src)
        },
        mode: args.mode,
        devtool: args.devtool,
        target: 'web',
        output: {
            filename: '[name].[contenthash].js',
            path: resolveAppPath(args.dist),
            publicPath: "auto",
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
            globalObject: 'this'
        },
        cache: {
            version: `${version}-${gitVersion}`,
            type: 'filesystem',
            cacheDirectory: path.resolve(__dirname, './node_modules/.cache/webpack'),
            // 缓存依赖，当缓存依赖修改时，缓存失效
            buildDependencies: {
                // 将你的配置添加依赖，更改配置时，使得缓存失效
                config: buildDependenciesConfigs,
            },
        },
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
                '.svga'
            ],
            alias: {
                '@app': resolveAppPath('./src/'),
                '@libs': resolveAppPath('../librarys/'),
                '@ui': resolveAppPath('../ui/'),
            }
        }
    };
};