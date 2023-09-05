import React from "react";
import Sidebar from "./Sidebar";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import SignalCellularAltRoundedIcon from '@mui/icons-material/SignalCellularAltRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { Doughnut,Line} from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
const Dashboard = () => {
  
  Chart.register(CategoryScale);

  const dashItems=[
    {icon:<CurrencyRupeeIcon  fontSize="medium"/>,price:1233,text:"Earnings",colornbg:"text-red-500 bg-red-100"},
    {icon:<PeopleAltOutlinedIcon fontSize="medium"/>,price:3322,text:"Users",colornbg:"text-green-500 bg-green-100"},
    {icon:<CategoryOutlinedIcon fontSize="medium"/>,price:332244,text:"Products",colornbg:"text-blue-500 bg-blue-100"},
    {icon:<SignalCellularAltRoundedIcon fontSize="medium"/>,price:54244,text:"Sales",colornbg:"text-orange-500 bg-orange-100"},
    {icon:<CachedRoundedIcon fontSize="medium"/>,price:221221,text:"Refunds",colornbg:"text-violet-500 bg-violet-100"},
  ]

  const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[
      {
        label:"Total Amount",
        backgoundColor:["#157ed2"],
        hoverBackgroundColor:["rgb(197,72,49)"],
        data:[0,4000],
        tension:0.1
      }

    ]
  }

  const doughtnutState={
    labels:["In Stock","Out Of Stock"],
    datasets:[
      {
        backgoundColor:["#157ed2","#fdd922"],
        hoverBackgroundColor:["#A3E3FA"],
        data:[10,2],
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
                <div className="flex flex-col h-[180px] w-[230px] justify-start font-barlow shadow-md rounded-lg pt-6 px-6 max-md:p-4 gap-2" key={i}>
                  <div className={`rounded-full  w-fit p-3 ${item.colornbg} mb-2`}>{item.icon}</div>
                  <h5 className="mb-0 font-semibold text-xl">₹{item.price}</h5>
                  <span className="text-slate-400">{item.text}</span>
                </div>

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
