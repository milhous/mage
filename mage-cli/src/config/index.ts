import { merge } from 'webpack-merge';

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
export default (args: any) => {
    const commonConfig = getCommonConfig('111');
    const cssConfig = getCssConfig('111');
    const fileConfig = getFileConfig('111');
    const moduleConfig = getModuleConfig('111');
    const pluginConfig = getPluginConfig('111');
    const developmentConfig = getDevelopmentConfig('111');
    const productionConfig = getProductionConfig('111');

    const config = merge(commonConfig, cssConfig, fileConfig, moduleConfig, pluginConfig, developmentConfig);

    console.log('config', config);

    return config;
}