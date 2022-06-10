import svgToMiniDataURI from 'mini-svg-data-uri';
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

// 文件
export default () => {
  return {
    module: {
      rules: [
        // svg
        {
          test: /\.svg$/,
          type: 'asset/inline',
          generator: {
            dataUrl(content: any) {
              content = content.toString();
              return svgToMiniDataURI(content);
            },
          },
          use: [
            {
              loader: require.resolve('svgo-loader'),
              options: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        cleanupIDs: false,
                      },
                    },
                  },
                ],
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
