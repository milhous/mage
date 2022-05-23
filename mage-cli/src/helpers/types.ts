/**
 * 命令类型
 * @property INIT 初始化
 * @property LAUNCH 启动（多个项目）
 * @property START 启动（单个项目）
 * @property BUILD 构建
 */
export const CommandType = {
    'INIT': 'init',
    'LAUNCH': 'launch',
    'START': 'start',
    'BUILD': 'build'
};

/**
 * 模式类型
 * @property DEVELOPMENT 开发
 * @property PRODUCTION 生产
 * @property NONE 不使用任何默认优化选项
 */
export const ModeType = {
    'DEVELOPMENT': 'development',
    'PRODUCTION': 'production',
    'NONE': 'none'
};