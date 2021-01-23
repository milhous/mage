const path = require("path");
const glob = require("glob");
const chalk = require("chalk");

/* console.log("modules:", chalk.green(config.modules.join(",")));
console.log("langs:", chalk.green(config.langs.join(","))); */

const config = {};

const setConfig = (data = {}) => {
  config.root = data.root || path.resolve(__dirname, "../../../");
  config.langs = data.langs || ["zh-Hans", "en", "ja", "ko", "vi", "zh-Hant"];
  config.headers = ["translationId", ...config.langs, "description"];
  config.output = path.join(config.root, "./public/locales/");
  config.exportDir = path.join(config.root, "./dist/");
  config.modules = glob
    .sync(path.join(config.root, "./public/locales/zh-Hans/**/**.json"))
    .map((v) => path.parse(v).name);
};

const getConfig = () => {
  if (!Object.keys(config).length > 0) initConfig();
  return config;
};

module.exports = {
  getConfig,
  setConfig,
};
