

import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getConfig from '../config/index.js';
// const { resolveAppPath } = require('../helpers/paths');
// const { getProjectConfig } = require('../helpers/project');

chalk.level = 1;

// 启动（单个项目）
export default async (): Promise<void> => {
    const config = getConfig(111);

    // const config = await getProjectConfig(args);
    // const compiler = webpack(config);
    // const { name } = require(resolveAppPath('./package.json'));

    const name = 'home';

    console.log(chalk.green.bold(`\n=== BTG <${name}> Service is starting.===\n`));

    console.log('config', config);
    // const server = new WebpackDevServer(compiler, config.devServer);
    // const host = config.devServer.host || 'localhost';
    // const port = config.devServer.port;
    // server.listen(port, host, err => {
    //     if (err) {
    //         console.error(err);
    //         return;
    //     }

    //     const protocol = config.devServer.https ? 'https' : 'http';
    //     const url = `${protocol}://${host}:${port}`;

    //     console.log(chalk.green.bold(`\n=== BTG <${name}> Starting server on ${url} ===\n`));
    // });
};