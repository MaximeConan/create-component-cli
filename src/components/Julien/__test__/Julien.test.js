
    import React from 'react'
    import { render } from '@testing-library/react'
  
    import Julien from '../Julien'
  
    const defaultProps = {}
    const getInstance = (props = {}) => <Julien {...defaultProps} {...props} />
  
    describe('Julien', () => {
      it('matches snapshot', () => {
        const { asFragment } = render(getInstance())
        expect(asFragment()).toMatchSnapshot()
      })
    })
    