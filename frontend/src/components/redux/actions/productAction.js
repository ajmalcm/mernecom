import { ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_SUCCESS,CREATE_REVIEW_FAIL,CREATE_REVIEW_REQUEST,CREATE_REVIEW_SUCCESS,ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_FAIL,ADMIN_PRODUCT_SUCCESS,NEW_PRODUCT_FAIL,NEW_PRODUCT_REQUEST,NEW_PRODUCT_SUCCESS } from "../constants/productConstant";
import axios from "axios";


export const getProduct=(keyword="",currentPage=1,price=[0,25000],category,ratings=0)=>async(dispatch)=>{
    try{
        dispatch({type:ALL_PRODUCT_REQUEST})
        let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

        if(category)
        {
            link= link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
        }

        const {data}=await axios.get(link);

        dispatch({type:ALL_PRODUCT_SUCCESS,payload:data})

    }
    catch(err)
    {
        dispatch({type:ALL_PRODUCT_FAIL,payload:err.response.data.message})
    }
}

export const getproductDetail=(id)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAIL_REQUEST});

        const {data}=await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:PRODUCT_DETAIL_SUCCESS,payload:data.product
        })
    }
    catch(err)
    {
        dispatch({type:PRODUCT_DETAIL_FAIL,payload:err.response.data.message})
    }
}

export const newReview=(reviewData)=>async(dispatch)=>{
    try{
        dispatch({type:CREATE_REVIEW_REQUEST})

        const config={
            "Content-Type":"application/json"
        }

        const {data}=await axios.put("/api/v1/product/review",reviewData,config);

        dispatch({type:CREATE_REVIEW_SUCCESS,payload:data.success});
    }
    catch(err)
    {
        dispatch({type:CREATE_REVIEW_FAIL,payload:err.response.data.message})
    }
}

export const getAdminProducts=()=>async(dispatch)=>{
    try{
        dispatch({type:ADMIN_PRODUCT_REQUEST})

        const {data}=await axios.get("/api/v1/admin/products");

        dispatch({
            type:ADMIN_PRODUCT_SUCCESS,
            payload:data.products
        })
    }
    catch(err)
    {
        dispatch({type:ADMIN_PRODUCT_FAIL,payload:err.response.data.message})
    }
}

export const createProduct=(productDetails)=>async(dispatch)=>{
    try{
        dispatch({type:NEW_PRODUCT_REQUEST})
        console.log(productDetails)

        const config={
           headers: {"Content-Type":"multipart/form-data"}
        }

        const {data}=await axios.post("/api/v1/admin/product/new",productDetails,config);

        dispatch({type:NEW_PRODUCT_SUCCESS,payload:data});
    }
    catch(err)
    {
        dispatch({type:NEW_PRODUCT_FAIL,payload:err.response.data.message})
    }
}

export const clearErrors=()=>(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}