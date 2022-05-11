import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssPxtorem from 'postcss-pxtorem';
import postcssNormalize from 'postcss-normalize';

// 正则表达式
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

// 获取 style-loader 配置
const getStyleLoaderConfig = (isDev: boolean = true) => {
    return isDev
        ? {
            loader: 'style-loader',
            options: {},
        }
        : {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '',
            },
        }
};

// 获取 css-loader 配置
const getCssLoaderConfig = (isDev: boolean = true, isModules: boolean = false) => {
    const localIdentName = isDev ? '[path][name]-[local]-[hash:base64:5]' : '[local]-[hash:base64:5]';
    
    return {
        loader: 'css-loader',
        options: {
            modules: isModules ? { localIdentName } : isModules,
        },
    }
};

// 获取 postcss-loader 配置
const getPostcssLoaderConfig = (isDev: boolean = true) => {
    const browserslist = isDev ? [
        'last 1 chrome version',
        'last 1 firefox version',
        'last 1 safari version',
        'last 1 ie version'
    ] : [
        'last 1 version',
        '> 1%',
        'maintained node versions',
        'not dead'
    ];

    return {
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                hideNothingWarning: true,
                plugins: [
                    autoprefixer({
                        grid: 'autoplace',
                        cascade: true,
                        remove: true,
                        // 解决各个应用无需在package.json配置Browserslist
                        overrideBrowserslist: browserslist,
                    }),
                    postcssPxtorem({
                        rootValue: 100,
                        unitPrecision: 2,
                        propList: ['*'],
                        replace: true,
                        mediaQuery: false,
                        minPixelValue: 2,
                        exclude: /node_modules/i,
                    }),
                    postcssNormalize({
                        browsers: browserslist.join(',')
                    })
                ]
            },
        },
    }
};

// 获取 less-loader 配置
const getLessLoaderConfig = (isModules: boolean = false) => {
    return isModules
        ? { loader: 'less-loader' }
        : {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    javascriptEnabled: true
                },
            },
        }
}

// 样式
export default (args: any) => {
    const { isDev } = args;

    return {
        module: {
            rules: [
                // css
                {
                    test: cssRegex,
                    exclude: cssModuleRegex,
                    use: [
                        getStyleLoaderConfig(isDev),
                        getCssLoaderConfig(isDev),
                        getPostcssLoaderConfig(isDev)
                    ],
                },
                // css module
                {
                    test: cssModuleRegex,
                    use: [
                        getStyleLoaderConfig(isDev),
                        getCssLoaderConfig(isDev, true),
                        getPostcssLoaderConfig(isDev)
                    ],
                },
                // less
                {
                    test: lessRegex,
                    exclude: lessModuleRegex,
                    use: [
                        getStyleLoaderConfig(isDev),
                        getCssLoaderConfig(isDev),
                        getPostcssLoaderConfig(isDev),
                        getLessLoaderConfig(false)
                    ],
                },
                // less module
                {
                    test: lessModuleRegex,
                    use: [
                        getStyleLoaderConfig(isDev),
                        getCssLoaderConfig(isDev, true),
                        getPostcssLoaderConfig(isDev),
                        getLessLoaderConfig(true)
                    ],
                },
            ]
        }
    };
};