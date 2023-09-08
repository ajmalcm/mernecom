import { combineReducers } from "redux";
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer, productsReducer } from "./productReducer";
import { allOrdersReducer, myOrdersReducer, orderDetailsReducer, orderReducer, ordersReducer } from "./orderReducer";
import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./userReducer";
import cartReducer from "./cartReducer";
const rootReducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder:orderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  newProduct:newProductReducer,
  product:productsReducer,
  AllOrders:allOrdersReducer,
  orders:ordersReducer
});

export default rootReducer;
