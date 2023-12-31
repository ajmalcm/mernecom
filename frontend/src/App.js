import './App.css';
import React,{useEffect,useState} from "react";
import Header from './components/layout/Header/Header';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Footer from './components/layout/Footer/Footer';
import Toast from './components/layout/Toast';
import Products from './components/products/Products';
import Login from './components/user/Login';
import Register from './components/user/Register';
import { useDispatch,useSelector } from 'react-redux';
import { loadUser } from './components/redux/actions/userAction';
import UserOptions from './components/layout/Header/UserOptions';
import Account from './components/user/Account';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import Forgotpassword from './components/user/Forgotpassword';
import ResetPassword from './components/user/ResetPassword';
import Cart from "./components/cart/Cart"
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from './components/cart/Payment';
import OrderSuccess from './components/cart/OrderSuccess';
import MyOrders from './components/orders/MyOrders';
import OrderDetails from './components/orders/OrderDetails';
import Dashboard from './components/admin/Dashboard';
import Orders from './components/admin/Orders';
import AllProducts from './components/admin/AllProducts';
import NewProduct from './components/admin/NewProduct';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateOrder from './components/admin/UpdateOrder';
import AllUsers from './components/admin/AllUsers';
import UpdateUser from './components/admin/UpdateUser';
import Reviews from './components/admin/Reviews';
import NotFound from './components/loading/NotFound';
import Blog from './components/about/Blog';
import Contact from './components/about/Contact';
import Aboutus from './components/about/Aboutus';
function App() {

  const dispatch=useDispatch();
  const {isAuthenticated,user}=useSelector(state=>state.user)
  const [stripeApiKey,setStripeApiKey]=useState();

  const getStripeAPiKey=async()=>{
    const {data}=await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    dispatch(loadUser())
    getStripeAPiKey();
  },[dispatch])

  return (
    <div className="App">
    <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user}/>}
      <Toast/>
<Routes>
  <Route exact path="/" element={<Home/>}/>
  <Route exact path="/product/:id" element={<ProductDetails/>}/>
  <Route exact path="/products" element={<Products/>}/>
  <Route exact path="/products/:keyword" element={<Products/>}/>
  <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/register" element={<Register/>}/>
  <Route exact path="/blog" element={<Blog/>}/>
  <Route exact path='/contact' element={<Contact/>}/>
  <Route exact path="/about" element={<Aboutus/>}/>
  {
  <Route exact path="/account" element={<Account/>}/>
  }
  {
    isAuthenticated &&  <Route exact path="/me/update" element={<UpdateProfile/>}/>
  }
  {
    isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>
  }
  <Route exact path="/password/forgot" element={<Forgotpassword/>}/>
  <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
  <Route exact path="/cart" element={<Cart/>}/>
  {
    isAuthenticated && <Route exact path='/shipping' element={<Shipping/>}/>
  }
  {
    isAuthenticated && <Route exact path='/confirmOrder' element={<ConfirmOrder/>}/>
  }

  {
    isAuthenticated && stripeApiKey &&<Route exact path='/process/payment' element={
     <Elements stripe={loadStripe(stripeApiKey)}>
    <Payment/>
    </Elements>
    }
    />
  }

  {
    isAuthenticated && <Route exact path='/orderSuccess' element={<OrderSuccess/>}/>
  }
  {
     <Route exact path='/orders/me' element={<MyOrders/>}/>
  }
  {
    isAuthenticated && <Route exact path='/order/:id' element={<OrderDetails/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/ecommerce' element={<Dashboard/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/allproducts' element={<AllProducts/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/createProducts' element={<NewProduct/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/product/:id' element={<UpdateProduct/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/orders' element={<Orders/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/order/:id' element={<UpdateOrder/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/users' element={<AllUsers/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/user/:id' element={<UpdateUser/>}/>
  }
  {
    isAuthenticated && user.role==="admin" && <Route exact path='/admin/reviews' element={<Reviews/>}/>
  }
  <Route path={'/:id'} element={<NotFound/>}/>
</Routes>
  <Footer/>
    </Router>
    </div>
  );
}

export default App;
