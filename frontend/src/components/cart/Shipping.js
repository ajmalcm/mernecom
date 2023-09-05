import React, { useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import Metadata from "../layout/Header/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
const Shipping = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {shippingInfo}=useSelector(state=>state.cart);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [shippingIn,setShippingIn]=useState({address:shippingInfo.address,city:shippingInfo.city,state:shippingInfo.state,country:shippingInfo.country,pinCode:shippingInfo.pinCode,phoneNo:shippingInfo.phoneNo})
  const {address,city,pinCode,phoneNo}=shippingIn;
  const changeHandler=(e)=>{
    setShippingIn({...shippingIn,[e.target.name]:e.target.value})
  }

  const submitHandler=(e)=>{
    e.preventDefault();
    if(state.length===0 || country.length===0|| pinCode.length===0|| phoneNo.length===0||address.length===0||city.length===0)
    {
        toast.error("Form Incomplete");
        return 
    }
    if(phoneNo.length<10 || phoneNo.length>10)
    {
        toast.error("Phone-no should be 10 numbers");
        return
    }
    dispatch(saveShippingInfo({...shippingIn,country:country,state:state}));
    navigate("/confirmOrder")
  }

  return (
    <>
      <Metadata title="SHIPPING INFO" />
      <div className="mt-8">
      <CheckoutSteps activeSteps={0}/>
      </div>
      <div className="flex justify-center items-center h-[90vh] max-md:h-[70vh]">
        <form className="flex justify-center items-center xl:-translate-y-16 flex-col border-[1px] border-gray-200 px-10 py-8 gap-2 bg-white" onSubmit={submitHandler}>
          <h2 className="text-2xl font-barlow font-[300] tracking-wide text-black text-center pb-3 border-b border-[#ddd]">
            Shipping Info
          </h2>
          <div className="w-full relative">
            <HomeIcon className="absolute top-2 left-1" />
            <input
              type="text"
              placeholder="Address"
              name="address"
              onChange={changeHandler}
              value={address}
              className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
            />
          </div>
          <div className="w-full relative">
            <LocationCityIcon className="absolute top-2 left-1" />
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={changeHandler}
              value={city}
              className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
            />
          </div>
          <div className="w-full relative">
            <PinDropIcon className="absolute top-2 left-1" />
            <input
              type="number"
              placeholder="Pincode"
              value={pinCode}
              onChange={changeHandler}
              className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
              name="pinCode"
            />
          </div>
          <div className="w-full relative">
            <PhoneAndroidIcon className="absolute top-2 left-1" />
            <input
              type="number"
              placeholder="Phone-no"
              className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
              name="phoneNo"
              onChange={changeHandler}
              value={phoneNo}
            />
          </div>
          <div className="w-full relative">
            <PublicIcon className="absolute top-2 left-1" />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
            >
              <option>Country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
            {/* <input type='text' placeholder='Pincode'/> */}
          </div>
          {country && (
            <div className="w-full relative">
              <TransferWithinAStationIcon className="absolute top-2 left-1" />
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full text-center p-2 border-[1px] border-[#ddd] outline-none"
              >
                <option>State</option>
                {State.getStatesOfCountry(country).map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* <input type='text' placeholder='Pincode'/> */}
            </div>
          )}
          <button
            type="submit"
            className="w-full text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
            // disabled={state?"false":"true"}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default Shipping;
