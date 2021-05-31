const { ModuleFederationPlugin } = require("webpack").container;
const { name, dependencies } = require("./package.json");

module.exports = (args) => {
    const [, appname] = name.split('/');
    const filename = args.mode === 'production' ? 'remoteEntry.js' : 'remoteEntry.js'

    return {
        devServer: {
            port: 9006
        },
        plugins: [
            new ModuleFederationPlugin({
                name: appname,
                filename,
                exposes: {
                    "./Widget": "./src/Widget"
                },
                shared: {
                    ...dependencies,
                    "react": { singleton: true },
                    "react-dom": { singleton: true }
                }
            })
        ]
    }
};