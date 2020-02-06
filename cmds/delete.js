const inquirer = require('inquirer');
const rimraf = require('rimraf')

const { formatComponentName } = require('../utils/stringFormat')
const { MODULES_PATH } = require('../utils/constants')

const askComponentToDelete = () => {
  const componentToDelete = [{
    name: 'componentToDelete',
    type: 'input',
    message: 'Enter the component name you would like to delete'
  }]

  return inquirer.prompt(componentToDelete)
}

module.exports = async () => {
  try {
    const { componentToDelete } = await askComponentToDelete()
    const formattedComponentToDelete = formatComponentName(componentToDelete)

    rimraf.sync(`${MODULES_PATH}/${formattedComponentToDelete}`)

    console.log(chalk.bgGreen.black(`Hooray! Component \`${formattedComponentToDelete}\` has been successfully deleted`))
  } catch (err) {
    console.log(`Error during deleting: ${err.message}`)
  }
}