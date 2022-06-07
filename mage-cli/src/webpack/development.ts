import path from 'path';
import fs from 'fs-extra';

// 工具
import {resolveCliPath} from '../helpers/utils.js';

/**
 * 开发
 * @param {number} port 端口号
 * @param {string} dist 应用源码生成目录
 */
export default (port: number, dist: string) => {
  const keyPath = resolveCliPath('./cat/www.local.devbitgame.com-key.pem');
  const certPath = resolveCliPath('./cat/www.local.devbitgame.com.pem');

  return {
    devServer: {
      static: dist,
      // 解决 HMR for federated modules ChunkLoadError: Loading hot update chunk
      liveReload: false,
      hot: true,
      server: {
        type: 'https',
        options: {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        },
      },
      host: '0.0.0.0',
      port,
      compress: true,
      historyApiFallback: true,
      open: false,
      allowedHosts: ['all'],
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      },
      client: {
        overlay: true,
      },
    },
  };
};
