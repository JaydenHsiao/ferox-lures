import React from 'react'
import Img from 'gatsby-image'

import Arrow from '../../static/arrow.svg'

import styles from './hero.module.css'
import video from '../../static/hero.mp4'

export default ({ data }) => (
  // <div className={styles.hero}>
  //   <Img
  //     className={styles.heroImage}
  //     alt={data.name}
  //     fluid={data.heroImage.fluid}
  //   />
  //   <div className={styles.heroDetails}>
  //     <h3 className={styles.heroHeadline}>{data.name}</h3>
  //     <p className={styles.heroTitle}>{data.title}</p>
  //     <p>{data.shortBio.shortBio}</p>
  //   </div>
  // </div>
  <div className="text-white">
    <video
      playsInline
      autoPlay="autoplay"
      loop="loop"
      preload="auto"
      // poster
      muted
      class="object-cover w-screen left-0 top-0"
      style={{ height: '87vh', filter: 'brightness(50%)' }}
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <h1 className="centered text-6xl leading-none -mt-8">HAND CRAFTED LURES</h1>
    <span className="centered-x">
      <span className="text-3xl">shop now</span>{' '}
      <img src={Arrow} class="mx-auto mt-3 w-6" />
    </span>
  </div>
)
