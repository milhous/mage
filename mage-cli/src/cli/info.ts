import fs from 'fs-extra';
import path from 'path';

// 工具
import {resolveCliPath, readDirInfo} from '../helpers/utils.js';

// 信息（应用）
export default async (): Promise<void> => {
  const dirInfo = await readDirInfo('packages');
  const table: Array<any> = [];

  for (const name of dirInfo) {
    const appConfigPath = path.resolve(resolveCliPath('../packages'), name, 'btg.config.js');
    const isExist = await fs.pathExists(appConfigPath);

    if (isExist) {
      const module = await import(appConfigPath);
      const {name, port, exposes} = module.default();

      const exposesInfo: string[] = [];

      for (const key in exposes) {
        exposesInfo.push(key);
      }

      table.push({
        name,
        port,
        exposes: exposesInfo,
      });
    } else {
      table.push({
        name,
        port: null,
        exposes: null,
      });
    }
  }

  if (table.length) {
    table.sort((a, b) => a.port - b.port);
  }

  console.table(table);
};
