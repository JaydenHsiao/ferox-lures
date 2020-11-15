import React from 'react'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'

import ClientOnly from '../utils/client-only'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <ClientOnly>
          <Navigation />
        </ClientOnly>
        <Container>
          <div>{children}</div>
        </Container>
        <Footer />
      </>
    )
  }
}

export default Template
