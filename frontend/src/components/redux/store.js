import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
     shippingInfo:localStorage.getItem("shippingInfo2")?JSON.parse(localStorage.getItem("shippingInfo2")):{} 
  },
};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
