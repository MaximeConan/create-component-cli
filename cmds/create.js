const inquirer = require('inquirer');
const fs = require('fs')
const templates = require('../templates/react-template')

const { MODULES_PATH } = require('../utils/constants')

const askComponentName = () => {
  const componentName = [{
    name: 'componentName',
    type: 'input',
    message: 'Enter your component name'
  }]
  return inquirer.prompt(componentName)
}

const askPropName = () => {
  const propName = [{
    name: 'propName',
    type: 'input',
    message: 'Enter your prop name'
  }]

  return inquirer.prompt(propName)
}

const askPropType = () => {
  const propType = [{
    name: 'propType',
    type: 'list',
    choices: ['Object', 'Array', 'String', 'Number'],
    message: 'Enter your prop type'
  }]

  return inquirer.prompt(propType)
}

const askDefaultProp = propType => {
  const defaultProp = [{
    name: 'defaultProp',
    type: 'list',
    choices: resolveDefaultProp(propType),
    message: 'Enter your default prop'
  }]

  return inquirer.prompt(defaultProp)
}

const resolveDefaultProp = propType => {
  switch (propType) {
    case 'Object':
      return ['{}', 'null']

    case 'Array':
      return ['[]', 'null']

    case 'String':
      return ['""', 'null']

    case 'Number':
      return ['0', 'null']

    default:
      return ['null']
  }
}

module.exports = async () => {
  try {
    const { componentName } = await askComponentName()
    const capitalizeComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

    const { propName } = await askPropName()
    const { propType } = await askPropType()
    const { defaultProp } = await askDefaultProp(propType)

    const props = [{ propName, propType, defaultProp }]

    console.log({ propName, propType, defaultProp })

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/${capitalizeComponentName}.js`, templates.componentTemplate(capitalizeComponentName, props), () => console.log(`${capitalizeComponentName} has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}/__test__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/__test__/${capitalizeComponentName}.test.js`, templates.testTemplate(capitalizeComponentName), () => console.log(`${capitalizeComponentName}/__test__/${capitalizeComponentName}.js has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}/__styles__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/__styles__/${capitalizeComponentName}.styles.js`, templates.styleTemplate(), () => console.log(`${capitalizeComponentName}/__styles__/${capitalizeComponentName}.js has been successfully created !`))


  } catch (err) {
    console.log(`Error during creation: ${err.message}`)
  }
}