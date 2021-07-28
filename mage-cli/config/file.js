const svgToMiniDataURI = require('mini-svg-data-uri');
const chalk = require('chalk');

module.exports = args => {
  return {
    module: {
      rules: [
        // svg
        {
          test: /\.svg$/,
          type: 'asset/inline',
          generator: {
            dataUrl(content) {
              content = content.toString();
              return svgToMiniDataURI(content);
            },
          },
          use: 'svgo-loader',
          // use: [
          //   {
          //     loader: 'url-loader', //解决 ReactComponent 无法获取问题
          //     options: {
          //       generator: (content, mimetype, encoding, resourcePath) => {
          //         console.log('content', mimetype, encoding, resourcePath);

          //         console.log(chalk.green.bold(`\n=== content <${11}> Compiled with start.===\n`));

          //         return svgToMiniDataURI(content.toString());
          //       },
          //     },
          //   },
          // ],
        },
        // 图片
        {
          test: /\.(png|jpe?g|gif|webp|ico)$/i,
          type: 'asset',
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
