import path from 'path';
import fs from 'fs-extra';
import {format, writeToPath} from '@fast-csv/format';
import {parseFile} from '@fast-csv/parse';

// 类型
import {ExportModeType} from './types.js';
// 日志
import logger from './logger.js';
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

  import(dir: string): void;
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
   */
  public async import(dir: string): Promise<void> {
    const csvsInfo = await this._getCsvInfo(dir);

    for (const file of csvsInfo) {
      const csvData = await this._readCsvInfo(file);

      await this._replace(csvData);
    }

    logger.info(`import done.`);
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

      this._create(name, this._filterLocalesInfo(mode, localesData));
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

      if (rows.length < 2) {
        logger.warn(`${name} 无数据可导出`);

        return;
      }

      writeToPath(path.resolve(this._exportDir, `${name}_${time}.csv`), rows, {
        writeBOM: true,
      })
        .on('error', err => {
          logger.error(`${err}`);

          reject(err);
        })
        .on('finish', () => {
          logger.info(`Package ${name} done writing.`);

          resolve();
        });
    });
  }

  /**
   * 替换
   * @param {Map<string, any>} map 集合
   */
  private async _replace(map: Map<string, any>): Promise<void> {
    for (const [file, data] of map.entries()) {
      const csvPath = resolveCliPath(`../${file}.json`);
      const isExist = await fs.pathExists(csvPath);

      // 如果文件存在则替换，不存在则创建
      if (isExist) {
        let isUpdate = false;
        const csvData = await fs.readJson(csvPath);

        for (const key in data) {
          if (csvData[key] !== data[key]) {
            csvData[key] = data[key];

            isUpdate = true;
          }
        }

        if (isUpdate) {
          await this._writeCsvJson(csvPath, csvData);
        }
      } else {
        await fs.createFile(csvPath);

        await this._writeCsvJson(csvPath, data);
      }
    }
  }

  /**
   * 写入csv
   * @param {string} csvPath 路径
   * @param {object} csvData 数据
   */
  private _writeCsvJson(csvPath: string, csvData: {[key: string]: string}): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeJson(csvPath, csvData, err => {
        if (err) {
          logger.error(`${err}`);

          reject(err);
        }

        resolve();
      });
    });
  }

  /**
   * 获取cvs目录信息(路径 & 文件名)
   * @param {string} dir 目录
   * @returns {Array<string>}
   */
  private async _getCsvInfo(dir: string): Promise<string[]> {
    const csvPath = path.relative(resolveCliPath('../'), dir);
    const csvDir = await readDirInfo(csvPath);
    const cvsInfo: string[] = [];

    for (const file of csvDir) {
      const suffix = path.extname(file);

      if (suffix.includes('.csv')) {
        cvsInfo.push(`${dir}/${file}`);
      }
    }

    return cvsInfo;
  }

  /**
   * 读取多语言目录信息
   * @param {string} file 文件路径
   * @returns {Array<string[]>}
   */
  private async _readCsvInfo(file: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const csvData: string[][] = [];

      parseFile(file)
        .on('error', err => logger.error(`${err}`))
        .on('data', row => csvData.push(row))
        .on('end', () => resolve(this._formatCsvInfo(csvData)));
    });
  }

  /**
   * 格式化CSV信息
   * @param {Array<string[]>} data 数据
   * @returns {Array<string[]>}
   */
  private _formatCsvInfo(data: string[][]): Map<string, any> {
    const csvMap: Map<string, any> = new Map();
    const headerField: string[] | undefined = data.shift();

    if (Array.isArray(headerField)) {
      const [packagename, ...packageFolders] = headerField;

      for (const [fileInfo, ...fileContent] of data) {
        const [filename, key] = fileInfo.split(':');

        for (let i = 0, len = fileContent.length; i < len; i++) {
          const folder = packageFolders[i];
          const val = fileContent[i];
          const filePath = `${packagename}/locales/${folder}/${filename}`;
          const fileData = csvMap.has(filePath) ? csvMap.get(filePath) : {};

          fileData[key] = val;

          csvMap.set(filePath, fileData);
        }
      }
    }

    return csvMap;
  }

  /**
   * 获取多语言目录信息(路径 & 文件名)
   * @param {string} name 应用名
   * @returns {Map<string, string[]>}
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
    const headerField: string[] = ['packages/' + name];

    for (const [dir, files] of info.entries()) {
      const foldername = path.parse(dir).name;
      const filesMap = await this._getLocalesFilesContent(dir, files);

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
  private async _getLocalesFilesContent(dir: string, files: string[]): Promise<Map<string, string>> {
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

  /**
   * 过滤多语言信息
   * @param {number} mode 模式 0:无, 1:空项, 2:全量
   */
  private _filterLocalesInfo(mode: number, info: string[][]): string[][] {
    if (mode === ExportModeType.EMPTY) {
      const arr = info.filter((data: string[]) => {
        let counter = 0;
        let isHeader = false;

        for (const str of data) {
          if (str.includes('packages/')) {
            isHeader = true;
          } else if (str === '') {
            counter++;
          }
        }

        return isHeader || counter > 0;
      });

      return arr;
    } else {
      return info;
    }
  }
}

// 定义全局变量
const csv: ICsv = Csv.getInstance();

export default csv;
