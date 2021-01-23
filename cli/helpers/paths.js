const path = require('path');
const fs = require('fs-extra');

// 当前应用路径
const appDir = fs.realpathSync(process.cwd());
// 路径或路径片段的序列解析为应用绝对路径
const resolveAppPath = appPath => path.resolve(appDir, appPath);
// 检测应用路径是否存在
const existsAppPath = appPath => fs.pathExists(resolveAppPath(appPath));

module.exports = {
    appDir,
    resolveAppPath,
    existsAppPath
}