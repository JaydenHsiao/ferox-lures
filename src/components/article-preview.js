import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export default ({ article }) => (
  <div class="md:w-1/4 w-1/2 p-4">
    <Link to={`/${article.url}`}>
      <a class="block relative rounded overflow-hidden mb-2">
        <Img
          alt={`Preview picture of ${article.name}`}
          fluid={article.thumbnail.fluid}
          style={{ maxHeight: '100%' }}
          imgStyle={{ objectFit: 'cover' }}
        />
        <span class="label absolute bottom-0 right-0 bg-white px-2 py-1 m-2 rounded-full">
          {article.size}
        </span>
      </a>
      <div>
        <h3>{article.name}</h3>
        <p class="mt-1 caption">{article.description}</p>
        <p class="mt-1 caption">${article.priceCad.toFixed(2)} CAD</p>
      </div>
    </Link>
  </div>
)
