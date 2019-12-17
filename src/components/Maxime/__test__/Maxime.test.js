
    import React from 'react'
    import { render } from '@testing-library/react'
  
    import Maxime from '../Maxime'
  
    const defaultProps = {}
    const getInstance = (props = {}) => <Maxime {...defaultProps} {...props} />
  
    describe('Maxime', () => {
      it('matches snapshot', () => {
        const { asFragment } = render(getInstance())
        expect(asFragment()).toMatchSnapshot()
      })
    })
    