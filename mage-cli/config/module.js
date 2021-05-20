/**
 * @param {string} mode 模式
 */
module.exports = ({ mode }) => {
    const isDev = mode === 'development';

    return {
        module: {
            rules: [
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
                                "@babel/proposal-object-rest-spread",
                                isDev && require.resolve('react-refresh/babel'),
                            ].filter(Boolean),
                        }
                    }]
                }
            ]
        }
    }
};