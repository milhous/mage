import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
// 交互式命令行工具
import inquirer from 'inquirer';
import { exec } from 'child_process';

// 解决chalk设置样式没有生效。
chalk.level = 1;

/**
 * 判断项目名是否同名
 * @param {string} packageName 项目名
 * @returns {boolean}
 */
const checkSameName = async (packageName: string): Promise<boolean> => {
    const appPath = fs.realpathSync(process.cwd());
    const packagesPath = path.resolve(appPath, 'packages');
    const dirInfo = fs.readdirSync(packagesPath);
    let result: boolean = false;

    for (const item of dirInfo) {
        if (item === packageName) {
            result = true;

            break;
        }
    }

    return result;
};

/**
 * 创建项目文件夹
 * @param {string} packageName 项目名
 */
const createFolder = async (packageName: string): Promise<void> => {
    const appPath = fs.realpathSync(process.cwd());
    const packagePath = path.resolve(appPath, 'packages', packageName);

    console.log('packagePath', packagePath);

    await fs.ensureDir(packagePath);
};

// 初始化
export default async (): Promise<void> => {
    const { name }: any = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入项目名?',
            validate(answer) {
                if ((/^\s+|\s+$/g).test(answer) || !(/^[a-z]+$/.test(answer))) {
                    return '项目名只能由小写英文字母组成';
                }

                return true;
            }
        }
    ]);
    
    const answers: any = await inquirer.prompt([
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
                if ((/^\s+|\s+$/g).test(answer) || !(/^[0-9]+$/.test(answer))) {
                    return '端口号只能由数字组成';
                }

                return true;
            }
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: '确定初始化？',
            default: true,
        }
    ]);

    if (!answers.confirm) {
        return;
    }

    // 判断项目名是否同名
    const isSame = await checkSameName(name);

    if (isSame) {
        console.log('初始化失败，项目名重名');

        return;
    }

    // 创建文件夹
    await createFolder(name);

    // .then(answers => {
    //     if (!answers.confirm) {
    //         return;
    //     }

    //     if (!answers.all) {
    //         // const execStartAll = exec(scripts.start, { encoding: 'utf8' });

    //         // execStartAll.stdout.on('data', function (data) {
    //         //   console.log(data);
    //         // });

    //         // execStartAll.stderr.on('data', function (data) {
    //         //   console.log(data);
    //         // });

    //         // execStartAll.on('exit', function (code) {
    //         //   console.log('child process exited with code ' + code);
    //         // });
    //     } else {
    //         // for (let name of answers.project) {
    //         //   const execStartSingle = exec(scripts['start:name'].replace('$name', name), { encoding: 'utf8' });

    //         //   execStartSingle.stdout.on('data', function (data) {
    //         //     console.log(data);
    //         //   });

    //         //   execStartSingle.stderr.on('data', function (data) {
    //         //     console.log(data);
    //         //   });

    //         //   execStartSingle.on('exit', function (code) {
    //         //     console.log('child process exited with code ' + code);
    //         //   });
    //         // }
    //     }
    // });

    // answers.name = name;
}

