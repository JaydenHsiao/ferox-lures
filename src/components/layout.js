import React from 'react'
import { Link } from 'gatsby'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'

class Template extends React.Component {
  render() {
    const { location, children } = this.props

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <>
        <Navigation />
        <Container>
          <div class="mt-10">{children}</div>
        </Container>
        <Footer />
      </>
    )
  }
}

export default Template
