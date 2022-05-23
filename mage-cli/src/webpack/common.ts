/**
 * 通用
 * @param {string} mode 构建模式
 * @param {boolean} isDev 是否是开发环境
 * @param {string} src 应用源码地址
 * @param {string} dist 应用源码生成目录
 */
export default (mode: string, isDev: boolean, src: string, dist: string): any => {
    return {
        entry: {
            index: src + '/index',
        },
        devtool: isDev ? 'source-map' : false,
        mode,
        target: 'web',
        output: {
            path: dist,
            filename: 'static/js/[name].[contenthash:8].js',
            assetModuleFilename: 'static/asset/[name].[contenthash:8][ext][query]',
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
              '.svga',
            ],
            alias: {},
        },
    };
};