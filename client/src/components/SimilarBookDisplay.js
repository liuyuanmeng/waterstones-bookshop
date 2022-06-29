import React from 'react'
import { Link } from 'react-router-dom'

export const SimilarBookDisplay = ({ item }) => {


  const { title, author, image, price, _id } = item
  return (
    <div className="subgenre-row ">
      <div key={_id}>
        <Link to={`/books/${_id}`}>
          <div className="image-wrapper-similar">
            <img src={image} />
          </div>
          <div className='card-body-similar'>
            <div className='card-title-similar'>
              <h4>{title}</h4>
            </div>
            <div className='authors-you-may'>
              <h5>{author}</h5>
            </div>
            <h4 className="price">£{price}</h4>
          </div>
        </Link>
      


       

      </div>


    </div>

  )

}

