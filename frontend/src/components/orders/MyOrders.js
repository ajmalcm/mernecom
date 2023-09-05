import React, { useEffect, useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import Metadata from '../layout/Header/Metadata';
import { useSelector,useDispatch } from 'react-redux';
import "./MyOrders.css"
import Loader from "../loading/Loading";
import {Link,useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';
import { clearErrors, getMyOrders } from '../redux/actions/orderAction';
import LaunchIcon from '@mui/icons-material/Launch';
const MyOrders = () => {
  const dispatch=useDispatch();
  const {user}=useSelector(state=>state.user);
  const {loading,error,orders}=useSelector(state=>state.myOrders);
  const columns=[
    {
      field:"id",
      headerName:"Order ID",
      minWidth:300,
      flex:0.8
    },
    {
      field:"status",
      headerName:"Status",
      minWidth:150,
      flex:0.5,
      cellClassName:(params)=>{
        return params.row.status==="Delivered"?"text-green-600":"text-red-600"
      }
    },
    {
      field:"items_Quantity",
      headerName:"ItemsQty",
      type:"number",
      minWidth:150,
      flex:0.3
    },
    {
      field:"amount",
      headerName:"Amount",
      type:"number",
      minWidth:150,
      flex:0.5
    },
    {
      field:"action",
      headerName:"Actions",
      type:"number",
      minWidth:270,
      flex:0.3,
      sortable:false,
      renderCell: (params) => {
        const orderId = params.row.id; // Assuming your data has an 'id' field
        return (
          <Link to={`/order/${orderId}`}>
            <LaunchIcon className='hover:text-[#157ed2]'/>
          </Link>
        );
      },
    },
  ];

  const rows=[];
  orders&&orders.forEach((item)=>{
    rows.push({
      items_Quantity:item.orderItems.length,
      id:item._id,
      status:item.orderStatus,
      amount:item.totalPrice,
    })
  })


  useEffect(()=>{
    if(error)
    {
      toast.error(error)
      dispatch(clearErrors())
    }
    dispatch(getMyOrders());
  },[dispatch,error])
  return (
    <>
    <Metadata title={`${user.name}'s orders`}/>
    {
    loading?<Loader/>:
    <div className='px-12 py-8 max-md:p-2 bg-white min-h-[80vh]'>
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
    }
    </>
  )
}

export default MyOrders