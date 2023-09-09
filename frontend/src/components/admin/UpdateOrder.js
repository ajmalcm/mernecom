import React, { useEffect, useState } from "react";
import Metadata from "../layout/Header/Metadata";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../redux/actions/orderAction";
import { toast } from "react-toastify";
import { UPDATE_ORDER_RESET } from "../redux/constants/orderConstants";
import Loading from "../loading/Loading";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { order, loading, error } = useSelector((state) => state.orderDetails);
  const {
    isUpdated,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.orders);
  const { shippingInfo, user, paymentInfo, orderItems } = order;
  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      toast.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Order Updated Successfully.");
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [error, dispatch, id, updateError, isUpdated]);

  const updateOrderHandler = () => {
    dispatch(updateOrder(id, status));
  };

  return (
    <>
      <Metadata title="admin-Order-update" />

      <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3 max-[500px]:gap-0">
        <Sidebar />
        {loading || updateLoading ? (
          <Loading />
        ) : (
          <div className="mt-6 flex flex-col flex-1 p-4 max-md:p-0 gap-8 w-full">
            <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">
              ORDER-STATUS
            </h4>

            {/* from here */}
            <section className="max-[600px]:p-0 flex justify-between max-lg:flex-col max-xl:gap-8 flex-1 w-full">
              <section className="p-0 flex flex-[0.6] flex-col max-xl:gap-8 mb-4 " style={{flex:order.orderStatus==="Delivered"?"1":"0.7"}}>
                <div className="flex flex-[0.7] flex-col max-md:gap-4 border-b-2 border-b-[#ddd] pb-3">
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
                  <div className="flex flex-col flex-1">
                    <h2 className="font-barlow text-4xl font-[500] tracking-wider max-md:text-3xl">
                      Order Status :
                    </h2>
                    <div className="pl-12 mt-3 font-barlow max-md:pl-0">
                      <p className="font-bold">
                        Status:{" "}
                        <span
                          className={`font-[400] ml-2 ${
                            order && order.orderStatus === "Delivered"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {order && order.orderStatus}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="font-barlow text-4xl mb-4 font-[500] tracking-wider max-md:text-3xl">
                    Order Items :
                  </h2>
                  {orderItems &&
                    orderItems.map((item, i) => (
                      <div className="pl-12 mt-4 font-barlow flex justify-between items-center max-md:pl-0">
                        <Link to={`/product/${item.product}`}>
                          <img
                            src={item.image}
                            alt="pro"
                            className="w-[75px] h-[75px] object-contain"
                          />
                        </Link>
                        <p className="self-start">{item.name}</p>
                        <p className="self-start">
                          {item.quantity} x {item.price} ={" "}
                          <span className="font-bold">
                            ₹{item.quantity * item.price}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </section>
              <div className="flex-[0.4] flex justify-center gap-4 items-center font-barlow flex-col" style={{display:order.orderStatus==="Delivered"?"none":"flex"}}>
                <h2 className="font-barlow text-3xl font-[500] tracking-wider pb-3 border-b-2 border-[#ddd]">
                  Order Process
                </h2>
                <select
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Choose status</option>
                  {order && order.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                  )}
                  {order && order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                </select>

                <Button
                  className="w-[70%] text-center p-2 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer"
                  onClick={updateOrderHandler}
                  style={{ backgroundColor: "#157ed2" }}
                >
                  PROCESS
                </Button>
              </div>
            </section>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateOrder;
