const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const { getProjectConfig } = require('../helpers/project');
const { resolveAppPath } = require('../helpers/paths');
const { copyFolder } = require('../helpers/build');

// 解决chalk设置样式没有生效。
chalk.level = 1;

module.exports = async args => {
    const { name } = require(resolveAppPath('./package.json'));
    const config = await getProjectConfig(args);

    console.log(chalk.green.bold(`\n=== BTG <${name}> Compiled with start.===\n`));

    webpack(config, (err, stats) => {
        if (err) {
            console.error(err.stack || err);
            if (err.details) {
                console.error(err.details);
            }

            return;
        }

        console.log(
            stats.toString({
                colors: true,
                all: false,
                assets: true
            }),
        );

        if (stats.hasWarnings()) {
            console.log(chalk.yellow.bold(`\n=== BTG <${name}> Compiled with warnings.===\n`));
            console.log(
                stats.toString({
                    all: false,
                    colors: true,
                    warnings: true,
                }),
            );
        }

        if (stats.hasErrors()) {
            console.log(
                stats.toString({
                    all: false,
                    colors: true,
                    errors: true,
                }),
            );
            console.log(chalk.red.bold(`\n=== BTG <${name}> Failed to compile.===\n`));

            process.exit(1)
        }

        console.log(chalk.green.bold(`\n=== BTG <${name}> Compiled successfully.===\n`));

        // 复制其他文件到build
        const [, appname] = name.split('/');

        copyFolder(resolveAppPath(args.dist), path.resolve(__dirname, '../../build/' + appname));
    });
}