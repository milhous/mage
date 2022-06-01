import path from 'path';
import fs from 'fs-extra';
import {format, writeToPath} from '@fast-csv/format';

// 工具
import {resolveCliPath, readDirInfo, formatDate} from './utils.js';

/**
 * 声明 - 配置
 * @property VERSION 版本号
 * @method import 导入
 * @method export 导出
 */
interface ICsv {
  VERSION: string;

  import(packages: string[], dir: string): void;
  export(packages: string[], mode: number): void;
}

class Csv implements ICsv {
  // 版本号
  public VERSION = '1.0.0';

  // 导出目录
  private _exportDir: string = resolveCliPath('../csv');

  constructor() {}

  static instance: ICsv;

  static getInstance(): ICsv {
    if (!Csv.instance) {
      Csv.instance = new Csv();
    }

    return Csv.instance;
  }

  /**
   * 导入
   * @param {string} dir csv文件目录
   * @param {Array<string>} packages 应用名
   */
  public import(packages: string[], dir: string): void {
    console.log('导入', dir);
  }

  /**
   * 导出
   * @param {Array<string>} packages 应用名
   * @param {number} mode 模式 0:无, 1:空项, 2:全量
   */
  public async export(packages: string[], mode: number): Promise<void> {
    await fs.ensureDir(this._exportDir);

    for (const name of packages) {
      const localesInfo = await this._getLocalesInfo(name);

      const localesData = await this._readLocalesInfo(name, localesInfo);

      this._create(name, localesData);
    }
  }

  /**
   * 创建
   * @param name 应用名
   * @param rows 数据
   */
  private _create(name: string, rows: string[][]): Promise<void> {
    return new Promise((resolve, reject) => {
      const time = formatDate('MMDDHHmm');

      writeToPath(path.resolve(this._exportDir, `${name}_${time}.csv`), rows, {
        writeBOM: true,
      })
        .on('error', err => {
          console.error(err);

          reject(err);
        })
        .on('finish', () => {
          console.log('Done writing.');

          resolve();
        });
    });
  }

  /**
   * 获取多语言目录信息(路径 & 文件名)
   * @param {string} name 应用名
   * @returns {Array<string>}
   */
  private async _getLocalesInfo(name: string): Promise<Map<string, string[]>> {
    const localesPath = `packages/${name}/locales`;
    const localesDir = await readDirInfo(localesPath);
    const localesMap: Map<string, string[]> = new Map();

    for (const folder of localesDir) {
      const path = `${localesPath}/${folder}`;
      const files = await readDirInfo(path);

      localesMap.set(path, files);
    }

    return localesMap;
  }

  /**
   * 读取多语言目录信息
   * @param {string} name 应用名
   * @param {Map<string, string[]>} info 信息
   * @returns {Array<string[]>}
   */
  private async _readLocalesInfo(name: string, info: Map<string, string[]>): Promise<string[][]> {
    const dataMap: Map<string, string[]> = new Map();
    const headerField: string[] = [name + ':translationId'];

    for (const [dir, files] of info.entries()) {
      const foldername = path.parse(dir).name;
      const filesMap = await this._getFilesContent(dir, files);

      headerField.push(foldername);

      for (const [key, val] of filesMap.entries()) {
        const arr = dataMap.has(key) ? dataMap.get(key) : [];

        if (Array.isArray(arr)) {
          arr.push(val);

          dataMap.set(key, arr);
        }
      }
    }

    return this._formatLocalesInfo(headerField, dataMap);
  }

  /**
   * 获取文件内容
   * @param {string} dir 目录
   * @param {Array<string>} files 文件
   */
  private async _getFilesContent(dir: string, files: string[]): Promise<Map<string, string>> {
    const dataMap: Map<string, string> = new Map();

    for (const name of files) {
      const filepath = path.resolve(dir, name);
      const filename = path.parse(filepath).name;
      const data = await fs.readJson(filepath);

      for (const key in data) {
        const fieldname = filename + ':' + key;

        dataMap.set(fieldname, data[key]);
      }
    }

    return dataMap;
  }

  /**
   * 格式化多语言信息
   * @param {Array<string>} header 头部字段
   * @param {Map<string, string[]>} data 数据
   * @returns {Array<string[]>}
   */
  private _formatLocalesInfo(header: string[], data: Map<string, string[]>): string[][] {
    const arr: string[][] = [];

    arr.push(header);

    for (const [key, val] of data.entries()) {
      arr.push([key, ...val]);
    }

    return arr;
  }
}

// 定义全局变量
const csv: ICsv = Csv.getInstance();

export default csv;
