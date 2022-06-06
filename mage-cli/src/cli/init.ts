import fs from 'fs-extra';
import path from 'path';
// 交互式命令行工具
import inquirer from 'inquirer';
import {exec} from 'child_process';

// 日志
import logger from '../helpers/logger.js';
// 工具
import {readDirInfo, resolveCliPath} from '../helpers/utils.js';

/**
 * 判断项目名是否同名
 * @param {string} name 项目名
 * @returns {boolean}
 */
const checkSameName = async (name: string): Promise<boolean> => {
  let result = false;

  const dirInfo = await readDirInfo('packages');

  for (const item of dirInfo) {
    if (item === name) {
      result = true;

      break;
    }
  }

  return result;
};

/**
 * 拷贝模板
 * @param {string} name 名称
 */
const copyTemplete = async (name: string): Promise<void> => {
  const templetePath = resolveCliPath('./template');
  const packagePath = path.resolve(resolveCliPath('../packages'), name);

  await fs.copy(templetePath, packagePath);
};

/**
 * 修改模板
 * @param {string} name 名称
 * @param {string} desc 描述
 * @param {string} port 端口号
 */
const modifyTemplete = async (name: string, desc: string, port: string): Promise<void> => {
  const packagePath = path.resolve(resolveCliPath('../packages'), name);

  // 修改 package.json
  const packageJsonFile = path.resolve(packagePath, 'package.json');
  const packageJsonContent = await fs.readJSON(packageJsonFile);

  packageJsonContent.name = '@packages/' + name;
  packageJsonContent.description = desc;

  await fs.writeJSON(packageJsonFile, packageJsonContent);

  // 修改 tsconfig
  const tsconfigJsonFile = path.resolve(packagePath, 'tsconfig.json');
  let tsconfigJsonContent = await fs.readFile(tsconfigJsonFile, 'utf8');

  tsconfigJsonContent = tsconfigJsonContent.replace('{name}', name);

  await fs.writeFile(tsconfigJsonFile, tsconfigJsonContent);

  // 修改 btg.config.js
  const btgConfigFile = path.resolve(packagePath, 'btg.config.js');
  let btgConfigContent = await fs.readFile(btgConfigFile, 'utf8');

  btgConfigContent = btgConfigContent.replace(`'{name}'`, `'${name}'`).replace(`'{port}'`, `${port}`);

  await fs.writeFile(btgConfigFile, btgConfigContent);
};

// 初始化
export default async (): Promise<void> => {
  const {name}: any = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入应用名?',
      validate(answer) {
        if (/^\s+|\s+$/g.test(answer) || !/^[a-z]+$/.test(answer)) {
          return '应用名只能由小写英文字母组成';
        }

        return true;
      },
    },
  ]);

  const {desc, port, confirm}: any = await inquirer.prompt([
    {
      type: 'input',
      name: 'desc',
      message: '请输入描述?',
      default: name,
    },
    {
      type: 'input',
      name: 'port',
      message: '请输入端口号?',
      validate(answer) {
        if (/^\s+|\s+$/g.test(answer) || !/^[0-9]+$/.test(answer)) {
          return '端口号只能由数字组成';
        }

        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '确定初始化？',
      default: true,
    },
  ]);

  if (!confirm) {
    return;
  }

  // 判断项目名是否同名
  const isSameName = await checkSameName(name);

  if (isSameName) {
    logger.error('初始化失败，项目名重名');

    return;
  }

  // 拷贝模板
  await copyTemplete(name);

  // 修改模板
  await modifyTemplete(name, desc, port);

  logger.info('初始化完成，开始安装依赖');

  exec('yarn install', {encoding: 'utf8'}, (error, stdout, stderr) => {
    if (error) {
      logger.error(`exec error: ${error}`);

      return;
    }

    logger.default(`${stdout}`);
  });
};
