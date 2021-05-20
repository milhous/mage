const path = require('path');
const chalk = require('chalk');
// 交互式命令行工具
const inquirer = require('inquirer');
const { resolveAppPath } = require('../helpers/paths');

// 解决chalk设置样式没有生效。
chalk.level = 1;

module.exports = async args => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名:',
                default: function () {
                    return ''
                },
                validate: function (input) {
                    const done = this.async();
                    let tips = null;

                    if (input === '') {
                        tips = '项目名不能为空';
                    } else if (!(/^[A-Za-z]+$/g.test(input))) {
                        tips = '项目名只能由字母组成';
                    }

                    done(tips, tips === null);
                }
            },
            {
                type: 'input',
                name: 'description',
                message: '请输入描述:',
                default: function () {
                    return ''
                },
                validate: function (input) {
                    const done = this.async();
                    let tips = null;

                    if (input === '') {
                        tips = '描述不能为空';
                    }

                    done(tips, tips === null);
                }
            },
            {
                type: 'list',
                name: 'type',
                message: '请选择类型:',
                choices: ['app', 'libs']
            },
            {
                type: 'confirm',
                name: 'confirm',
                message: '确认创建项目？',
                default: true
            } 
        ])
        .then(answers => {
            if (!answers.confirm) {
                return;
            }

            console.log(answers);
        });
}