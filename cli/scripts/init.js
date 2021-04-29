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
            },
            {
                type: 'list',
                name: 'type',
                message: '请选择类型:',
                choices: ['App', 'Other'],
            },
            {
                type: 'confirm',
                name: 'type',
                message: '请选择类型:',
                default:  true
            } 
        ])
        .then(answers => {
            console.log(answers);
        });

    console.log('init');
}