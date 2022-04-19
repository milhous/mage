const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
// 交互式命令行工具
const inquirer = require('inquirer');
const { resolveAppPath } = require('../helpers/paths');
const exec = require('child_process').exec;

// 解决chalk设置样式没有生效。
chalk.level = 1;

module.exports = async args => {
  const entry = resolveAppPath('packages');
  const dirInfo = fs.readdirSync(entry);
  const choices = dirInfo.map(item => {
    return {
      name: item,
      checked: item === 'main',
    };
  });
  const { scripts } = require(resolveAppPath('./package.json'));

  console.log(scripts.start);

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'all',
        message: '是否启动所有项目?',
        default: true,
      },
      {
        type: 'checkbox',
        message: '选择启动项目:',
        name: 'project',
        choices: choices,
        loop: false,
        when(answers) {
          return !answers.all;
        },
        validate(answer) {
          if (answer.length < 1) {
            return '必须选择1个项目';
          }

          return true;
        },
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

      if (answers.all) {
        exec(scripts.start, { encoding: 'utf8' }, function (err, stdout, stderr) {
          console.log(err);

          if (err) {
            console.log(err);
            return;
          }

          console.log('stdout:' + stdout);
          console.log('stderr:' + stderr);
        });
      } else {
        for (let name of answers.project) {
          exec(scripts['start:name'].replace('$name', name), { encoding: 'utf8' }, function (err, stdout, stderr) {
            if (err) {
              console.log(err);
              return;
            }
            console.log('stdout:' + stdout);
            console.log('stderr:' + stderr);
          });
        }
      }
    });
};
