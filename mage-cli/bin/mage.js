#!/usr/bin/env node
// package配置信息
const package = require('../package.json');

// 命令行工具
// import program from 'commander';
const program = require('commander');
// 实现node.js命令行环境的loading效果，和显示各种状态的图标等
const ora = require('ora');
// 支持修改控制台中字符串的样式 字体样式、字体颜色、背景颜色
const chalk = require('chalk');
// 交互式命令行工具
const inquirer = require('inquirer');

program.version(package.version, '-v, --version').usage('<command> [options]');

// program option 配置
const optionsConfig = {
  src: ['-s, --src <src>', '目标文件 默认为 ./src/index'],
  dist: ['-d, --dist <dist>', '目标 默认为 ./dist'],
  env: ['-e, --env <env>', '部署环境 dev、test、prod 默认为 prod'],
  mode: ['-m, --mode <mode>', '开发模式 development、production 默认 production'],
  devtool: ['-d, --devtool <devtool>', '是否使用source map， 默认为 none'],
  analyze: ['-a, --analyze', '生成分析报告 默认为 false'],
  progress: ['-p, --progress', '显示进度 默认为 false'],
};

// 获取配置
const getConfig = ({
  src = './src/index',
  dist = './dist',
  env = 'prod',
  mode = 'production',
  devtool = 'eval',
  analyze = false,
  progress = false,
}) => {
  if (typeof analyze === 'string') {
    analyze = analyze === 'true';
  }

  if (typeof progress === 'string') {
    progress = progress === 'true';
  }

  return {
    src,
    dist,
    env,
    mode,
    devtool,
    analyze,
    progress,
  };
};

// 启动开发服务器
program
  .command('start')
  .alias('s')
  .description('启动开发服务器')
  .option(...optionsConfig.env)
  .option(...optionsConfig.mode)
  .option(...optionsConfig.devtool)
  .option(...optionsConfig.analyze)
  .option(...optionsConfig.progress)
  .action(({ mode = 'development', devtool = 'source-map' }) => {
    const config = getConfig({ mode, devtool });

    require('../scripts/start')(config);
  });

// 打包构建
program
  .command('build')
  .alias('b')
  .description('打包构建')
  .option(...optionsConfig.env)
  .option(...optionsConfig.mode)
  .option(...optionsConfig.progress)
  .action(option => {
    const config = getConfig(option);

    console.log('option', option);

    require('../scripts/build')(config);
  });

// 启动项目
program
  .command('launch')
  .description('启动项目')
  .action(() => {
    require('../scripts/launch')();
  });

// 创建项目
program
  .command('create')
  .description('创建项目')
  .action(() => {
    require('../scripts/create')();
  });

program.parse(process.argv);
