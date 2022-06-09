import webpack from 'webpack';

// 日志
import logger from '../helpers/logger.js';
// 工具
import {resolveCliPath, copyFolder} from '../helpers/utils.js';
// 配置
import store from '../helpers/store.js';
// webpack
import getWebpackConfig from '../webpack/index.js';

// 构建
export default async (args: any): Promise<void> => {
  await store.init(args);

  const basicConfig = store.getBasicConfig();
  const name = basicConfig.name;
  const webpackConfig = await getWebpackConfig();

  logger.info(`\n=== Package <${name}> compiled with start.===\n`);

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
        }),
      );

      if (stats.hasWarnings()) {
        logger.warn(`\n=== Package <${name}> compiled with warnings.===\n`);

        logger.warn(
          stats.toString({
            all: false,
            colors: true,
            warnings: true,
          }),
        );
      }

      if (stats.hasErrors()) {
        logger.error(`\n=== Package <${name}> failed to compile.===\n`);

        logger.error(
          stats.toString({
            all: false,
            colors: true,
            errors: true,
          }),
        );

        process.exit(1);
      } else {
        (async () => {
          await copyFolder(basicConfig.dist, resolveCliPath('../build/' + basicConfig.name));

          logger.info(`\n=== Package <${name}> compiled successfully.===\n`);
        })();
      }
    }
  });
};
