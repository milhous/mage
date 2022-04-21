const chalk = require('chalk');
const fs = require('fs-extra');
// 交互式命令行工具
const inquirer = require('inquirer');
const { resolveAppPath } = require('../helpers/paths');
const exec = require('child_process').exec;

// 解决chalk设置样式没有生效。
chalk.level = 1;

module.exports = async args => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  const entry = resolveAppPath('packages');
  const dirInfo = fs.readdirSync(entry);
  const choices = [];
  let launch = !!process.env.LAUNCH && process.env.LAUNCH.split(',');
  launch = Array.isArray(launch) && launch.length ? launch : ['main', 'bitgame'];

  for (const item of dirInfo) {
    if (!reg.test(item)) {
      choices.push({
        name: item,
        checked: launch.includes(item),
      });
    }
  }

  const { scripts } = require(resolveAppPath('./package.json'));

  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'all',
        message: '选择项目启动方式?（y:指定, n:所有）',
        default: true,
      },
      {
        type: 'checkbox',
        message: '选择启动项目:',
        name: 'project',
        choices: choices,
        loop: false,
        when(answers) {
          return answers.all;
        },
        validate(answer) {
          if (!answer.includes('main') || !answer.includes('bitgame')) {
            return '必须选择 main & bitgame';
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

      if (!answers.all) {
        const execStartAll = exec(scripts.start, { encoding: 'utf8' });

        execStartAll.stdout.on('data', function (data) {
          console.log(data);
        });

        execStartAll.stderr.on('data', function (data) {
          console.log(data);
        });

        execStartAll.on('exit', function (code) {
          console.log('child process exited with code ' + code);
        });
      } else {
        for (let name of answers.project) {
          const execStartSingle = exec(scripts['start:name'].replace('$name', name), { encoding: 'utf8' });

          execStartSingle.stdout.on('data', function (data) {
            console.log(data);
          });

          execStartSingle.stderr.on('data', function (data) {
            console.log(data);
          });

          execStartSingle.on('exit', function (code) {
            console.log('child process exited with code ' + code);
          });
        }
      }
    });
};
