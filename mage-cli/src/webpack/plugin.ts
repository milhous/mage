import WebpackBar from 'webpackbar';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { resolveAppPath } from '../helpers/utils.js';

/**
 * 插件
 * @param {boolean} isDev 是否是开发环境
 * @param {boolean} analyze 生成分析报告 
 * @param {string} name 应用名称
 * @param {string} publicPath 应用静态文件目录
 */
export default (isDev: boolean, analyze: boolean, name: string, publicPath: string): any => {
    const configFile = resolveAppPath('./tsconfig.json');

    console.log('configFile', configFile);

    const plugins: any[] = [
        new WebpackBar({
            color: 'green',
        }),
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].chunk.css',
        }),
        new HtmlWebpackPlugin({
            title: 'Bitgame - ' + name,
            favicon: publicPath + '/favicon.ico',
            template: publicPath + '/index.html',
            inject: true,
            minify: false,
        })
    ];

    // 是否生成分析报告
    if (analyze) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    // 是否开启热更新
    if (isDev) {
        plugins.push(new ReactRefreshWebpackPlugin()); 
    }

    // 开启类型检查
    plugins.push(new ForkTsCheckerWebpackPlugin({
        async: isDev, // true dev环境下部分错误验证通过
        typescript: {
          configFile,
          profile: false,
          typescriptPath: 'typescript',
        }
      },
    ));

    return {
        plugins,
    };
};