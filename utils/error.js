const chalk = require('chalk')

module.exports = (message, exit) => {
  console.log(chalk.bgRed.black(message));
  exit && process.exit(1)
}
