import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import {resolveAppPath, getGitHash} from '../helpers/utils.js';
import {IDevConfig, IBasicConfig} from '../helpers/store.js';

/**
 * 插件
 * @param {IDevConfig} devConfig 开发配置
 * @param {IBasicConfig} basicConfig 基础配置
 */
export default (devConfig: IDevConfig, basicConfig: IBasicConfig): any => {
  const configFile = resolveAppPath('./tsconfig.json');

  const plugins: any[] = [
    new WebpackBar({
      color: 'green',
    }),
    new webpack.DefinePlugin({
      APP_GITHASH: getGitHash(),
      APP_NAME: basicConfig.name,
      // 'process.env.DEV_SERVER': JSON.stringify(process.env.DEV_SERVER),
      // 'process.env.BTG_ENV': JSON.stringify(process.env.BTG_ENV),
      __isDEV__: devConfig.isDev,
    }),
    new CopyPlugin({
      patterns: [{from: 'locales', to: 'static/locales'}],
    }),
    new HtmlWebpackPlugin({
      title: 'Bitgame - ' + basicConfig.name,
      favicon: basicConfig.public + '/favicon.ico',
      template: basicConfig.public + '/index.html',
      inject: true,
      minify: false,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: devConfig.isDev, // true dev环境下部分错误验证通过
      typescript: {
        configFile,
        profile: false,
        typescriptPath: 'typescript',
      },
    }),
  ];

  // 是否生成分析报告
  if (devConfig.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (devConfig.isDev) {
    // 是否开启热更新
    plugins.push(new ReactRefreshWebpackPlugin());
  } else {
    plugins.push(new CleanWebpackPlugin());

    plugins.push(
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: `static/css/[name].[contenthash:8].css`,
        chunkFilename: `static/css/[name].[contenthash:8].chunk.css`,
      }),
    );
  }

  return {
    plugins,
  };
};
