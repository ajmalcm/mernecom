import {useEffect, useState} from "react";
import "./Cart.css";
import Metadata from "../layout/Header/Metadata";
import { useSelector } from "react-redux";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import CartCard from "./CartCard";
const Cart = () => {
  const navigate=useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [subtotal,setSubtotal]=useState(0);

  const adder=(total,item)=> {return total+item.price*item.quantity};

  const checkoutHandler=()=>{
    navigate("/login?redirect=/shipping")
  }

  useEffect(()=>{
    let pc;
    pc= cartItems.reduce(adder,0)
    setSubtotal(pc);
},[cartItems])

  return (
    <>
    {
        cartItems.length===0?
        <div className="emptyCart">
        <RemoveShoppingCartIcon fontSize="large"/>
        <Typography>No Product in your cart</Typography>
        <Link to="/products">View Products</Link>
        </div>
        :
        <div className="cartContainer">
        <Metadata title="CART" />
        <h1 className="cartTop">Shopping Cart</h1>
        {cartItems &&
          cartItems.map((item, i) => <CartCard cartItem={item} key={i} />)}
        <div className="cartBottom">
          <div className="subTotalsection">
            <p>Subtotal</p>
            <p>₹{subtotal}</p>
          </div>
        <p>Shipping and taxes will be calculated at checkout.</p>
        <button onClick={checkoutHandler}>Checkout</button>
        </div>
      </div>
    }
    
    </>
  );
};

export default Cart;
