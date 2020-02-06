const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const rimraf = require('rimraf')
const error = require('../utils/error')
const isEmpty = require('lodash/isEmpty')

const { replaceAll } = require('../utils/replace')
const { formatComponentName } = require('../utils/stringFormat')
const { MODULES_PATH, TEMPLATES } = require('../utils/constants')

const askComponentToRename = () => {
  const componentToRename = [{
    name: 'componentToRename',
    type: 'input',
    message: 'Enter the component you want to rename'
  }]

  return inquirer.prompt(componentToRename)
}

const askNewComponentName = () => {
  const newComponentName = [{
    name: 'newComponentName',
    type: 'input',
    message: 'Enter the new component name'
  }]

  return inquirer.prompt(newComponentName)
}

module.exports = async () => {
  try {
    const { componentToRename } = await askComponentToRename()
    const formattedComponentToRename = formatComponentName(componentToRename)

    if (!fs.existsSync(`${MODULES_PATH}/${formattedComponentToRename}`)) {
      throw new Error(`Cannot find \`${MODULES_PATH}/${formattedComponentToRename}\` folder`)
    }

    if (isEmpty(componentToRename)) {
      throw new Error(`You have to specify the name of the component you want to rename`)
    }

    const { newComponentName } = await askNewComponentName()
    const formattedNewComponentName = formatComponentName(newComponentName)

    if (isEmpty(newComponentName)) {
      throw new Error(`You have to specify a new name for your component`)
    }

    TEMPLATES.map(({ folder, file }) => {
      fs.mkdirSync(`${MODULES_PATH}/${formattedNewComponentName}${folder}`, { recursive: true })

      fs.copyFileSync(
        `${MODULES_PATH}/${formattedComponentToRename}${folder}${formattedComponentToRename}${file}`,
        `${MODULES_PATH}/${formattedNewComponentName}${folder}${formattedNewComponentName}${file}`
      )

      const str = fs.readFileSync(`${MODULES_PATH}/${formattedNewComponentName}${folder}${formattedNewComponentName}${file}`, { encoding: 'utf8' })
      const newStr = replaceAll(str, formattedNewComponentName, formattedComponentToRename)

      fs.writeFileSync(`${MODULES_PATH}/${formattedNewComponentName}${folder}${formattedNewComponentName}${file}`, newStr, { encoding: 'utf8' })
    })

    rimraf.sync(`${MODULES_PATH}/${formattedComponentToRename}`)

    console.log(chalk.bgGreen.black(`Hooray! Component \`${formattedComponentToRename}\` has been successfully rename to \`${formattedNewComponentName}\``))

  } catch (err) {
    error(err.message, true)
  }
}