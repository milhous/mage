import svgToMiniDataURI from 'mini-svg-data-uri';

// 文件
export default (args: any) => {
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
                    loader: 'svgo-loader',
                    options: {
                        plugins: [
                            {
                                name: "preset-default",
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                        cleanupIDs: false,
                                    },
                                },
                            },
                        ]
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