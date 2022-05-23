const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = async args => {
  const minimizer = [];
  const isDev = args.mode === 'development';

  if (!isDev) {
    minimizer.push(
      // js压缩
      new TerserPlugin({
        exclude: /node_modules/,
        parallel: true,
        extractComments: false,
        terserOptions: {
          comments: false,
          compress: {
            passes: 2,
            // 删除无用的代码
            unused: true,
            // 删掉 debugger
                        drop_debugger: true, // eslint-disable-line
            // 移除 console
                        drop_console: true, // eslint-disable-line
            // 移除无用的代码
                        dead_code: true // eslint-disable-line
          },
        },
      }),
      // css压缩
      new CssMinimizerPlugin({
        parallel: true,
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      })
    );
  }

  return {
    optimization: {
      chunkIds: 'deterministic',
      minimize: true,
    },
  };
};
