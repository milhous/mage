// 模块
export default (args: any) => {
    const { isDev } = args;
    const browserslist = isDev ? [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
        'last 1 ie version'
    ] : [
        'last 1 version',
        '> 1%',
        'maintained node versions',
        'not dead'
    ];

    return {
        module: {
            rules: [{
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "swc-loader",
                    options: {
                        // This makes swc-loader invoke swc synchronously.
                        sync: true,
                        env: {
                            targets: browserslist.join(',')
                        },
                        jsc: {
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                    development: isDev,
                                    refresh: isDev,
                                },
                            },
                        },
                    }
                }
            }]
        }
    }
};