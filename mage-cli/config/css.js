const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const postcssNormalize = require('postcss-normalize');
const pxtorem = require('postcss-pxtorem');

/**
 * 获取样式通用配置
 * @param {string} mode 模式
 */
const getStyleLoader = ({ mode }) => {
    const prodMode = mode === 'production';
    const rules = [];

    if (prodMode) {
        rules.push({
            loader: MiniCssExtractPlugin.loader
        });
    } else {
        rules.push('style-loader');
    }

    rules.push({
        loader: 'css-loader',
        options: {
            modules: true,
        }
    }, {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    pxtorem({
                        rootValue: 100,
                        unitPrecision: 2,
                        propList: ['*'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 2,
                        exclude: /node_modules/i
                    }),
                    autoprefixer({
                        grid: 'autoplace',
                        cascade: true,
                        remove: true,
                        // 解决各个应用无需在package.json配置Browserslist
                        overrideBrowserslist: [
                            "defaults",
                            "not ie < 11",
                            "last 2 versions",
                            "> 1%",
                            "iOS 7",
                            "last 3 iOS versions"
                        ]
                    }),
                    postcssNormalize({
                        browsers: 'last 2 versions'
                    })
                ],
            }
        },
    });

    return rules;
};

module.exports = (args) => {
    return {
        module: {
            rules: [
                // css
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        ...getStyleLoader(args)
                    ]
                },
                // scss, sass
                {
                    test: /\.(scss|sass)$/,
                    exclude: /node_modules/,
                    use: [
                        ...getStyleLoader(args),
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass'),
                                sourceMap: args.mode === 'development',
                            },
                        }
                    ]
                },
                // less
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        ...getStyleLoader(args),
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: { javascriptEnabled: true }
                            },
                        }
                    ]
                }
            ]
        }
    }
};