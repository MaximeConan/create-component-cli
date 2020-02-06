const inquirer = require('inquirer');
const fs = require('fs')
const rimraf = require('rimraf')
const chalk = require('chalk')
const isEmpty = require('lodash/isEmpty')
const error = require('../utils/error')

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

    if (!fs.existsSync(`${MODULES_PATH}/${formattedComponentToDelete}`)) {
      throw new Error(`Cannot find \`${MODULES_PATH}/${formattedComponentToDelete}\` folder`)
    }

    if (isEmpty(componentToDelete)) {
      throw new Error(`You have to specify the name of the component you want to delete`)
    }

    rimraf.sync(`${MODULES_PATH}/${formattedComponentToDelete}`)

    console.log(chalk.bgGreen.black(`Hooray! Component \`${formattedComponentToDelete}\` has been successfully deleted`))
  } catch (err) {
    error(err.message, true)
  }
}