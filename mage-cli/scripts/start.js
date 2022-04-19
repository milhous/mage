const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const { resolveAppPath } = require('../helpers/paths');
const { getProjectConfig } = require('../helpers/project');

chalk.level = 1;

module.exports = async (args = {}) => {
  const config = await getProjectConfig(args);
  const compiler = webpack(config);
  const { name } = require(resolveAppPath('./package.json'));

  console.log(chalk.green.bold(`\n=== BTG <${name}> Service is starting.===\n`));

  const server = new WebpackDevServer(compiler, config.devServer);
  const host = config.devServer.host || 'localhost';
  const port = config.devServer.port;
  server.listen(port, host, err => {
    if (err) {
      console.error(err);
      return;
    }

    const protocol = config.devServer.https ? 'https' : 'http';
    const url = `${protocol}://${host}:${port}`;

    console.log(chalk.green.bold(`\n=== BTG <${name}> Starting server on ${url} ===\n`));
  });
};
