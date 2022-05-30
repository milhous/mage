import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
// 交互式命令行工具
import inquirer from 'inquirer';
import {spawn} from 'child_process';
import * as url from 'url';

// 工具
import {readDirInfo, readJson} from '../helpers/utils.js';

/**
 * 声明 - 选项
 * @property {string} name 应用名
 * @property {boolean} checked 是否选中
 */
type IChoices = {name: string; checked: boolean}[];

/**
 * 声明 - 答案
 * @property {boolean} all 选择项目启动方式?（y:指定, n:所有）
 * @property {Array<string>} packages 应用名
 * @property {boolean} confirm 确认启动
 */
type IAnswers = {
  all: boolean;
  packages?: string[];
  confirm: boolean;
};

/**
 * 获取选项
 * @param {Array<string>} packages 应用名
 * @returns {IChoices}
 */
const getChoices = (packages: string[]): IChoices => {
  let launch = !!process.env.LAUNCH && process.env.LAUNCH.split(',');
  launch = Array.isArray(launch) && launch.length ? launch : [];
  const choices: IChoices = [];

  for (const item of packages) {
    choices.push({
      name: item,
      checked: launch.includes(item),
    });
  }

  return choices;
};

/**
 * 获取答案
 * @param {IChoices} choices 选项
 */
const getAnswers = async (choices: IChoices): Promise<IAnswers> => {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'all',
      message: '选择项目启动方式?（y:指定, n:所有）',
      default: true,
    },
    {
      type: 'checkbox',
      message: '选择启动项目:',
      name: 'packages',
      choices,
      loop: false,
      when(answers) {
        return answers.all;
      },
      validate(answer) {
        // if (!answer.includes('main') || !answer.includes('bitgame')) {
        //   return '必须选择 main & bitgame';
        // }

        return true;
      },
    },
    {
      type: 'confirm',
      name: 'confirm',
      message: '确认启动？',
      default: true,
    },
  ]);

  return answers;
};

/**
 * 启动服务
 * @param {string} command 命令
 * @param {string} args 参数
 */
const startServer = (command: string, args: string[]) => {
  const ls = spawn(command, args);

  ls.stdout.on('data', data => {
    console.log(`${data}`);
  });

  ls.stderr.on('data', data => {
    console.error(`${data}`);
  });

  ls.on('close', code => {
    console.log(`=== BTG <${name}> child process exited with code ${code} ===`);
  });
};

/**
 * 批量启动服务
 * @param {Array<string>} packages 应用名
 */
const batchStartServer = async (packages: string[]): Promise<void> => {
  const {scripts} = await readJson('package.json');
  const [command, ...args] = scripts['start:batch'].split(' ');
  const index = args.findIndex((item: string) => item.includes('$name'));
  const temp = args[index];

  for (const name of packages) {
    args[index] = temp.replace('$name', name);

    startServer(command, args);
  }
};

// 启动（多个项目）
export default async (): Promise<void> => {
  const dirInfo = await readDirInfo('packages');
  const choices: IChoices = getChoices(dirInfo);

  if (choices.length === 0) {
    return;
  }

  const answers = await getAnswers(choices);

  if (!answers.confirm) {
    return;
  }

  const packages = answers.all ? answers.packages : dirInfo;

  batchStartServer(packages as string[]);
};
