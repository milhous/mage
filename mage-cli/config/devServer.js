const { resolveAppPath } = require('../helpers/paths');

module.exports = (args) => {
    return {
        devServer: {
            bonjour: true,
            port: 3001,
            hot: true,
            open: false,
            firewall: false,
            historyApiFallback: true,
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