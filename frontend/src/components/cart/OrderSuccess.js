import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
const OrderSuccess = () => {
  return (
    <div className='fixed top-0 left-0 min-h-screen w-full z-10 bg-white flex justify-center items-center'>
        <div className='flex justify-center items-center flex-col'>
        <CheckCircleIcon style={{color:"#157ed2",fontSize:"100px"}}/>
        <h4 className='text-3xl font-barlow font-semibold py-2 max-md:text-xl'>Your Order has been Placed Successfully.</h4>
        <Link to="/orders/me" className="w-fit rounded-md font-barlow self-center text-center py-3 px-4 border-none bg-skyblue text-white mt-3 text-xl cursor-pointer">View Orders</Link>
        </div>
    </div>
  )
}

export default OrderSuccess