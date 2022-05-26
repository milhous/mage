import chalk from 'chalk';
import webpack from 'webpack';

import store from '../helpers/store.js';
import getWebpackConfig from '../webpack/index.js';

// 解决chalk设置样式没有生效。
chalk.level = 1;

// 构建
export default async (args: any): Promise<void> => {
    await store.init(args);

    const basicConfig = store.getBasicConfig();
    const name = basicConfig.name;
    const webpackConfig = getWebpackConfig();

    console.log(chalk.green.bold(`\n=== BTG <${name}> Compiled with start.===\n`));

    webpack(webpackConfig, (err, stats) => {
        if (err) {
            console.error(err.stack || err);

            return;
        }

        if (!!stats) {
            console.log(
                stats.toString({
                    colors: true,
                    all: false,
                    assets: true,
                })
            );
    
            if (stats.hasWarnings()) {
                console.log(chalk.yellow.bold(`\n=== BTG <${name}> Compiled with warnings.===\n`));
                console.log(
                    stats.toString({
                        all: false,
                        colors: true,
                        warnings: true,
                    })
                );
            }
    
            if (stats.hasErrors()) {
                console.log(
                    stats.toString({
                        all: false,
                        colors: true,
                        errors: true,
                    })
                );
                console.log(chalk.red.bold(`\n=== BTG <${name}> Failed to compile.===\n`));
    
                process.exit(1);
            }

            if (!stats.hasErrors() && !stats.hasWarnings()) {
                console.log(chalk.green.bold(`\n=== BTG <${name}> Compiled successfully.===\n`));
            }
        }
    });
}