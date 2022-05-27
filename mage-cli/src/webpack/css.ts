import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssPxtorem from 'postcss-pxtorem';
import postcssNormalize from 'postcss-normalize';

import {createRequire} from 'module';

const require = createRequire(import.meta.url);

// 正则表达式
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;
const lessModuleRegex = /\.module\.less$/;

// 获取 style-loader 配置
const getStyleLoaderConfig = (isDev = true) => {
  return isDev
    ? {
        loader: require.resolve('style-loader'),
        options: {},
      }
    : {
        loader: MiniCssExtractPlugin.loader,
        options: {},
      };
};

// 获取 css-loader 配置
const getCssLoaderConfig = (isDev = true, isModules = false) => {
  const localIdentName = isDev ? '[path][name]-[local]-[hash:base64:5]' : '[local]-[hash:base64:5]';

  return {
    loader: require.resolve('css-loader'),
    options: {
      modules: isModules ? {localIdentName} : isModules,
    },
  };
};

/**
 * 获取 postcss-loader 配置
 * @param {boolean} isDev 是否是开发环境
 * @param {Array<string>} browserslist 目标浏览器版本范围
 */
const getPostcssLoaderConfig = (isDev = true, browserslist: string[]) => {
  return {
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        hideNothingWarning: true,
        plugins: [
          autoprefixer({
            grid: 'autoplace',
            cascade: true,
            remove: true,
            // 解决各个应用无需在package.json配置Browserslist
            overrideBrowserslist: browserslist,
          }),
          postcssPxtorem({
            rootValue: 100,
            unitPrecision: 2,
            propList: ['*'],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
            exclude: /node_modules/i,
          }),
          postcssNormalize({
            browsers: browserslist.join(','),
          }),
        ],
      },
    },
  };
};

// 获取 less-loader 配置
const getLessLoaderConfig = (isModules = false) => {
  return isModules
    ? {loader: require.resolve('less-loader')}
    : {
        loader: require.resolve('less-loader'),
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      };
};

/**
 * 样式
 * @param {boolean} isDev 是否是开发环境
 * @param {Array<string>} browserslist 目标浏览器版本范围
 */
export default (isDev: boolean, browserslist: string[]) => {
  return {
    module: {
      rules: [
        // css
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [getStyleLoaderConfig(isDev), getCssLoaderConfig(isDev), getPostcssLoaderConfig(isDev, browserslist)],
        },
        // css module
        {
          test: cssModuleRegex,
          use: [
            getStyleLoaderConfig(isDev),
            getCssLoaderConfig(isDev, true),
            getPostcssLoaderConfig(isDev, browserslist),
          ],
        },
        // less
        {
          test: lessRegex,
          exclude: lessModuleRegex,
          use: [
            getStyleLoaderConfig(isDev),
            getCssLoaderConfig(isDev),
            getPostcssLoaderConfig(isDev, browserslist),
            getLessLoaderConfig(false),
          ],
        },
        // less module
        {
          test: lessModuleRegex,
          use: [
            getStyleLoaderConfig(isDev),
            getCssLoaderConfig(isDev, true),
            getPostcssLoaderConfig(isDev, browserslist),
            getLessLoaderConfig(true),
          ],
        },
      ],
    },
  };
};
