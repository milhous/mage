import { merge } from 'webpack-merge';

import store from '../helpers/store.js';

// 通用
import getCommonConfig from './common.js';
// 样式
import getCssConfig from './css.js';
// 文件
import getFileConfig from './file.js';
// 模块
import getModuleConfig from './module.js';
// 插件
import getPluginConfig from './plugin.js';
// 开发
import getDevelopmentConfig from './development.js';
// 生成
import getProductionConfig from './production.js';

// webpack 配置
export default (): any => {
    const basicConfig = store.getBasicConfig();
    const devConfig = store.getDevConfig();

    const commonConfig = getCommonConfig(devConfig.mode, devConfig.isDev, basicConfig.src, basicConfig.dist);
    const cssConfig = getCssConfig(devConfig.isDev);
    const fileConfig = getFileConfig();
    const moduleConfig = getModuleConfig(devConfig.isDev, devConfig.browserslist);
    const pluginConfig = getPluginConfig(devConfig.isDev, devConfig.analyze, basicConfig.public);
    const developmentConfig = getDevelopmentConfig(basicConfig.port, basicConfig.dist);
    const productionConfig = getProductionConfig(devConfig.isDev);

    const config = merge(commonConfig, cssConfig, fileConfig, moduleConfig, pluginConfig, developmentConfig, productionConfig);

    return config;
}