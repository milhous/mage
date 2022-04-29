import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
// 交互式命令行工具
import inquirer from 'inquirer';
import { exec } from 'child_process';

import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// 解决chalk设置样式没有生效。
chalk.level = 1;

/**
 * 判断项目名是否同名
 * @param {string} name 项目名
 * @returns {boolean}
 */
const checkSameName = async (name: string): Promise<boolean> => {
    let result: boolean = false;

    const packagesPath = path.resolve(__dirname, '../../../packages');
    const dirInfo = fs.readdirSync(packagesPath);

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
    const templetePath = path.resolve(__dirname, '../../template');
    const packagePath = path.resolve(__dirname, '../../../packages', name);

    // const appPath = fs.realpathSync(process.cwd());
    // const templetePath = path.resolve(appPath, 'template');
    // const packagePath = path.resolve(appPath, 'packages', packageName);

    // console.log(appPath);

    await fs.copy(templetePath, packagePath)
};

/**
 * 修改模板
 * @param {string} name 名称
 * @param {string} desc 描述
 * @param {string} port 端口号
 */
 const modifyTemplete = async (name: string, desc: string, port: string): Promise<void> => {
    const packagePath = path.resolve(__dirname, '../../../packages', name);
    
    // 修改 package.json
    const packageJsonFile = path.resolve(packagePath, 'package.json');
    const packageJsonContent = await fs.readJSON(packageJsonFile);
    
    packageJsonContent.name = '@packages/' + name;
    packageJsonContent.description = desc;

    await fs.writeJSON(packageJsonFile, packageJsonContent);

    // 修改 btg.config.js
    const btgConfigFile = path.resolve(packagePath, 'btg.config.js');
    const btgConfigContent = await fs.readFile(btgConfigFile, 'utf8');
    const content = btgConfigContent.replace(`'{name}'`, `'${name}'`).replace(`'{port}'`, `${port}`);

    await fs.writeFile(btgConfigFile, content);
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
    
    const { desc, port, confirm }: any = await inquirer.prompt([
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

    if (!confirm) {
        return;
    }

    // 判断项目名是否同名
    const isSame = await checkSameName(name);

    if (isSame) {
        console.log('初始化失败，项目名重名');

        return;
    }

    // 拷贝模板
    await copyTemplete(name);

    // 修改模板
    await modifyTemplete(name, desc, port);

    console.log('初始化完成');
}

