import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

// 开发
export default (args: any) => {
    const { port = 3001 } = args;

    return {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            static: './',
            hot: true,
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