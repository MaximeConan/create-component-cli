const inquirer = require('inquirer');
const fs = require('fs')
const templates = require('../templates/react-template')

const { formatComponentName } = require('../utils/stringFormat')
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
    const formattedComponentName = formatComponentName(componentName)

    const props = await askPropType()

    fs.mkdirSync(`${MODULES_PATH}/${formattedComponentName}`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${formattedComponentName}/${formattedComponentName}.js`, templates.componentTemplate(formattedComponentName, props), () => console.log(`${formattedComponentName} has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${formattedComponentName}/__test__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${formattedComponentName}/__test__/${formattedComponentName}.test.js`, templates.testTemplate(formattedComponentName), () => console.log(`${formattedComponentName}/__test__/${formattedComponentName}.js has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${formattedComponentName}/__styles__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${formattedComponentName}/__styles__/${formattedComponentName}.styles.js`, templates.styleTemplate(), () => console.log(`${formattedComponentName}/__styles__/${formattedComponentName}.js has been successfully created !`))


  } catch (err) {
    console.log(`Error during creation: ${err.message}`)
  }
}