import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
// 交互式命令行工具
import inquirer from 'inquirer';
import {exec} from 'child_process';

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
 * 行为类型
 * @property IMPORT 导入
 * @property EXPORT 导出
 */
enum ActionType {
  IMPORT = 0,
  EXPORT,
}

/**
 * 获取选项
 * @param {Array<string>} packages 应用名
 * @returns {IChoices}
 */
const getChoices = (packages: string[]): IChoices => {
  const choices: IChoices = [];

  for (const item of packages) {
    choices.push({
      name: item,
      checked: false,
    });
  }

  return choices;
};

/**
 * 获取答案
 * @param {IChoices} choices 选项
 */
const getAnswers = async (choices: IChoices): Promise<any> => {
  const {all, packages, type} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'all',
      message: '选择项目启动方式?（y:所有, n:指定）',
      default: false,
    },
    {
      type: 'checkbox',
      message: '选择应用（必选）:',
      name: 'packages',
      choices: choices,
      loop: false,
      when(answers) {
        return !answers.all;
      },
      validate(answer) {
        if (answer.length === 0) {
          return '必须选择至少一个应用';
        }

        return true;
      },
    },
    {
      type: 'list',
      message: '选择操作:',
      name: 'type',
      choices: [
        {name: 'import(导入)', value: ActionType.IMPORT, description: '导入'},
        {name: 'export(导出)', value: ActionType.EXPORT, description: '导出'},
      ],
    },
    //   {
    //     type: 'checkbox',
    //     message: '选择应用:',
    //     name: 'packages',
    //     choices: choices,
    //     loop: false,
    //     when(answers) {
    //       return answers.all;
    //     },
    //     validate(answer) {
    //       // if (!answer.includes('main') || !answer.includes('bitgame')) {
    //       //   return '必须选择 main & bitgame';
    //       // }

    //       return true;
    //     },
    //   },
    {
      type: 'confirm',
      name: 'confirm',
      message: '确认启动？',
      default: true,
    },
  ]);

  console.log(all, packages, type);

  return {
    packages,
  };
};

// i18n
export default async (args: any): Promise<void> => {
  const dirInfo = await readDirInfo('packages');
  const choices: IChoices = getChoices(dirInfo);

  if (choices.length === 0) {
    return;
  }

  const answers = await getAnswers(choices);

  console.log('i18n', answers);
};
