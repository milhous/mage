module.exports = {
    // ESLint默认使用Espree作为其解析器
    parser: '@typescript-eslint/parser',
    /**
     * extends属性值可以是一个字符串或字符串数组
     * 数组中每个配置项继承它前面的配置
     */
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    // ESLint支持使用第三方插件
    plugins: ['@typescript-eslint'],
    // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境
    env: {
        browser: true,
        node: true,
    },
    // 支持在配置文件添加共享设置
    settings: {
        //自动发现React的版本，从而进行规范react代码
        react: {
            pragma: 'React',
            version: 'detect',
        },
    },
    // parser解析代码时的参数
    parserOptions: {
        //指定ESLint可以解析JSX语法
        ecmaVersion: 2020,
        //设置为script(默认)或module（如果你的代码是ECMAScript模块)
        sourceType: 'module',
        // 使用的额外的语言特性,所有选项默认都是false
        ecmaFeatures: {
            //启用JSX
            jsx: true,
        },
    },
    /**
     * 具体规则配置
     * off或0--关闭规则
     * warn或1--开启规则，警告级别(不会导致程序退出)
     * error或2--开启规则，错误级别(当被触发的时候，程序会退出)
     */
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 0,
        'react/react-in-jsx-scope': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unused-vars': 0,
        '@typescript-eslint/no-use-before-define': 0,
        '@typescript-eslint/class-name-casing': 0,
        '@typescript-eslint/triple-slash-reference': 0,
        'react-hooks/rules-of-hooks': 'warn',
        'react-hooks/exhaustive-deps': 'off',
        'prettier/prettier': [
            'error',
            {
                printWidth: 120,
                semi: false,
                singleQuote: true,
                trailingComma: 'all',
                bracketSpacing: false,
                jsxBracketSameLine: true,
                arrowParens: 'avoid',
                insertPragma: false,
                tabWidth: 2,
                useTabs: false,
                endOfLine: 'auto',
            },
        ],
    },
}