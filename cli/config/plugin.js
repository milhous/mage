const path = require('path');
const fs = require('fs-extra');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW, InjectManifest } = require('workbox-webpack-plugin');
const WebpackBar = require('webpackbar');
const { appDir, resolveAppPath, existsAppPath } = require('../helpers/paths');

// 默认public路径
const defaultPublicPath = path.resolve(__dirname, '../public');

module.exports = async(args) => {
    let publicPath = defaultPublicPath;

    // 判断应用是否存在public文件夹
    const isPathExist = await existsAppPath('./public');

    console.log(resolveAppPath('../librarys/broadcastChannel/workers/serviceWorker.worker.ts'));

    // 判断应用public文件夹是否存在html & ico
    if (isPathExist) {
        const html = resolveAppPath('./public/index.html');
        const ico = resolveAppPath('./public/favicon.ico');

        const [isHtmlExist, isIcoExist] = await Promise.all([
            fs.pathExists(html),
            fs.pathExists(ico),
        ]);

        if (isHtmlExist && isIcoExist) {
            publicPath = resolveAppPath('./public');
        }
    }

    const plugins = [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Bitgame',
            favicon: publicPath + '/favicon.ico',
            template: publicPath + '/index.html',
            inject: true,
            minify: false,
        }),
        new ESLintPlugin({
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            context: appDir,
            overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
            files: ['src/**/*.{ts,tsx,js,jsx}'],
            eslintPath: require.resolve('eslint'),
            cache: true,
            cacheLocation: path.resolve(__dirname, './node_modules/.cache/.eslintcache'),
            fix: true,
            threads: true,
            lintDirtyModulesOnly: false,
            outputReport: true
        }),
        // new GenerateSW({
        //     // 这些选项帮助快速启用 ServiceWorkers
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
        new InjectManifest({
            swSrc: resolveAppPath('../librarys/broadcastChannel/workers/broadcastChannel.sw.ts')
        }),
        new WebpackBar({
            color: 'green'
        })
    ];

    // 判断是否生成分析报告
    if (args.analyze) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    // 判断是否是线上
    if (args.env === 'prod' && args.mode === 'production') {
        plugins.push(
            // 生成mainfest文件
            new WebpackManifestPlugin({
                publicPath: ''
            }),
            // css分割
            new MiniCssExtractPlugin({
                ignoreOrder: true,
                filename: '[name].[contenthash:8].css',
                chunkFilename: '[id].[contenthash:8].chunk.css',
            })
        );
    }

    return {
        plugins
    }
};