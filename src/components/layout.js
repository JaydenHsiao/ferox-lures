import React from 'react'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'
import ClientOnly from '../utils/client-only'

class Layout extends React.Component {
  render() {
    const { children } = this.props
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

export default Layout
