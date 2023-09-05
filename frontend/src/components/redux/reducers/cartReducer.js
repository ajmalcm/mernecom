import { ADD_TO_CART,REMOVE_FROM_CART,SAVE_SHIPPING_INFO } from "../constants/productConstant";

const cartReducer = (state = { cartItems: [],shippingInfo:{} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExists = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExists.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_FROM_CART:
      const toRemove=action.payload
      return{
        ...state,
        cartItems:state.cartItems.filter((i)=>i.product!==toRemove.product)
      }
      case SAVE_SHIPPING_INFO:
        return{
          ...state,
          shippingInfo:action.payload
        }

    default:
      return state;
  }
};

export default cartReducer;
