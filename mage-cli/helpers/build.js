const fs = require('fs-extra');

/**
 * 复制文件夹
 * @param {string} src 源路径
 * @param {string} dest 目标路径
 */
const copyFolder = async (src, dest) => {
  const isSrcExist = await fs.existsSync(src);

  if (!isSrcExist) {
    // console.warn('public not exist!')
    return;
  }

  const isDestExist = await fs.existsSync(dest);

  if (isDestExist) {
    await fs.emptyDirSync(dest);
  } else {
    await fs.ensureDirSync(dest);
  }

  fs.copySync(src, dest);
};

module.exports = {
  copyFolder,
};
