import {createRequire} from 'module';

const require = createRequire(import.meta.url);

/**
 * 文件
 * @param {boolean} isDev 是否是开发环境
 * @param {Array<string>} browserslist 目标浏览器版本范围
 */
export default (isDev: boolean, browserslist: string[]) => {
  return {
    module: {
      rules: [
        // svg
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: require.resolve('swc-loader'),
              options: {
                // This makes swc-loader invoke swc synchronously.
                sync: true,
                env: {
                  targets: browserslist.join(','),
                },
                jsc: {
                  externalHelpers: false,
                  loose: true,
                  parser: {syntax: 'typescript', tsx: true, decorators: true, dynamicImport: true},
                  transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                    react: {
                      runtime: 'automatic',
                      development: isDev,
                      refresh: isDev,
                    },
                  },
                },
              },
            },
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                  ],
                },
                babel: false,
              },
            },
          ],
        },
        // 图片
        {
          test: /\.(png|jpe?g|gif|webp|ico)$/i,
          type: 'asset/resource',
        },
        // 字体
        {
          test: /\.(|otf|ttf|eot|woff|woff2)$/i,
          type: 'asset/resource',
        },
        // svga
        {
          test: /\.(svga)$/i,
          type: 'asset/resource',
        },
      ],
    },
  };
};
