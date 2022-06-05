import fs from 'fs-extra';
// 环境变量 .env
import dotenv from 'dotenv';

// 工具
import {resolveAppPath} from '../helpers/utils.js';
// 类型
import {CommandType} from '../helpers/types.js';

// 初始化
import init from './init.js';
// 多语言
import i18n from './i18n.js';
// 启动（单个项目）
import start from './start.js';
// 启动（多个项目）
import launch from './launch.js';
// 构建
import build from './build.js';
// 信息（应用）
import info from './info.js';

// 初始化环境变量
const initEnv = () => {
  const envPath = resolveAppPath('.env');
  const devEnvPath = resolveAppPath('.env.development');
  const path = fs.pathExistsSync(devEnvPath) ? devEnvPath : envPath;

  dotenv.config({path});
};

initEnv();

export default async (name: string, args: any): Promise<void> => {
  switch (name) {
    // 初始化
    case CommandType.INIT:
      init();

      break;
    // 多语言
    case CommandType.I18N:
      i18n(args);

      break;
    // 启动（多个项目）
    case CommandType.LAUNCH:
      launch();

      break;
    // 启动（单个项目）
    case CommandType.START:
      start(args);

      break;
    // 构建
    case CommandType.BUILD:
      build(args);

      break;
    // 信息（应用）
    case CommandType.INFO:
      info();

      break;
  }
};
