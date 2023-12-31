import React,{useEffect} from "react";
import Sidebar from "./Sidebar";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
// import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { Doughnut,Line} from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../redux/actions/productAction";
import { getAllOrders } from "../redux/actions/orderAction";
import { getAllUsers } from "../redux/actions/userAction";
import { Link } from "react-router-dom";
const Dashboard = () => {
  
  Chart.register(CategoryScale);
  const dispatch=useDispatch();
  const {products}=useSelector(state=>state.products);
  const {orders}=useSelector(state=>state.AllOrders);
  const {users}=useSelector(state=>state.allUsers)

  let totalAmount=0;
  orders&&orders.forEach((item)=>{
    totalAmount+=item.totalPrice
  })

  const dashItems=[
    {icon:<CurrencyRupeeIcon  fontSize="medium"/>,price:`₹${totalAmount}`,text:"Earnings",colornbg:"text-red-500 bg-red-100",link:"/admin/Ecommerce"},
    {icon:<PeopleAltOutlinedIcon fontSize="medium"/>,price:` ${users.length}`,text:"Users",colornbg:"text-green-500 bg-green-100",link:"/admin/users"},
    {icon:<CategoryOutlinedIcon fontSize="medium"/>,price:` ${products.length}`,text:"Products",colornbg:"text-blue-500 bg-blue-100",link:"/admin/allproducts"},
    // {icon:<SignalCellularAltRoundedIcon fontSize="medium"/>,price:`₹${6643}`,text:"Sales",colornbg:"text-orange-500 bg-orange-100"},
    {icon:<CachedRoundedIcon fontSize="medium"/>,price:` ${orders?.length}`,text:"Orders",colornbg:"text-violet-500 bg-violet-100",link:"/admin/orders"},
  ]

  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"Total Amount",
        backgoundColor:["#157ed2"],
        hoverBackgroundColor:["rgb(197,72,49)"],
        data:[0,totalAmount],
        tension:0.1
      }

    ]
  }

  let outofStock=0;
  products && products.forEach((item)=>{
    if(item.stock===0)
    outofStock+=1
  })

  useEffect(()=>{
    dispatch(getAdminProducts())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  },[dispatch])

  const doughtnutState={
    labels:["In Stock","Out Of Stock"],
    datasets:[
      {
        backgoundColor:["#157ed2","#fdd922"],
        hoverBackgroundColor:["#A3E3FA"],
        data:[(products.length-outofStock),outofStock],
        tension:0.1
      }

    ]
  }

  return (
    <>
      {/* conatiner div */}
      <div className="min-h-[104vh] flex justify-between w-screen absolute  bg-white top-0 left-0 gap-3">
        {/* sidebar that is left side */}
        <Sidebar/>
        {/* right side */}
        <div className="mt-6 flex flex-1 flex-col p-4 max-md:p-0 gap-8">
          {/* right side top */}
          <h4 className="tracking-widest font-barlow font-[500] text-2xl text-center mb-4">DASHBOARD</h4>
          <div className="flex justify-center items-center gap-4 flex-wrap">
              {dashItems.map((item,i)=>(
                <Link to={`${item.link}`} className="flex flex-col h-[180px] w-[230px] justify-start font-barlow shadow-md rounded-lg pt-6 px-6 max-md:p-4 gap-2" key={i}>
                  <div className={`rounded-full  w-fit p-3 ${item.colornbg} mb-2`}>{item.icon}</div>
                  <h5 className="mb-0 font-semibold text-xl">{item.price}</h5>
                  <span className="text-slate-400">{item.text}</span>
                </Link>

              ))
              }
          </div>
          {/* right side bottom */}
          <div className="flex-1 space-y-6">
            <div className="w-[90%] max-[820px]:width-full m-auto">
                <Line data={lineState} />
            </div>
            <div className="w-[30vmax] m-auto max-[600px]:w-[30vmax]">
                <Doughnut data={doughtnutState} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
