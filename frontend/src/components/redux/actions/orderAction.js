import axios from "axios";
import { CREATE_ORDER_REQUEST,CLEAR_ERRORS,CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS,MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,ALL_ORDERS_FAIL,UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_RESET,UPDATE_ORDER_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_SUCCESS,DELETE_ORDER_REQUEST,DELETE_ORDER_RESET } from "../constants/orderConstants";


export const createOrder=(orderData)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_ORDER_REQUEST})
        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data}=axios.post("/api/v1/order/new",orderData,config);

        dispatch({type:CREATE_ORDER_SUCCESS,payload:data});
    }
    catch(err)
    {
        dispatch({type:CREATE_ORDER_FAIL,payload:err.response.data.message})
    }
}

export const getMyOrders=()=>async(dispatch)=>{
    try{
        dispatch({type:MY_ORDERS_REQUEST})

        const {data}=await axios.get("/api/v1/orders/me");

        dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders});
    }
    catch(err)
    {
        dispatch({type:MY_ORDERS_FAIL,payload:err.response.data.message})
    }
}

export const getOrderDetails=(id)=>async(dispatch)=>{
    try{
        dispatch({type:ORDER_DETAILS_REQUEST})

        const {data}=await axios.get(`/api/v1/order/${id}`);

        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order})
    }
    catch(err)
    {
        dispatch({type:ORDER_DETAILS_FAIL,payload:err.response.data.message})
    }
}

export const getAllOrders=()=>async(dispatch)=>{
    try{
        dispatch({type:ALL_ORDERS_REQUEST});
        const {data}=await axios.get('/api/v1/admin/orders');
        dispatch({type:ALL_ORDERS_SUCCESS,payload:data.orders})

    }
    catch(err)
    {
        dispatch({type:ALL_ORDERS_FAIL,payload:err.response.data.message})
    }
}

export const deleteOrder=(id)=>async(dispatch)=>{
    try{
        dispatch({type:DELETE_ORDER_REQUEST})
        const {data}=await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({type:DELETE_ORDER_SUCCESS,payload:data.success});
    }
    catch(err)
    {
        dispatch({type:DELETE_ORDER_FAIL,payload:err.response.data.message})
    }
}

export const updateOrder=(id,status)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_ORDER_REQUEST});

        const config={
            headers:{"Content-Type":"application/json"}
        }

        const {data}=await axios.put(`/api/v1/admin/order/${id}`,{status},config);

        dispatch({type:UPDATE_ORDER_SUCCESS,payload:data.success})
    }
    catch(err)
    {
        console.log(err.stack)
        dispatch({type:UPDATE_ORDER_FAIL,payload:err.response.data.message})
    }
}

export const clearErrors=()=>async (dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}