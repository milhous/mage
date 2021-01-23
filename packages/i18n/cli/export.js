const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { runPromisesInSeries, formatDate } = require('./utils');
const CsvFile = require('./CsvFile');
const { getConfig } = require('./config');

function genFileData(namespace, fileData, lang) {
  return Object.keys(fileData).reduce((s, key) => {
    const v = fileData[key];
    const translationId = [namespace, key].join('.');
    if (typeof v === 'object') {
      return s.concat(genFileData(translationId, v, lang));
    }
    const text = v.trim();
    s.push({ translationId, [lang]: text });
    return s;
  }, []);
}

async function parseJsonFile({ empty } = {}) {
  const { langs, output, modules } = getConfig();
  let datastore = [];
  await runPromisesInSeries(
    modules.map((pkg) => async () => {
      await runPromisesInSeries(
        langs.map((lang) => async () => {
          const dir = path.join(output, `${lang}`);
          const filepath = path.join(dir, `${pkg}.json`);
          if (!fs.existsSync(filepath)) return;

          const preData = fs.readJSONSync(filepath);
          if (!preData) return;
          const langData = genFileData(pkg, preData, lang);

          langData.forEach((row) => {
            const preRow = datastore.find((v) => v.translationId === row.translationId);
            if (!preRow) {
              datastore.push(row);
            } else if (row[lang] && !preRow[lang]) {
              preRow[lang] = row[lang];
            } else {
              if (!preRow) {
                console.log(chalk.cyan('未清理:'), lang, row.translationId);
              } else {
                // console.log(chalk.green('空:'), lang, row.translationId);
              }
            }
          });
        }),
      );
    }),
  );

  return datastore;
}

/**
 *
 * @param {Array} datastore
 * @param {fs.PathLike} path
 */
async function writeCsvFiles(datastore, filepath) {
  const { headers } = getConfig();
  if (datastore.length) {
    const writeFile = new CsvFile({
      path: filepath,
      headers,
    });
    await writeFile.add(datastore);
  }
}

const starter = async () => {
  const { exportDir } = getConfig();
  const source = await parseJsonFile();
  if (source.length > 0) {
    await writeCsvFiles(source, path.join(exportDir, `trans_${formatDate('MMDDHH')}.csv`));
    console.log(chalk.green('✅  导出完成'));
  } else {
    console.log(chalk.green('✴️  数据未导出'));
  }
  return true;
};

module.exports = {
  starter,
};
