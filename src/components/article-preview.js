import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default ({ article }) => (
  <div class="lg:w-1/4 md:w-1/4 w-1/2 p-4">
    <Link to={`/${article.url}`}>
      <a class="block relative rounded overflow-hidden mb-2">
        <Img
          alt="ecommerce"
          fluid={article.thumbnail.fluid}
          style={{ maxHeight: '100%' }}
          imgStyle={{ objectFit: 'cover' }}
        />
        <span class="label absolute bottom-0 right-0 bg-white px-2 py-1 m-2 rounded-full">
          {article.size}
        </span>
      </a>
      <div>
        <h5>{article.name}</h5>
        <p class="mt-1 caption">{article.description}</p>
        <p class="mt-1 caption">${article.priceCad.toFixed(2)} CAD</p>
      </div>
    </Link>
  </div>
)
