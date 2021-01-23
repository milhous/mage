const { ModuleFederationPlugin } = require("webpack").container;
const { name } = require("./package.json");

module.exports = (args) => {
    const [, appname] = name.split('/');
    return {
        devServer: {
            port: 9001
        },
        plugins: [
            new ModuleFederationPlugin({
                name: appname,
                shared: {
                    "react": { singleton: true },
                    "react-dom": { singleton: true }
                }
            })
        ]
    }
};