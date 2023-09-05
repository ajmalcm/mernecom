import React, { useEffect, useState } from 'react'
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom"
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import StackedLineChartOutlinedIcon from "@mui/icons-material/StackedLineChartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Dicon from "../../imgs/dicon.png";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
    const {pathname}=useLocation()
  const [sideOpen,setSideOpen]=useState(true);  
    const sidebarContents = [
        {
          header: "Dashboard",
          sub: [{ subIcon: <ShoppingBagOutlinedIcon />, subtitle: "Ecommerce",link:"/admin/ecommerce" }],
        },
        {
          header: "Pages",
          sub: [
            { subIcon: <CategoryOutlinedIcon />, subtitle: "All Products",link:"/admin/allproducts" },
            { subIcon: <AddOutlinedIcon />, subtitle: "Create Products",link:"/admin/createproducts" },
            { subIcon: <ShoppingCartOutlinedIcon />, subtitle: "Orders",link:"/admin/orders" },
            { subIcon: <PeopleAltOutlinedIcon />, subtitle: "Users",link:"/admin/users" },
          ],
        },
        {
          header: "Apps",
          sub: [
            { subIcon: <CalendarTodayOutlinedIcon />, subtitle: "Calendar",link:"/admin/calender" },
            { subIcon: <ViewKanbanOutlinedIcon />, subtitle: "Kanban",link:"/admin/kanban" },
            { subIcon: <EditCalendarOutlinedIcon />, subtitle: "Editor",link:"/admin/editor" },
            { subIcon: <FormatColorFillOutlinedIcon />, subtitle: "Color-picker",link:"/admin/colorpicker" },
          ],
        },
        {
          header: "Charts",
          sub: [
            { subIcon: <StackedLineChartOutlinedIcon />, subtitle: "Line",link:"/admin/line" },
            { subIcon: <BarChartOutlinedIcon />, subtitle: "Bar",link:"/admin/bar" },
            { subIcon: <TimelineOutlinedIcon />, subtitle: "Area",link:"/admin/area" },
            { subIcon: <PieChartOutlineOutlinedIcon />, subtitle: "Pie",link:"/admin/pie" },
          ],
        },
      ];
      const [path,setpath]=useState("");
      useEffect(()=>{
        setpath(pathname.split("/")[2])
      },[pathname])

  return (
    <>
    {
        sideOpen?
    <div className="h-[100vh] w-[300px] overflow-auto flex flex-col bg-[#f3f3f3]  shadow-sm sticky top-0 left-0 max-[820px]:w-[200px]">
          {/* sidebar top */}
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1">
              <img
                src={Dicon}
                alt="Dash"
                className="w-[78px] h-[78px] object-contain rounded-full max-md:w-[50px] max-[820px]:h-[50px]"
              />
              <span className="text-2xl font-barlow font-bold tracking-widest pl-2 max-[820px]:p-0 max-[820px]:text-xl max-[820px]:hidden">
                DASH-B
              </span>
            </div>
            <CloseIcon  onClick={()=>setSideOpen(!sideOpen)} className='pr-1'/>
          </div>
          {/* sidebar bottom */}

          <div className="flex flex-col px-6 gap-4 max-md:px-1">
          {
            sidebarContents.map((item,i)=>(
              <div className="flex flex-col font-barlow " key={i}>
              <h4 className="text-lg tracking-widest md:capitalize font-semibold text-slate-500 max-[600px]:tracking-normal max-[600px]:text-[16px] max-[600px]:font-normal">
                {item.header}
              </h4>
              {
                item.sub.map((su,i)=>(
                  <Link to={su.link} className={`flex gap-4 max-[600px]:justify-center pl-6 max-[820px]:pl-2 py-2 cursor-pointer hover:bg-slate-300  hover:rounded-md transition-all duration-100 delay-75 ease-in-out ${(su.subtitle.replace(/\s/g, '')).toLowerCase()===path?"bg-blue-500 text-white rounded-md":""}`} key={i}>
                {su.subIcon}
                <span className='max-[600px]:hidden'>{su.subtitle}</span>
              </Link>
                ))
              }
              
            </div>
            ))
          }
            
          </div>
        </div>
        :<div className='pl-3 py-3 max-md:p-0'>
        <MenuIcon fontSize='large' onClick={()=>setSideOpen(!sideOpen)}/>
        </div>
    }
        </>
  )
}

export default Sidebar