export default () => {
  return {
    name: 'points',
    port: 9005,
    remotes: {},
    exposes: {},
    shared: {},
  };
};

// const { ModuleFederationPlugin } = require("webpack").container;
// const { name } = require("./package.json");

// module.exports = (args) => {
//     const [, appname] = name.split('/');
//     return {
//         devServer: {
//             port: 9005
//         },
//         plugins: [
//             new ModuleFederationPlugin({
//                 name: appname,
//                 shared: {
//                     "react": { singleton: true },
//                     "react-dom": { singleton: true }
//                 }
//             })
//         ]
//     }
// };
