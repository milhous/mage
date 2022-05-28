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
// 读取应用json文件
export const readAppJson = (appPath: string): Promise<any> => fs.readJson(resolveAppPath(appPath));

/**
 * 获取目录信息
 * @param {string} dirPath 目录路径
 */
export const readDirInfo = async (dirPath: string): Promise<string[]> => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  let dirInfo = await fs.readdir(resolveCliPath('../' + dirPath));

  dirInfo = dirInfo.filter((item: string) => {
    return !reg.test(item);
  });

  return dirInfo;
};

/**
 * 读取json文件
 * @param filePath 文件路径
 */
export const readJson = (filePath: string): Promise<any> => fs.readJson(resolveCliPath('../' + filePath));

/**
 * 复制文件夹
 * @param {string} src 源路径
 * @param {string} dist 目标路径
 */
export const copyFolder = async (src: string, dist: string): Promise<void> => {
  const isSrcExist = await fs.pathExists(src);

  if (!isSrcExist) {
    return;
  }

  const isDestExist = await fs.pathExists(dist);

  if (isDestExist) {
    await fs.emptyDir(dist);
  } else {
    await fs.ensureDir(dist);
  }

  await fs.copy(src, dist);
};
