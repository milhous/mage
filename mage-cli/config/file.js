const svgToMiniDataURI = require('mini-svg-data-uri');
const { extendDefaultPlugins } = require('svgo');

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
          use: [
            {
              loader: 'svgo-loader',
              options: {
                plugins: extendDefaultPlugins([
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'cleanupIDs',
                    active: false,
                  },
                ]),
              },
            },
          ],
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
