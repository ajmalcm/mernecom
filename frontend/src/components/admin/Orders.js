import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Metadata from "../layout/Header/Metadata";
import Loading from "../loading/Loading";
import { DataGrid } from "@mui/x-data-grid";
import { clearErrors, deleteOrder, getAllOrders } from "../redux/actions/orderAction";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { DELETE_ORDER_RESET } from "../redux/constants/orderConstants";
const Orders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.AllOrders);
  const {loading:deleteLoading,error:deleteError,isDeleted}=useSelector(state=>state.orders);
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex: 0.8,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "text-green-600"
          : "text-red-600";
      },
    },
    {
      field: "items_Quantity",
      headerName: "ItemsQty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "action",
      headerName: "Actions",
      type: "number",
      minWidth: 270,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        const orderId = params.row.id; // Assuming your data has an 'id' field
        return (
          <>
          <Link to={`/admin/order/${orderId}`}>
              <EditIcon className="hover:text-[#157ed2]" />
            </Link>

            <Button className= "text-black" onClick={()=>{dispatch(deleteOrder(orderId))}}>
              <DeleteIcon className="hover:text-[#157ed2]"/>
            </Button>

          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        items_Quantity: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });


    useEffect(()=>{
      if(error)
      {
        toast.error(error)
        dispatch(clearErrors())
      }
      if(deleteError)
      {
        toast.error(deleteError)
        dispatch(clearErrors())
      }
      if(isDeleted)
      {
        toast.success("Order Deleted successfully.");
        dispatch({type:DELETE_ORDER_RESET})
      }
      dispatch(getAllOrders());
    },[dispatch,error,isDeleted,deleteError])

  return (
    <>
      <Metadata title="All Orders-admin" />
      
        <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
          <Sidebar />
          {loading || deleteLoading ? (
        <Loading />
      ) : (
          <div className="mt-6 flex flex-col flex-1 p-4 max-md:p-0 gap-8 w-[70%]">
          <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4 ">ALL-ORDERS</h4>
          <div className="w-full">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10, 25]}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>
        </div>
      )}
        </div>
    </>
  );
};

export default Orders;
