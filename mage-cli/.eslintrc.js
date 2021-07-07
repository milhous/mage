module.exports = {
  // ESLint默认使用Espree作为其解析器
  parser: '@typescript-eslint/parser',
  /**
   * extends属性值可以是一个字符串或字符串数组
   * 数组中每个配置项继承它前面的配置
   */
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  // ESLint支持使用第三方插件
  plugins: ['@typescript-eslint'],
  // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
  // 支持在配置文件添加共享设置
  settings: {
    //自动发现React的版本，从而进行规范react代码
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  ignorePatterns: ['**/node_modules/**'],
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
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        // 超过最大值换行
        printWidth: 120,
        // 是否使用分号，默认true，使用分号
        semi: true,
        // 是否使用单引号，默认为false
        singleQuote: true,
        // 末尾逗号 none 末尾没有逗号 es5 es5有效的地方保留 all 在可能的地方都加上逗号
        trailingComma: 'es5',
        // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
        bracketSpacing: true,
        // 在jsx中把'>' 是否单独放一行
        jsxBracketSameLine: false,
        // 在jsx中使用单引号代替双引号
        jsxSingleQuote: false,
        //箭头函数中的括号always avoid
        arrowParens: 'avoid',
        // 是否在格式化的文件顶部插入Pragma标记，以表明该文件被prettier格式化过了
        insertPragma: false,
        // 是否严格按照文件顶部的特殊注释格式化代码
        requirePragma: false,
        // 缩进字节数
        tabWidth: 2,
        // 缩进不使用tab，使用空格
        useTabs: false,
        // 结尾是 \n \r \n\r auto
        endOfLine: 'auto',
        // html文件的空格敏感度，控制空格是否影响布局
        htmlWhitespaceSensitivity: 'ignore',
        // 要求对象字面量属性是否使用引号包裹,(‘as-needed’: 没有特殊要求，禁止使用，'consistent': 保持一致 , preserve: 不限制，想用就用)
        quoteProps: 'as-needed',
      },
    ],
  },
};
