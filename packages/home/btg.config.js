export default () => {
  return {
    name: 'home',
    port: 9001,
    remotes: {},
    exposes: {},
    shared: {},
  };
};

// const { ModuleFederationPlugin } = require("webpack").container;
// const { name, dependencies } = require("./package.json");

// module.exports = (args) => {
//     const [, appname] = name.split('/');
//     const filename = args.mode === 'production' ? 'remoteEntry.[contenthash].js' : 'remoteEntry.js'

//     return {
//         devServer: {
//             port: 9001
//         },
//         plugins: [
//             new ModuleFederationPlugin({
//                 name: appname,
//                 filename,
//                 /**
//                  * eager：不会生成额外的 chunk。
//                  * 所有的模块都被当前的 chunk 引入，并且没有额外的网络请求。
//                  * 但是仍会返回一个 resolved 状态的 Promise。与静态导入相比，在调用 import() 完成之前，该模块不会被执行。
//                  *
//                  * singleton: 确保运行时模块为单例，避免初始化多次。
//                  */
//                 // shared: {
//                 //     ...dependencies,
//                 //     "react": { singleton: true },
//                 //     "react-dom": { singleton: true }
//                 // }
//             }),
//         ]
//     }
// };
