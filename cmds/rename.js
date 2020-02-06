const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const rimraf = require('rimraf')

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

    const { newComponentName } = await askNewComponentName()
    const formattedNewComponentName = formatComponentName(newComponentName)

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
    console.log(`Error during renaming: ${err.message}`)
  }
}