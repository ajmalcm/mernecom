import { ALL_PRODUCT_REQUEST,ALL_PRODUCT_FAIL,ALL_PRODUCT_SUCCESS,CLEAR_ERRORS,PRODUCT_DETAIL_FAIL,PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_SUCCESS,CREATE_REVIEW_FAIL,CREATE_REVIEW_REQUEST,CREATE_REVIEW_RESET,CREATE_REVIEW_SUCCESS } from "../constants/productConstant";

export const productReducer=(state={products:[]},action)=>{
    switch(action.type)
    {
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[]
            }
        case ALL_PRODUCT_SUCCESS:
            return{
                loading:false,
                products:action.payload.products,
                productsCount:action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductsCount:action.payload.filteredProductsCount
                // error:"see if that"
            }
        case ALL_PRODUCT_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state;
    }
}


export const productDetailReducer=(state={product:{}},action)=>{
    switch(action.type)
    {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading:true,
                product:{}
            }
        case PRODUCT_DETAIL_SUCCESS:
            return{
                loading:false,
                product:action.payload,
            }
        case PRODUCT_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}

export const newReviewReducer=(state={},action)=>{
    switch(action.type)
    {
        case CREATE_REVIEW_REQUEST:
            return{
                ...state,
                loading:true,
            }
        case CREATE_REVIEW_SUCCESS:
            return{
                loading:false,
                success:action.payload
            }
        case CREATE_REVIEW_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CREATE_REVIEW_RESET:
            return{
                ...state,
                success:false,
                loading:false
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}