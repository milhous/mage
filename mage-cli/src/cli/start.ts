

import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import store from '../helpers/store.js';

import getWebpackConfig from '../webpack/index.js';

chalk.level = 1;

// 启动（单个项目）
export default async (args: any): Promise<void> => {
    await store.init(args);

    const basicConfig = store.getBasicConfig();

    const webpackConfig = getWebpackConfig();

    const compiler = webpack(webpackConfig);

    console.log(chalk.green.bold(`\n=== BTG <${basicConfig.name}> Service is starting.===\n`));

    const server = new WebpackDevServer(webpackConfig.devServer, compiler);

    server.startCallback(() => {
        const host = webpackConfig.devServer.host || 'localhost';
        const port = webpackConfig.devServer.port;
        const protocol = webpackConfig.devServer.https ? 'https' : 'http';
        const url = `${protocol}://${host}:${port}`;

        console.log(chalk.green.bold(`\n=== BTG <${basicConfig.name}> Starting server on ${url} ===\n`));

        console.log('Successfully started server on http://localhost:8080');
    });
};