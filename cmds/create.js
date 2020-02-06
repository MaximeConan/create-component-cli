const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const templates = require('../templates/react-template')

const { formatComponentName } = require('../utils/stringFormat')
const { MODULES_PATH, TEMPLATES } = require('../utils/constants')

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

  const defaultProps = resolveDefaultProp(answers.propType)

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

const resolveTemplate = (template, formattedComponentName, props) => {
  switch (template) {
    case 'root':
      return templates.componentTemplate(formattedComponentName, props)

    case 'styles':
      return templates.styleTemplate()

    case 'test':
      return templates.testTemplate(formattedComponentName)

    default:
      return templates.componentTemplate(formattedComponentName, props)
  }
}

module.exports = async () => {
  try {
    const { componentName } = await askComponentName()
    const formattedComponentName = formatComponentName(componentName)

    const props = await askPropType()

    TEMPLATES.map(({ folder, file, template }) => {
      fs.mkdirSync(`${MODULES_PATH}/${formattedComponentName}${folder}`, { recursive: true })
      fs.writeFileSync(
        `${MODULES_PATH}/${formattedComponentName}${folder}${formattedComponentName}${file}`,
        resolveTemplate(template, formattedComponentName, props),
        { encoding: 'utf8' }
      )
    })

    console.log(chalk.bgGreen.black(`Hooray! Component \`${formattedComponentName}\` has been successfully created`))
  } catch (err) {
    console.log(`Error during creation: ${err.message}`)
  }
}