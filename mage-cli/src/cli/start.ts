

import chalk from 'chalk';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import store from '../helpers/store.js';

import getWebpackConfig from '../webpack/index.js';

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

    const webpackConfig = getWebpackConfig();

    const compiler = webpack(webpackConfig);

    console.log(chalk.green.bold(`\n=== BTG <${basicConfig.name}> Service is starting.===\n`));

    const server = new WebpackDevServer(compiler, webpackConfig.devServer);
    const host = webpackConfig.devServer.host || 'localhost';
    const port = webpackConfig.devServer.port;
    server.listen(port, host, err => {
        if (err) {
            console.error(err);
            return;
        }

        const protocol = webpackConfig.devServer.https ? 'https' : 'http';
        const url = `${protocol}://${host}:${port}`;

        console.log(chalk.green.bold(`\n=== BTG <${basicConfig.name}> Starting server on ${url} ===\n`));
    });
};