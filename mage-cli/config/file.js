module.exports = args => {
  return {
    module: {
      rules: [
        // svg
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'url-loader', //解决 ReactComponent 无法获取问题
              options: {
                esModule: false,
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
