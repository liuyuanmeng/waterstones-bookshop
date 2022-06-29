import React from 'react'
import { userIsOwner } from '../helpers/auth'


export const ReviewDisplay = ({ review, handleDeleteBtn }) => {
  console.log('review  -->', review)
  return (
    <div className='review-card'>
      <h6>&quot;{review.title}&quot;</h6>
      
      <p>By{review.owner.firstName} {review.owner.lastName}</p>
      <p>{review.text}</p>
      {userIsOwner(review) ?
        <div className="owner-buttons mb-4">
          <button onClick={(e) => handleDeleteBtn(e, review)}>Delete review</button>
        </div>
        :
        <div>

        </div>
      }


    </div>
  )
}

