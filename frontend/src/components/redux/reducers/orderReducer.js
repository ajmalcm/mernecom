import { CREATE_ORDER_REQUEST,CLEAR_ERRORS,CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS,MY_ORDERS_FAIL,MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,ORDER_DETAILS_FAIL,ORDER_DETAILS_REQUEST,ORDER_DETAILS_SUCCESS,ALL_ORDERS_REQUEST,ALL_ORDERS_SUCCESS,ALL_ORDERS_FAIL,UPDATE_ORDER_FAIL,UPDATE_ORDER_REQUEST,UPDATE_ORDER_RESET,UPDATE_ORDER_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_SUCCESS,DELETE_ORDER_REQUEST,DELETE_ORDER_RESET } from "../constants/orderConstants";

export const orderReducer=(state={},action)=>{
    switch(action.type)
    {
        case CREATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case CREATE_ORDER_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case CREATE_ORDER_FAIL:
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


export const myOrdersReducer=(state={orders:[]},action)=>{
    switch(action.type)
    {
        case MY_ORDERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case MY_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            } 
        case MY_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                loading:false,
                error:null
            }
        default:
            return state
    }
}

export const orderDetailsReducer=(state={order:{}},action)=>{
    switch(action.type)
    {
        case ORDER_DETAILS_REQUEST:
            return{
                ...state,
            loading:true
            }
        case ORDER_DETAILS_SUCCESS:
            return{
                loading:false,
                order:action.payload
            }
        case ORDER_DETAILS_FAIL:
                return{
                    loading:false,
                    error:action.payload
                }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    loading:false,
                    error:null
                }
            default:
                return state
    }
}

export const allOrdersReducer=(state={},action)=>{
    switch(action.type)
    {
        case ALL_ORDERS_REQUEST:
            return{
                loading:true
            }
        case ALL_ORDERS_SUCCESS:
            return{
                loading:false,
                orders:action.payload
            }
        case ALL_ORDERS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                loading:false,
                error:null
            }
        default:
            return state
    }
}

export const ordersReducer=(state={},action)=>{
    switch(action.type)
    {
        case DELETE_ORDER_REQUEST:
            case UPDATE_ORDER_REQUEST:
            return{
                ...state,
                loading:true
            }
        case DELETE_ORDER_SUCCESS:
            return{
                loading:false,
                isDeleted:action.payload
            } 
        case UPDATE_ORDER_SUCCESS:
            return{
                loading:false,
                isUpdated:action.payload
            }
        case DELETE_ORDER_RESET:
            return{
                ...state,
                loading:false,
                isDeleted:false
            }
        case UPDATE_ORDER_RESET:
            return{
                ...state,
                loading:false,
                isUpdated:false
            }
        case DELETE_ORDER_FAIL:
            case UPDATE_ORDER_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}
