const path = require('path');
const fs = require('fs-extra');
const { merge } = require('webpack-merge');
const { resolveAppPath } = require('./paths');

const getProjectConfig = async args => {
  const commonConfig = await require('../config/common')(args);
  const fileConfig = require('../config/file')(args);
  const cssConfig = require('../config/css')(args);
  const moduleConfig = require('../config/module')(args);
  const optimizationConfig = require('../config/optimization')(args);
  const pluginConfig = await require('../config/plugin')(args);
  const devServerConfig = require('../config/devServer')(args);

  let config = merge(commonConfig, fileConfig);
  config = merge(config, cssConfig);
  config = merge(config, moduleConfig);
  config = merge(config, optimizationConfig);
  config = merge(config, pluginConfig);
  config = merge(config, devServerConfig);

  const appPath = resolveAppPath('./btg.config.js');
  const isExist = await fs.pathExists(appPath);

  if (isExist) {
    const appConfig = require(resolveAppPath('./btg.config.js'))(args);
    config = merge(config, appConfig);
  }

  return config;
};

// 获取构建依赖配置
const getBuildDependenciesConfigs = async () => {
  const commonConfigPath = path.resolve(__dirname, '../config/common.js');
  const fileConfigPath = path.resolve(__dirname, '../config/file.js');
  const cssConfigPath = path.resolve(__dirname, '../config/css.js');
  const moduleConfigPath = path.resolve(__dirname, '../config/module.js');
  const optimizationConfigPath = path.resolve(__dirname, '../config/optimization.js');
  const pluginConfigPath = path.resolve(__dirname, '../config/plugin.js');
  const devServerConfigPath = path.resolve(__dirname, '../config/devServer.js');

  const configs = [
    commonConfigPath,
    fileConfigPath,
    cssConfigPath,
    moduleConfigPath,
    optimizationConfigPath,
    pluginConfigPath,
    devServerConfigPath,
  ];

  const appConfigPath = resolveAppPath('./btg.config.js');
  const isExist = await fs.pathExists(appConfigPath);

  if (isExist) {
    configs.push(appConfigPath);
  }

  return configs;
};

module.exports = {
  getProjectConfig,
  getBuildDependenciesConfigs,
};
