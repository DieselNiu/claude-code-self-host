module.exports = {
  root: true,
  env: {
    node: true,
    es2021: true,
    commonjs: true
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: ['prettier'],
  rules: {
    // 基础规则
    'no-console': 'off', // Node.js 项目允许 console
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'prettier/prettier': 'error',

    // 变量相关
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrors: 'none'
      }
    ],
    'prefer-const': 'error',
    'no-var': 'error',
    'no-shadow': 'error',

    // 代码质量
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'consistent-return': 'error',
    'no-throw-literal': 'error',
    'prefer-promise-reject-errors': 'error',

    // 代码风格
    'object-shorthand': 'error',
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],

    // Node.js 特定规则
    'no-process-exit': 'error',
    'no-path-concat': 'error',
    'handle-callback-err': 'error',

    // ES6+ 规则
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': 'error',
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true
      }
    ],

    // 格式化规则（由 Prettier 处理）
    semi: 'off',
    quotes: 'off',
    indent: 'off',
    'comma-dangle': 'off'
  },
  overrides: [
    {
      // CLI 和脚本文件
      files: ['cli/**/*.js', 'scripts/**/*.js'],
      rules: {
        'no-process-exit': 'off' // CLI 脚本允许 process.exit
      }
    },
    {
      // 测试文件
      files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
      env: {
        jest: true
      },
      rules: {
        'no-unused-expressions': 'off'
      }
    }
  ]
}
