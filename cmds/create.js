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

const askComponentProps = () => {
  const componentProps = [{
    name: 'componentProps',
    type: 'input',
    message: 'Enter your component props (add a space between each prop you want to add)'
  }]
  return inquirer.prompt(componentProps)
}

module.exports = async () => {
  try {
    const { componentName } = await askComponentName()
    const capitalizeComponentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    const { componentProps } = await askComponentProps()
    const componentPropsList = componentProps.split(' ')

    const reformatedComponentPropsList = componentPropsList.reduce((acc, prop) => { return [{ propName: prop.split(':')[0], propTypes: prop.split(':')[1], defaultProps: prop.split(':')[2] }] }, [])

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/${capitalizeComponentName}.js`, templates.componentTemplate(capitalizeComponentName, reformatedComponentPropsList), () => console.log(`${capitalizeComponentName} has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}/__test__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/__test__/${capitalizeComponentName}.test.js`, templates.testTemplate(capitalizeComponentName), () => console.log(`${capitalizeComponentName}/__test__/${capitalizeComponentName}.js has been successfully created !`))

    fs.mkdirSync(`${MODULES_PATH}/${capitalizeComponentName}/__styles__`, { recursive: true })
    fs.writeFile(`${MODULES_PATH}/${capitalizeComponentName}/__styles__/${capitalizeComponentName}.styles.js`, templates.styleTemplate(), () => console.log(`${capitalizeComponentName}/__styles__/${capitalizeComponentName}.js has been successfully created !`))


  } catch (err) {
    console.log(`Error during creation: ${err.message}`)
  }
}