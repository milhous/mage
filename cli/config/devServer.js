const { resolveAppPath } = require('../helpers/paths');

module.exports = (args) => {
    return {
        devServer: {
            contentBase: resolveAppPath(args.dist),
            hot: true,
            compress: true,
            historyApiFallback: true,
            port: 3001,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
            }
        }
    };
};