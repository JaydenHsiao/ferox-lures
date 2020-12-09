import React from 'react'
import Container from './container'
import Navigation from './navigation'
import Footer from './footer'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import ClientOnly from '../utils/client-only'

class Layout extends React.Component {
  render() {
    const { children } = this.props
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <>
        <Helmet title={siteTitle} htmlAttributes={{ lang: 'en' }}>
          <meta
            name="description"
            content="Online store for Ferox Lures' hand crafted lures"
          />
          {/* for Open Graph crawling! */}
          <meta
            property="og:image"
            content="http://images.ctfassets.net/y1mvnt1pefro/4NwVghN7Fa0z9QoRoRqC7g/543e843fd381d79082ff5a98c53c8f12/ferox_lures_og_img.jpg"
          />
        </Helmet>
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

export const pageQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
