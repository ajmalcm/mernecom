import React,{useEffect, useState} from 'react'
// import demoImg from "../../imgs/p5.jpg";
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addtoCart, removeFromCart } from '../redux/actions/cartAction';

function CartCard({cartItem}) {
    const dispatch=useDispatch();
    const [qty,setQty]=useState(cartItem.quantity);

    const qtyIncreaseHandler=()=>{
        if(qty>=cartItem.stock)
        return
            setQty(qty+1);
        // dispatch(addtoCart(cartItem.product,qty))
    }

    const qtyDecreaseHandler=()=>{
        if(qty<=1)
        return 
    
        setQty(qty-1);
    // dispatch(addtoCart(cartItem.product,qty))
    }

    const removeHandler=()=>{
        dispatch(removeFromCart(cartItem.product))
    }

    useEffect(()=>{
        dispatch(addtoCart(cartItem.product,qty))
    },[qty,dispatch,cartItem.product])

  return (
    <>
        <div className="cartMid">
          <div className="midContainer">
            <div className="midTop">
            <Link to={`/product/${cartItem.product}`}>
              <img src={cartItem.image} alt={cartItem.product} />
            </Link>
              <div className="prodes">
                <p>{cartItem.name}</p>
                <p style={{color:cartItem.stock?"green":"red"}}>{cartItem.stock?<span><DoneIcon fontSize='small' color='green'/> In-stock</span>:<span><CloseIcon fontSize='small' color='red'/> Outof-stock</span>}</p>
              </div>
            </div>
            <div className="midMid">
              <div className="qtyCounter">
                <button onClick={qtyDecreaseHandler}>-</button>
                <input type="number" readOnly value={qty}/>
                <button onClick={qtyIncreaseHandler}>+</button>
              </div>
              <p onClick={removeHandler}>Remove</p>
            </div>
            <div className="midBottom">
              <p>₹{cartItem.price * cartItem.quantity}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default CartCard