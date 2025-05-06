const chalk = require('chalk');

exports.log = (message) => {
  console.log(chalk.green(`[INFO] ${message}`));
};

exports.error = (message) => {
  console.error(chalk.red(`[ERROR] ${message}`));
};

exports.warn = (message) => {
  console.warn(chalk.yellow(`[WARN] ${message}`));
};
