import { combineReducers } from "redux";
import { newProductReducer, newReviewReducer, productDetailReducer, productReducer } from "./productReducer";
import { myOrdersReducer, orderDetailsReducer, orderReducer } from "./orderReducer";
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
  newProduct:newProductReducer
});

export default rootReducer;
