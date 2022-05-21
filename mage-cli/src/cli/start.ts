

import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getConfig from '../config/index.js';
// const { resolveAppPath } = require('../helpers/paths');
// const { getProjectConfig } = require('../helpers/project');

import store from '../helpers/store.js';

chalk.level = 1;

// 启动（单个项目）
export default async (args: any): Promise<void> => {
    // const config = getConfig(111);

    // const config = await getProjectConfig(args);
    // const compiler = webpack(config);
    // const { name } = require(resolveAppPath('./package.json'));

    // const appDir = fs.realpathSync(process.cwd());

    await store.init(args);

    const basicConfig = store.getBasicConfig();

    console.log(chalk.green.bold(`\n=== BTG <${basicConfig.name}> Service is starting.===\n`));

    console.log(basicConfig, args);

    // console.log('config', config);
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