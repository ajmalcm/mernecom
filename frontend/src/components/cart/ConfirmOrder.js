import React,{useState} from "react";
import Metadata from "../layout/Header/Metadata";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
const ConfirmOrder = () => {
    const navigate=useNavigate();
    const {user}=useSelector(state=>state.user);
    const {shippingInfo,cartItems}=useSelector(state=>state.cart);
    const address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
    const [subTotal,setsubTotal]=useState(cartItems.reduce((total,item)=>{return total+(item.quantity*item.price)},0));
    const tax=(subTotal*0.18);
    const shippingCharge=(subTotal>500?0:50);
    const [total,setTotal]=useState(subTotal+shippingCharge+tax);

     const proceedToPayment=()=>{
        const data={
            subTotal,
            shippingCharge,
            tax,
            total
        }
        sessionStorage.setItem("orderInfo2",JSON.stringify(data));
        navigate("/process/payment");
     }
  return (
    <>
      <Metadata title="Confirm Order" />
      <div className="mt-8 max-lg:my-8">
      <CheckoutSteps activeSteps={1}/>
      </div>
      <section className="p-16 flex max-lg:flex-col max-xl:gap-8 max-md:p-3 ">
      <div className="flex flex-[0.7] flex-col gap-10 border-r-[1px] border-[#ddd] pr-14 max-md:p-2 max-lg:border-none">
        <div className="flex flex-col">
          <h2 className="font-barlow text-4xl font-[500] tracking-wider max-md:text-3xl">
            Shipping Info :
          </h2>
          <div className="pl-12 mt-3 font-barlow max-md:pl-0">
            <p className="font-bold">
              Name: <span className="font-[400] ml-2"> {user && user.name}</span>
            </p>
            <p className="font-bold">
              Phone: <span className="font-[400] ml-2">{shippingInfo && shippingInfo.phoneNo}</span>
            </p>
            <p className="font-bold">
              Address:
              <span className="font-[400] ml-2"> {shippingInfo && address}</span>
            </p>
          </div>
        </div>
        <div >
          <h2 className="font-barlow text-4xl mb-4 font-[500] tracking-wider max-md:text-3xl">Your Cart Items :</h2>
          {
           cartItems && cartItems.map((item,i)=>(
                <div className="pl-12 mt-4 font-barlow flex justify-between items-center max-md:pl-0">
           <Link to={`/product/${item.product}`}><img src={item.image} alt="pro" className="w-[75px] h-[75px] object-contain"/></Link>
            <p className="self-start">{item.name}</p>
            <p className="self-start">
              {item.quantity} x {item.price} = <span className="font-bold">₹{item.quantity*item.price}</span>
            </p>
          </div>
            ))
          }
          
        </div>
      </div>
      <div className="flex-[0.3] flex justify-center items-center font-barlow flex-col">
        <h2 className="font-barlow text-3xl font-[500] tracking-wider pb-3 border-b-2 border-[#ddd]">Order Summary</h2>
        <div className="flex flex-col gap-4 w-[70%] border-b-2 border-[#ddd] pb-3">
            <div className="flex justify-between items-center w-full mt-3">
                <p className="font-bold">subTotaltotal:</p>
                <p>₹ {subTotal}</p>

            </div>
            <div className="flex justify-between items-center w-full">
            <p className="font-bold">Shipping Charges:</p>
                <p>₹ {subTotal>500?0:50}</p>
            </div>
            <div className="flex justify-between items-center w-full">
            <p className="font-bold">GST:</p>
                <p>₹ {subTotal*0.18}</p>
            </div>
        </div>
        <div className="flex justify-between items-center mt-3 w-[70%]">
            <p className="font-bold">TOTAL:</p>
                <p className="font-bold">₹ {total}</p>
            </div>
            <button  className="w-[70%] text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer" onClick={proceedToPayment}>Proceed To Payment</button>
      </div>
      </section>
    </>
  );
};

export default ConfirmOrder;
