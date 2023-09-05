import React from 'react'
import { Rating } from '@mui/material'
import Tmp from "../../imgs/avt.jpg";
function ReviewCard({review}) {
    const options = {
        value: review?.rating,
        readOnly: true,
        precision: 0.5,
      };
  return (
    <div className='allReviews'>
    <div className='pfpc'>
    <img alt="userPfp" src={Tmp}/>
    </div>
    <p>{review.name}</p>
    <Rating {...options}/>
    <span className='cmnt'>{review?.comment}</span>
    </div>
  )
}

export default ReviewCard