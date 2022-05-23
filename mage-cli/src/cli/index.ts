// 类型
import { CommandType } from '../helpers/types.js';

// 初始化
import init from './init.js';
// 启动（单个项目）
import start from './start.js';
// 启动（多个项目）
import launch from './launch.js';
// 构建
import build from './build.js';

export default async (name: string, args: any): Promise<void> => {
    switch (name) {
        case CommandType.INIT:
            init();
            
            break;
        case CommandType.LAUNCH:
            launch();

            break;
        case CommandType.START:
            start(args);

            break;
        case CommandType.BUILD:
            build();

            break;
    }

    // if (name === 'init') {
    //   const cilScript = await import(`./${name}`)
    //   await cilScript.default.setup(cliOptions)
    //   return
    // }
    // // 全局变量实例化 store & config
    // await store.setup(mode, cliOptions, pkg)
    // //webpack 实例化
    // await wpConfig.setup()
    // // 初始化所有 EMP Plugins
    // await configPlugins.setup()
    // // webpack Chain
    // await configChain.setup()
    // // 执行cli脚本
    // name = !!store.config.build.lib ? 'build' : name
    // const cilScript = await import(`./${name}`)
    // await cilScript.default.setup(cliOptions)
}