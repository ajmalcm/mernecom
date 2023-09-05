import React,{useState} from "react";
import "./Header.css"
import { SpeedDial,SpeedDialAction } from "@mui/material";
import Profile from "../../../imgs/prof.jpg";
import DashboardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/actions/userAction";
import {Backdrop} from "@mui/material";
export const UserOptions=({user})=>{
    const dispatch=useDispatch();
    const {cartItems}=useSelector(state=>state.cart);
    const logoutHandler=()=>{
        dispatch(logoutUser())
        navigate("/")
        toast.success("logged-Out successfully")
    }
    const accountHandler=()=>{
        navigate("/account")
    }
    const ordersHandler=()=>{
        navigate("/orders/me")
    }
    const dashboardHandler=()=>{
        navigate("/admin/Ecommerce")
    }
    const homeHandler=()=>{
        navigate("/")
    }
    const cartHandler=()=>{
        navigate("/cart")
    }

    const [open,setOpen]=useState(false)
    const navigate=useNavigate();
    const options=[
        {icon:<PersonIcon/>, title:"Account",func:accountHandler},
        {icon:<StoreIcon/>, title:"Home",func:homeHandler},
        {icon:<ShoppingCartCheckoutIcon style={{color:cartItems.length>0?"#157ed2":"transparent"}}/>, title:`Cart ${cartItems.length}`, func:cartHandler},
        {icon:<ListAltIcon/>, title:"Orders",func:ordersHandler},
        {icon:<ExitToAppIcon/>, title:"LogOut",func:logoutHandler},
    ]

    if(user.role==="admin")
    {
        options.unshift({icon:<DashboardIcon/>, title:"Dashboard",func:dashboardHandler})
    }

    return(
        <>
        <Backdrop open={open} style={{zIndex:"10"}}/>
        <SpeedDial
        ariaLabel="User Options"
        onOpen={()=>setOpen(true)}
        onClose={()=>setOpen(false)}
        open={open}
        direction="down"
        className="speedDial"
        icon={<img src={user.avatar.url?user.avatar.url:Profile} alt="profile" className="speedDialIcon"/>}
        >
        {
            options.map((item,i)=>(
            <SpeedDialAction icon={item.icon} tooltipTitle={item.title} onClick={item.func} key={i}/>
            ))
        }
        </SpeedDial>
        </>
    )
}

export default UserOptions;