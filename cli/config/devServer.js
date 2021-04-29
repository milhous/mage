const { resolveAppPath } = require('../helpers/paths');

module.exports = (args) => {
    return {
        devServer: {
            bonjour: true,
            port: 3001,
            historyApiFallback: true,
            hot: true,
            open: false,
            compress: true,
            historyApiFallback: true,
            host: '0.0.0.0',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            },
            client: {
                overlay: true,
            },
        }
    };
};