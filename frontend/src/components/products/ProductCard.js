import React from 'react'
import {Link} from "react-router-dom";
import "./ProductCard.css"
import { Rating } from '@mui/material';
const ProductCard = ({product}) => {
    const options={
        value:product.ratings,
        readOnly:true,
        precision:0.5
    }

  return (
    <Link to={`/product/${product._id}`} className='productCardConatiner'>
    <img src={product.images[0].url} alt="product1"/>
    <div className='productDetail'>
        <div className='proName'>{product.name}</div>
        <div className='proStars'><Rating {...options}/></div>
        <div className='priceContainer'>
            <span>₹{product.price}</span>
            <s>₹{product.price+(product.price*0.2)}</s>
        </div>
    </div>
    </Link>
  )
}

export default ProductCard