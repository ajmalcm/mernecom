import React,{useState} from "react";
import "./Header.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link,useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import logo from "../../../imgs/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CheckIcon from '@mui/icons-material/Check';
import LoginIcon from '@mui/icons-material/Login';
// import DashboardIcon from '@mui/icons-material/Dashboard';
const Header = () => {
  const [keyword,setKeyword]=useState("")
  const navigate=useNavigate();
  const {isAuthenticated}=useSelector(state=>state.user);

  const onSearchHandler=(e)=>{
    e.preventDefault();
    if(keyword.trim())
    {
      navigate(`/products/${keyword}`)
    }
    else{
      navigate("/products")
    }

  }
  const onChangeHandler=(e)=>{
    setKeyword(e.target.value)
  }

  return (
    <div className="headerContainer">
    <header className="navHeader rounded-bl-full">
      {/* //header top */}
      <div className="cnl">
        {/* <div>
          <span>IND</span>
          <span>English</span>
        </div> */}

        <ul className="ul" style={{display:isAuthenticated?"none":"flex"}}>
          <li className="lilg"><Link to="/account">My Account</Link></li>
          <li className="lilg"><Link to="/cart">My Cart</Link></li>
          <li className="lilg"><Link to="/orders/me">Orders</Link></li>
          <li className="lilg" style={{border:"none"}}><Link to="/login">Login</Link></li>


          <li className="lism"><Link to="/account"><AccountCircleIcon/></Link></li>
          <li className="lism"><Link to="/cart"><ShoppingCartCheckoutIcon/></Link></li>
          <li className="lism"><Link to="/orders/me"><CheckIcon/></Link></li>
          <li className="lism" style={{borderRight:"none"}}><Link to="/login"><LoginIcon/></Link></li>
          {/* <li className="lism"><Link><DashboardIcon/></Link></li> */}
        </ul>
      </div>
      {/* header mid */}
      <div className="navMid">
      <div className="imgdiv">
    <img src={logo} alt="logo"/>
      </div>

      <div className="categoryContainer">
        <select className="rounded-l-full sm:hidden lg:block">
          <option>Categories</option>
          <option>Men</option>
          <option>Women</option>
          <option>Electronics</option>
          <option>Health and Wellness</option>
        </select>
        <input placeholder="Search here..." value={keyword} className="search rounded-l-full sm:rounded-l-full md:rounded-l-full lg:rounded-none"  onChange={onChangeHandler}/>
        <button className="rounded-r-full" type="submit"  onClick={onSearchHandler}><SearchIcon fontSize="medium"/></button>

      </div> 

      <div className="midRight">
        <ShoppingCartIcon fontSize="large"/> 
        <div>
        <div>Shopping Cart</div>
        <div>$4100</div>
        </div>
      </div>

      </div>
      {/* header bottom */}
      <div className="navBottom">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li className="lisp"><Link to="/blog">Blog</Link></li>
          {/* <li className="lisp"><Link to="/">Shoes</Link></li>
          <li className="lisp"><Link to="/">Health</Link> </li> */}
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <span>Get 30% off on selected items</span>
      </div>
    </header>
    </div>
  );
};

export default Header;
