const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                    require('autoprefixer')({
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
                },
                // js, jsx, ts, tsx
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            "presets": [
                                "@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"
                            ],
                            "plugins": [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        "corejs": 3,
                                        "helpers": true,
                                        "regenerator": true,
                                        "useESModules": false
                                    }
                                ],
                                "@babel/plugin-transform-modules-commonjs",
                                "@babel/proposal-class-properties",
                                "@babel/proposal-object-rest-spread"
                            ],
                        }
                    }]
                },
                // svg
                {
                    test: /\.svg$/,
                    use: [{
                        loader: 'url-loader', //解决 ReactComponent 无法获取问题
                        options: {
                            esModule: false,
                        }
                    }],
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
                }
            ]
        }
    }
};