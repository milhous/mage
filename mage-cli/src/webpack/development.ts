import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

/**
 * 开发
 * @param {number} port 端口号
 * @param {string} dist 应用源码生成目录
 */
export default (port: number, dist: string) => {
    return {
        devServer: {
            static: dist,
            hot: true,
            https: false,
            // https:
            //   process.env.HTTPS && process.env.HTTPS.toLowerCase() !== 'false'
            //     ? {
            //         key: fs.readFileSync(path.join(__dirname, './cat/www.local.devbitgame.com-key.pem')),
            //         cert: fs.readFileSync(path.join(__dirname, './cat/www.local.devbitgame.com.pem')),
            //       }
            //     : false,
            host: '0.0.0.0',
            port,
            compress: true,
            historyApiFallback: true,
            open: false,
            allowedHosts: ['all'],
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
              'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
            client: {
                overlay: true,
            }
        },
        plugins: [new ReactRefreshWebpackPlugin()],
    };
};