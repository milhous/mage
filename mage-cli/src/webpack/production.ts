import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin'

/**
 * 生产
 * @param {boolean} isDev 是否是开发环境
 */
export default (isDev: boolean) => {
    const minimizer: any[] = [];

    if (isDev) {
        minimizer.push(
            // js压缩
            new TerserPlugin({
                exclude: /node_modules/,
                // extractComments 选项暂不支持，所有注释将默认被删除，会在将来得到修复。
                extractComments: false,
                minify: TerserPlugin.swcMinify,
                terserOptions: {
                    format: {
                        comments: false,
                    }
                },
            }),
            // css压缩
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                        discardComments: {removeAll: true},
                        },
                    ],
                },
            })
        );
    }

    return {
        performance: {
            hints: 'warning',
            maxEntrypointSize: 512000,
            maxAssetSize: 512000,
        },
        optimization: {
            chunkIds: 'deterministic', // deterministic 在不同的编译中不变的短数字 id。有益于长期缓存。在生产模式中会默认开启。
            minimize: true,
            minimizer
        }
    };
};