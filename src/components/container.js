import React from 'react'
import Hero from '../components/hero'

export default ({ children }) => (
  <>
    <Hero />
    <div style={{ maxWidth: 1180, margin: '0 auto' }}>{children}</div>
  </>
)
