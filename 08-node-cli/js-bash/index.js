const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

const getFileName = (index) => (index >= 3 ? `js-0${index}` : `bash-0${index}`);

const rmFolder = (folderName) => rmSync(`./${folderName}`, { recursive: true });

function makeDirAndReturnName(folderName) {
  if (existsSync(folderName)) {
    rmFolder(folderName);
  }

  mkdirSync(folderName);
  return folderName;
}

function initializePackage(folderName) {
  execSync("npm init -y --scope @lucaslivero --silent", { cwd: `./${folderName}` });
  const { name, version } = require(`./${folderName}/package.json`);
  console.log({ n: name, v: version });
}

const FOLDER_AMOUNT = 4;
Array.from(Array(FOLDER_AMOUNT).keys()).forEach((index) => {
  const dirName = makeDirAndReturnName(getFileName(index + 1));
  initializePackage(dirName);
  rmFolder(dirName);
});
