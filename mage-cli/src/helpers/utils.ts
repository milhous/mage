import * as url from 'url';
import path from 'path';
import fs from 'fs-extra';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// 路径或路径片段的序列解析为命令行绝对路径
export const resolveCliPath = (cliPath: string): string => path.resolve(__dirname, '../../', cliPath);

// 当前应用路径
export const appDir = fs.realpathSync(process.cwd());
// 路径或路径片段的序列解析为应用绝对路径
export const resolveAppPath = (appPath: string): string => path.resolve(appDir, appPath);
// 检测应用路径是否存在
export const existsAppPath = (appPath: string): Promise<boolean> => fs.pathExists(resolveAppPath(appPath));
