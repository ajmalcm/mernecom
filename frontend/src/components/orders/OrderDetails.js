import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearErrors, getOrderDetails } from "../redux/actions/orderAction";
import { Link, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import Metadata from "../layout/Header/Metadata";
const OrderDetails = () => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const { shippingInfo, user, paymentInfo, orderItems } = order;
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(id));
  }, [error, dispatch, id]);
  return (
    <>
      <>
        <Metadata title="Order Details" />
        {loading ? (
          <Loading />
        ) : (
          <section className="p-16 flex flex-col max-xl:gap-8 max-md:p-3 mb-4">
            <div className="flex flex-[0.7] flex-col max-md:gap-4 border-b-2 border-b-[#ddd] pb-3 gap-10 max-md:p-2 ">
          <h2 className="font-barlow text-4xl text-skyblue font-[500] max-md:text-xl">
                 Order-#{order._id}
                </h2>
              <div className="flex flex-col">
                <h2 className="font-barlow text-4xl font-[500] tracking-wider max-md:text-3xl">
                  Shipping Info :
                </h2>
                <div className="pl-12 mt-3 font-barlow max-md:pl-0">
                  <p className="font-bold">
                    Name:{" "}
                    <span className="font-[400] ml-2">
                      {" "}
                      {user && user.name}
                    </span>
                  </p>
                  <p className="font-bold">
                    Phone:{" "}
                    <span className="font-[400] ml-2">
                      {shippingInfo && shippingInfo.phoneNo}
                    </span>
                  </p>
                  <p className="font-bold">
                    Address:
                    <span className="font-[400] ml-2">
                      {" "}
                      {shippingInfo && address}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="font-barlow text-4xl font-[500] tracking-wider max-md:text-3xl">
                  Payment Info :
                </h2>
                <div className="pl-12 mt-3 font-barlow max-md:pl-0">
                  <p className="font-bold">
                    Payment-Satus:{" "}
                    <span
                      className={`font-[400] ml-2 ${
                        paymentInfo && paymentInfo.status === "succeeded"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {" "}
                      {paymentInfo && paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT-PAID"}
                    </span>
                  </p>
                  <p className="font-bold">
                    Amount:{" "}
                    <span className="font-[400] ml-2">
                      ₹{order && order.totalPrice}
                    </span>
                  </p>
                </div>
            </div>
                <div className="flex flex-col">
                  <h2 className="font-barlow text-4xl font-[500] tracking-wider max-md:text-3xl">
                    Order Status :
                  </h2>
                  <div className="pl-12 mt-3 font-barlow max-md:pl-0">
                    <p className="font-bold">
                      Status:{" "}
                      <span className={`font-[400] ml-2 ${order && order.orderStatus ==="Delivered"?"text-green-600":"text-red-600"}`}>
                        {order && order.orderStatus}
                      </span>
                    </p>
                </div>
              </div>
            </div>
              <div >
          <h2 className="font-barlow text-4xl mb-4 font-[500] tracking-wider max-md:text-3xl">Order Items :</h2>
          {
           orderItems && orderItems.map((item,i)=>(
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
          </section>
        )}
      </>
    </>
  );
};

export default OrderDetails;
