import chalk from 'chalk';
import fs from 'fs-extra';
// 交互式命令行工具
import inquirer from 'inquirer';
import { exec } from 'child_process';

// 解决chalk设置样式没有生效。
chalk.level = 1;

export default () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: '请输入包名?',
            validate(answer) {
                if ((/^\s+|\s+$/g).test(answer) || !(/^[a-z]+$/.test(answer))) {
                    return '包名只能由小写英文字母组成';
                }

                return true;
            }
        },
        {
            type: 'input',
            name: 'name',
            message: '请输入包名?',
            validate(answer) {
                if ((/^\s+|\s+$/g).test(answer) || !(/^[a-z]+$/.test(answer))) {
                    return '包名只能由小写英文字母组成';
                }

                return true;
            }
        },
        {
            type: 'confirm',
            name: 'all',
            message: '选择项目启动方式?（y:指定, n:所有）',
            default: true,
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: '确认启动？',
            default: true,
        },
    ])
    .then(answers => {
        if (!answers.confirm) {
            return;
        }
        
        console.log('answers', answers);

        if (!answers.all) {
            // const execStartAll = exec(scripts.start, { encoding: 'utf8' });

            // execStartAll.stdout.on('data', function (data) {
            //   console.log(data);
            // });

            // execStartAll.stderr.on('data', function (data) {
            //   console.log(data);
            // });

            // execStartAll.on('exit', function (code) {
            //   console.log('child process exited with code ' + code);
            // });
        } else {
            // for (let name of answers.project) {
            //   const execStartSingle = exec(scripts['start:name'].replace('$name', name), { encoding: 'utf8' });

            //   execStartSingle.stdout.on('data', function (data) {
            //     console.log(data);
            //   });

            //   execStartSingle.stderr.on('data', function (data) {
            //     console.log(data);
            //   });

            //   execStartSingle.on('exit', function (code) {
            //     console.log('child process exited with code ' + code);
            //   });
            // }
        }
    });
}

