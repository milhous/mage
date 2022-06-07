import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';

import {resolveAppPath, getGitHash, getDependencies} from '../helpers/utils.js';
import {IDevConfig, IBasicConfig, IModuleFederationConfig} from '../helpers/store.js';

const {ModuleFederationPlugin} = webpack.container;

/**
 * 获取 ModuleFederation Shared
 * @returns {object}
 */
const getModuleFederationShared = async (): Promise<{[key: string]: any}> => {
  const deps = await getDependencies();
  const shared: {[key: string]: any} = {};

  for (const key in deps) {
    shared[key] = {
      requiredVersion: deps[key],
      eager: true,
      singleton: true,
    };
  }

  return shared;
};

/**
 * 插件
 * @param {IDevConfig} devConfig 开发配置
 * @param {IBasicConfig} basicConfig 基础配置
 */
export default async (
  devConfig: IDevConfig,
  basicConfig: IBasicConfig,
  mfConfig: IModuleFederationConfig,
): Promise<any> => {
  const configFile = resolveAppPath('./tsconfig.json');
  const hash = await getGitHash();
  const shared: {[key: string]: any} = await getModuleFederationShared();

  const plugins: any[] = [
    new WebpackBar({
      color: 'green',
    }),
    new webpack.DefinePlugin({
      APP_GITHASH: JSON.stringify(hash),
      APP_NAME: basicConfig.name,
      // 'process.env.DEV_SERVER': JSON.stringify(process.env.DEV_SERVER),
      // 'process.env.BTG_ENV': JSON.stringify(process.env.BTG_ENV),
      __isDEV__: devConfig.isDev,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'locales',
          to: 'static/locales',
          globOptions: {
            ignore: ['**/.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Bitgame - ' + basicConfig.name,
      favicon: basicConfig.public + '/favicon.ico',
      template: basicConfig.public + '/index.html',
      inject: true,
      minify: false,
      // 解决 HMR for federated modules 报错
      chunks: ['main'],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: devConfig.isDev, // true dev环境下部分错误验证通过
      typescript: {
        configFile,
        profile: false,
        typescriptPath: 'typescript',
      },
    }),
    new ModuleFederationPlugin({
      name: basicConfig.name, // 必须，唯一 ID，作为输出的模块名，使用的时通过 {name}/name/{expose} 的方式使用
      filename: 'remoteEntry.js', // devConfig.isDev ? 'remoteEntry.js' : 'remoteEntry.[contenthash:6].js',
      exposes: mfConfig.exposes,
      shared,
    }),
  ];

  // 是否生成分析报告
  if (devConfig.analyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  if (devConfig.isDev) {
    // 是否开启热更新
    plugins.push(
      new ReactRefreshWebpackPlugin({
        exclude: [/node_modules/, /bootstrap\.js$/],
      }),
    );
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
