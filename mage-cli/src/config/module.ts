// 模块
export default (args: any) => {
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
                        jsc: {
                            parser: {
                                syntax: "typescript"
                            }
                        }
                    }
                }
            }]
        }
    }
};