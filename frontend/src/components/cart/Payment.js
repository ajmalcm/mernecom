import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { clearErrors, createOrder } from "../redux/actions/orderAction";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Metadata from "../layout/Header/Metadata";
import CheckoutSteps from "./CheckoutSteps";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.newOrder);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo2"));
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const paymentData = {
    amount: Math.round(orderInfo.total * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharge,
    totalPrice: orderInfo.total,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/process/payment",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          navigate("/orderSuccess");
        } else {
          toast.error("There was some issue while processing payment.");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <div>
      <Metadata title="Payment" />
      <div className="mt-8 max-lg:my-8">
        <CheckoutSteps activeSteps={2} />
      </div>

      <div className="flex justify-center items-center flex-col my-6 max-md:my-16">
        <form
          onSubmit={submitHandler}
          className="flex flex-col w-[30%] max-[820px]:w-[80%] gap-4 border-[1px] border-[#ddd] p-8 max-[820px]:p-2"
        >
          <h2 className="font-barlow w-full text-2xl font-[500] tracking-wider max-md:text-3xl pb-2 border-b-2 border-[#ddd] text-center">
            Card Info
          </h2>
          <div className="flex items-center w-full relative">
            <CreditCardIcon className="absolute left-1" />
            <CardNumberElement className="py-3 pl-10 w-full outline-none border-[1px] border-[#ddd]" />
          </div>
          <div className="flex items-center w-full relative">
            <EventIcon className="absolute left-1" />
            <CardExpiryElement className="py-3 pl-10 w-full outline-none border-[1px] border-[#ddd] " />
          </div>
          <div className="flex items-center w-[100%] relative">
            <VpnKeyIcon className="absolute left-1" />
            <CardCvcElement className="py-3 pl-10 w-full outline-none border-[1px] border-[#ddd]" />
          </div>
          <button
            type="submit"
            ref={payBtn}
            className="w-[70%] self-center text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
          >
            Pay-₹{orderInfo && orderInfo.total}{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
