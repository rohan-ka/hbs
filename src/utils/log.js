const chalk = require('chalk');

// eslint-disable-next-line no-console
module.exports = (...args) => console.log(chalk.bgCyan.gray.bold(...args));
