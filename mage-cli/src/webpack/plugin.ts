import WebpackBar from 'webpackbar';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/**
 * 插件
 * @param {string} publicPath 应用静态文件目录
 * @param {boolean} analyze 生成分析报告 
 */
export default (publicPath: string, analyze: boolean): any => {
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
            title: 'Bitgame',
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

    // 开启类型检查
    plugins.push(new ForkTsCheckerWebpackPlugin());

    return {
        plugins,
    };
};