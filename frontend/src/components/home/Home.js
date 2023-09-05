import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import DeckOutlinedIcon from "@mui/icons-material/DeckOutlined";
import Treeview from "./Treeview";
import Carousel, { SmCarousel } from "./Carousel";
import Metadata from "../layout/Header/Metadata";
import { clearErrors, getProduct } from "../redux/actions/productAction";
import ProductCard from "../products/ProductCard";
import Loading from "../loading/Loading";
import {toast } from 'react-toastify';

const Home = () => {
  const dispatch = useDispatch();
  const {products,loading,error}=useSelector(state=>state.products);
  useEffect(() => {
    if(error)
    {
      toast.error(error);
      dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch,error]);

  const Category = [
    {
      name: "Clothing",
      sub: [],
      icon: ShoppingBagOutlinedIcon,
    },
    {
      name: "Electronics",
      sub: [],
      icon: ComputerOutlinedIcon,
    },
    {
      name: "Shoes",
      sub: [],
      icon: PetsOutlinedIcon,
    },
    {
      name: "Health",
      sub: [],
      icon: Diversity1OutlinedIcon,
    },
    {
      name: "Sports",
      sub: [],
      icon: SportsSoccerOutlinedIcon,
    },
    {
      name: "Daily needs",
      // sub: [{ sub1: "Books" }, { sub1: "Medics" }],
      icon: DeckOutlinedIcon,
    },
  ];

  return (
    <div className="homeContainer">
      <Metadata title="HOME" />
      <div className="homeLeft">
        <div className="categoryTree">
          <div className="categoryHeader">
            <MenuIcon />
            <span>Categories</span>
          </div>
          <div>
            {Category.map((item, index) => (
              <Treeview
                main={item.name}
                sub={item.sub}
                Icon={item.icon}
                key={index}
                lb={index === Category.length - 1 ? "0 0 10px 10px" : "none"}
               
              />
            ))}
          </div>
        </div>

        <div className="homeLeft2">
          <span>Product Tags</span>
          <div className="tagContainer">
            <span>Phone</span>
            <span>Vest</span>
            <span>Mobile</span>
            <span>Laptop</span>
            <span>Toys</span>
            <span>Shirts</span>
            <span>Pants</span>
            <span>Sports</span>
            <span>Football</span>
            <span>Boots</span>
          </div>
        </div>

        <div className="homeLeft3">
          <span>Manufactures</span>
          <div className="mnfContainer">
            <span>Nike</span>
            <span>Addidas</span>
            <span>Puma</span>
            <span>Luis Vuitton</span>
            <span>H&M</span>
            <span>Roadster</span>
            <span>Urban Monkey</span>
          </div>
        </div>
      </div>

      <div className="homeRight">
        <div className="rightTop">
        <div className="largeImage">
          <Carousel />
        </div>
        <div className="smallImage">
              <SmCarousel/>
        </div>
        </div>
        <div className="rightBottom">
          <div className="rightBottomHeader">
            <h3>Featured Products</h3>
            <div className="smHeader">
              <span>all</span>
              <span>clothing</span>
              <span>Electronics</span>
              <span>shoes</span>
            </div>
          </div>
          <div className="homeProductConatiner">
          {
            loading?<Loading/>:
            products.map((item,index)=>(
            <ProductCard product={item} key={index}/>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
