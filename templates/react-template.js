const componentTemplate = (componentName, props = []) => {

  console.log('PROPS', props)

  let template = ''

  props.length === 0
    ? template =
    `
    import React from 'react'
    import * as Styled from './__styles__/${componentName}.styles.js'
  
    const ${componentName} = () => <div>${componentName}</div>
  
    export default ${componentName}
    `

    : template =
    `
    import React from 'react'
    import PropTypes from 'prop-types'

    import * as Styled from './__styles__/${componentName}.styles.js'

    const ${componentName} = ({ ${props.map(prop => `${prop.propName}`)} }) => <div>${componentName}</div>

    ${componentName}.propTypes = {
      ${props.map(prop => `${prop.propName}: PropTypes.${prop.propTypes}.isRequired`)}
    }
    
    ${componentName}.defaultProps = {
      ${props.map(prop => `${prop.propName}: ${prop.defaultProps}`)}
    }

    export default ${componentName}
    `

  return template

}

const styleTemplate = () => {
  return (
    `
    import styled from 'styled-component'
    `
  )
}

const testTemplate = componentName => {
  return (
    `
    import React from 'react'
    import { render } from '@testing-library/react'
  
    import ${componentName} from '../${componentName}'
  
    const defaultProps = {}
    const getInstance = (props = {}) => <${componentName} {...defaultProps} {...props} />
  
    describe('${componentName}', () => {
      it('matches snapshot', () => {
        const { asFragment } = render(getInstance())
        expect(asFragment()).toMatchSnapshot()
      })
    })
    `
  )
}

module.exports = {
  componentTemplate,
  styleTemplate,
  testTemplate
}