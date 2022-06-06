import fs from 'fs-extra';
// 交互式命令行工具
import inquirer from 'inquirer';

// 工具
import {readDirInfo} from '../helpers/utils.js';
// 类型
import {ExportModeType} from '../helpers/types.js';
// cvs
import csv from '../helpers/csv.js';

/**
 * 声明 - 选项
 * @property {string} name 应用名
 * @property {boolean} checked 是否选中
 */
type IChoices = {name: string; checked: boolean}[];

/**
 * 声明 - 答案
 * @property {number} type 行为类型 0:导入, 1:导出
 * @property {string} dir csv文件目录
 * @property {Array<string>} packages 应用名
 * @property {boolean} confirm 确认启动
 */
type IAnswers = {
  type: number;
  dir: string;
  packages: string[];
  mode: number;
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
    if (item !== 'librarys' && item !== 'ui')
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
const getAnswers = async (choices: IChoices): Promise<IAnswers> => {
  let packages: string[] = [];
  let dir = '';
  let mode = ExportModeType.NULL;

  const {type} = await inquirer.prompt([
    {
      type: 'list',
      message: '选择导入/导出:',
      name: 'type',
      choices: [
        {name: 'import(导入)', value: ActionType.IMPORT, description: '导入'},
        {name: 'export(导出)', value: ActionType.EXPORT, description: '导出'},
      ],
    },
  ]);

  if (type === ActionType.IMPORT) {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'dir',
        message: '选择导入目录:',
        validate(answer) {
          if (answer === '') {
            return '目录不能为空';
          }

          const stat = fs.lstatSync(answer);

          if (stat.isFile()) {
            return '目录不能为文件';
          }

          return true;
        },
      },
    ]);

    dir = answer.dir;

    for (const {name} of choices) {
      packages.push(name);
    }
  } else {
    const answer = await inquirer.prompt([
      {
        message: '选择导出模式:',
        name: 'mode',
        type: 'list',
        choices: [
          {name: 'empty item(空项)', value: ExportModeType.EMPTY, description: '空项'},
          {name: 'full item(全量)', value: ExportModeType.FULL, description: '全量'},
        ],
      },
      {
        type: 'confirm',
        name: 'all',
        message: '选择应用方式?(y:所有, n:指定)',
        default: false,
      },
      {
        type: 'checkbox',
        message: '选择应用(必选):',
        name: 'packages',
        choices: choices,
        loop: false,
        when(answers) {
          return !answers.all;
        },
        validate(answer) {
          if (answer.length === 0) {
            return '选择至少一个应用';
          }

          return true;
        },
      },
    ]);

    mode = answer.mode;

    if (answer.all) {
      for (const {name} of choices) {
        packages.push(name);
      }
    } else {
      packages = answer.packages;
    }
  }

  const {confirm} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '确认执行?',
      default: true,
    },
  ]);

  return {
    type,
    dir,
    packages,
    mode,
    confirm,
  };
};

// i18n
export default async (args: any): Promise<void> => {
  const dirInfo = await readDirInfo('packages');
  const choices: IChoices = getChoices(dirInfo);

  if (choices.length === 0) {
    return;
  }

  const answers: IAnswers = await getAnswers(choices);

  if (!answers.confirm) {
    return;
  }

  if (answers.type === ActionType.IMPORT) {
    // 导入
    csv.import(answers.dir);
  } else {
    // 导出
    csv.export(answers.packages, answers.mode);
  }
};
