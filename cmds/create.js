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

const askPropType = async (inputs = []) => {
  const prompts = [
    {
      name: 'propName',
      type: 'input',
      message: 'Enter your prop name'
    },
    {
      name: 'propType',
      type: 'list',
      choices: ['Object', 'Array', 'String', 'Number', 'Boolean'],
      message: 'Enter your prop type'
    },
    {
      type: 'confirm',
      name: 'again',
      message: 'Enter another input? ',
      default: true
    }
  ]

  let { again, ...answers } = await inquirer.prompt(prompts);

  const defaultProps = resolveDefaultProp(answers.defaultProps)

  answers = { ...answers, defaultProps }

  const newInputs = [...inputs, answers];
  return again ? askPropType(newInputs) : newInputs;
}



const resolveDefaultProp = propType => {
  switch (propType) {
    case 'Object':
      return '{}'

    case 'Array':
      return '[]'

    case 'String':
      return 'null'

    case 'Number':
      return 'null'

    case 'Boolean':
      return 'false'

    default:
      return 'null'
  }
}

module.exports = async () => {
  try {
    const { componentName } = await askComponentName()
    const capitalizeComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)

    const props = await askPropType()
    console.log(props)

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