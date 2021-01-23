const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const { setConfig } = require("./config");
// const argv = require('node-argv');
// inquirer.registerPrompt('directory', require('inquirer-select-directory'));

(async () => {
  const dir = path.resolve(__dirname, "../../../packages");
  const list = fs.readdirSync(dir);
  const packages = list.filter((name) => {
    if (["i18n"].includes(name)) return false;
    const filename = path.join(dir, name);
    const stats = fs.statSync(filename);
    return stats.isDirectory();
  });

  const answer = await inquirer.prompt([
    {
      message: "选择应用",
      name: "package",
      type: "list",
      choices: packages.map((v) => ({ name: v, value: v })),
    },
    {
      message: "选择操作",
      name: "type",
      type: "list",
      choices: [
        { name: "import(导入)", value: "import", description: "导入" },
        { name: "export(导出)", value: "export", description: "导出" },
      ],
    },
  ]);
  console.log("answer", answer);
  const { package, type } = answer;
  const root = path.resolve(__dirname, `../../../packages/${package}`);
  setConfig({ root });

  if (type === "import") {
    const answers = await inquirer.prompt([
      {
        name: "filename",
        message: "请输入文件路径",
      },
    ]);
    const { filename } = answers;
    require("./import").starter(filename);
  } else if (type === "export") {
    require("./export").starter();
  }
})();
