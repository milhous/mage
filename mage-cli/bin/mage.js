#!/usr/bin/env node

// 命令行工具
import {Command} from 'commander';
// 命令行
import cli from '../dist/cli/index.js';

const program = new Command();

// package配置信息
const version = '1.0.0';

// program option 配置
const optionsConfig = {
  env: ['-e, --env <env>', '部署环境 dev、test、prod 默认为 prod'],
  mode: ['-m, --mode <mode>', '开发模式 development、production 默认 production'],
  analyze: ['-a, --analyze', '生成分析报告 默认为 false'],
};

// 获取配置
const getConfig = ({env = 'prod', mode = 'production', analyze = false}) => {
  if (typeof analyze === 'string') {
    analyze = analyze === 'true';
  }

  return {
    env,
    mode,
    analyze,
  };
};

// 获取版本号
program.version(version, '-v, --version').usage('<command> [options]');

// 初始化
program
  .command('init')
  .description('初始化项目')
  .action(() => {
    cli('init');
  });

// 多语言
program
  .command('i18n')
  .description('多语言')
  .action(() => {
    cli('i18n');
  });

// 启动（多个项目）
program
  .command('launch')
  .description('启动项目')
  .action(() => {
    cli('launch');
  });

// 启动（单个项目）
program
  .command('start')
  .alias('s')
  .description('启动项目')
  .option(...optionsConfig.env)
  .option(...optionsConfig.mode)
  .option(...optionsConfig.analyze)
  .action(({mode = 'development', devtool = 'source-map'}) => {
    const config = getConfig({mode, devtool});

    cli('start', config);
  });

// 构建
program
  .command('build')
  .alias('b')
  .description('打包构建')
  .option(...optionsConfig.env)
  .option(...optionsConfig.mode)
  .action(option => {
    const config = getConfig(option);

    cli('build', config);
  });

// 信息（应用）
program
  .command('info')
  .description('应用信息')
  .action(() => {
    cli('info');
  });

program.parse(process.argv);
