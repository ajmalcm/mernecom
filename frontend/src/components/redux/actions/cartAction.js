import { ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO } from "../constants/productConstant";
import axios from "axios";

export const addtoCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      stock: data.product.stock,
      image: data.product.images[0].url,
      quantity,
    },
  });

  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart=(id)=>async(dispatch,getState)=>{
  dispatch({
    type:REMOVE_FROM_CART,
    payload:{product:id}
  })
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo=(data)=>async(dispatch)=>{
  dispatch({type:SAVE_SHIPPING_INFO,payload:data})
  localStorage.setItem("shippingInfo2",JSON.stringify(data));
}
