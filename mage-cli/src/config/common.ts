// 通用
export default (args: any) => {
    return {
        resolve: {
            modules: ['node_modules'],
            extensions: [
              '.js',
              '.jsx',
              '.mjs',
              '.ts',
              '.tsx',
              '.css',
              '.less',
              '.scss',
              '.sass',
              '.json',
              '.wasm',
              '.vue',
              '.svg',
              '.svga',
            ],
            alias: {},
          },
        }
    };
};