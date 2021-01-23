#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const merge = require('lodash.merge');
const prettier = require('prettier');
const csv = require('fast-csv');
const { runPromisesInSeries } = require('./utils');
const { getConfig } = require('./config');

require('@babel/register')({
  extensions: ['.ts', '.tsx', '.jsx', '.js'],
  cache: true,
  plugins: [['@babel/plugin-transform-modules-commonjs']],
});

async function readCsvFile(filename) {
  const { langs } = getConfig();
  const datastore = langs.reduce((s, lang) => {
    s[lang] = {};
    return s;
  }, {});

  return new Promise((resolve) => {
    let rowCount = 0;

    const onRow = (row) => {
      const { translationId } = row;
      if (!translationId) return;
      const nameArr = translationId.split('.');
      langs.forEach((lang) => {
        const rowObj = {};
        let text = (row[lang] || '').trim();
        if (/^"(.+)"$/.test(text)) {
          text = RegExp.$1;
        }
        nameArr.reduce((s, k, i, arr) => {
          return (s[k] = i < arr.length - 1 ? {} : text);
        }, rowObj);
        merge(datastore[lang], rowObj);
      });
      rowCount++;
    };

    const onEnd = () => {
      console.log(chalk.cyan(`Parsed ${filename} ${rowCount} rows`));
      resolve(datastore);
    };

    fs.createReadStream(path.resolve(__dirname, filename))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', onRow)
      .on('end', onEnd);
  });
}

async function writeJsonFile(datastore) {
  const { langs, output, modules } = getConfig();
  await runPromisesInSeries(
    langs.map((lang) => async () => {
      const langData = datastore[lang];
      modules.forEach((mod) => {
        const dir = path.join(output, `${lang}`);
        fs.mkdirSync(dir, { recursive: true });
        const filepath = path.join(dir, `${mod}.json`);
        let fileData = langData[mod];
        if (!fileData) {
          // console.log(chalk.green('nothing change'), lang, mod);
          return;
        }
        if (fs.existsSync(filepath)) {
          const preData = fs.readJSONSync(filepath);
          fileData = merge(preData, fileData);
        }
        fs.writeFileSync(
          filepath,
          prettier.format(JSON.stringify(fileData), {
            parser: 'json',
          }),
        );
      });
    }),
  );
}

const starter = async (filename) => {
  const source = await readCsvFile(String(filename).trim());
  if (source.length > 0) {
    await writeJsonFile(source);
    console.log(chalk.green('✅  导入完成'));
  } else {
    console.log(chalk.green('✴️  数据未导入'));
  }
  return true;
};

module.exports = {
  starter,
};
