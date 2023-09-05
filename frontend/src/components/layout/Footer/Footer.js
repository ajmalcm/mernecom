import React from "react";
import "./Footer.css";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PinDropIcon from "@mui/icons-material/PinDrop";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import P1 from "../../../imgs/paypal.png";
import P2 from "../../../imgs/visa.png";
import P3 from "../../../imgs/mastercard.png";
import P4 from "../../../imgs/american.png";
import P5 from "../../../imgs/discover.png";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerTop">
        <div>
          <LocalShippingOutlinedIcon />
          <span>We ship nationwide</span>
        </div>
        <div>
          <LocalPhoneOutlinedIcon />
          <span>Call +919099099110</span>
        </div>
        <div>
          <AttachMoneyOutlinedIcon />
          <span>Best quality products</span>
        </div>
        <div>
          <BusinessCenterOutlinedIcon />
          <span>30 days return</span>
        </div>
      </div>
      <div className="footerMiddle">
        <div className="fm1">
          <div>
            <PinDropIcon style={{ color: "#fdd922" }} />
            <span>
              Gonikoppal virajpet <br />, 571213, Karnataka ,INDIA
            </span>
          </div>
          <div>
            <SmartphoneIcon style={{ color: "#fdd922" }} />
            <span>
              (+919099099110) <br />
              (+919099066110)
            </span>
          </div>
          <div>
            <MailIcon style={{ color: "#fdd922" }} />
            <span>ajmalcm22@gmail.com</span>
          </div>
        </div>
        <div className="fm1">
          <span className="fmSubHeader">Customer Service</span>
          <ul>
            <li>My Account</li>
            <li>Order History</li>
            <li>FAQ</li>
            <li>Specials</li>
            <li>Top Products</li>
          </ul>
        </div>

        <div className="fm1">
          <span className="fmSubHeader">Corporation</span>
          <ul>
            <li>About Us</li>
            <li>Customer Service</li>
            <li>Blog</li>
            <li>Contact Us</li>
            <li>Company</li>
          </ul>
        </div>
        <div className="fm1">
          <span className="fmSubHeader">Why Choose Us</span>
          <ul>
            <li>Best products</li>
            <li>Customer satisfaction</li>
            <li>Shopping list</li>
            <li>Blog</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      <div className="footerBottom">
        <div className="fbleft">
        <FacebookIcon fontSize="large"/>
        <InstagramIcon fontSize="large"/>
        <TwitterIcon fontSize="large"/>
        <YouTubeIcon fontSize="large"/>
        </div>
        <div className="fbright">
        <img src={P1} alt="p1"/>
        <img src={P2} alt="p1"/>
        <img src={P3} alt="p1"/>
        <img src={P4} alt="p1"/>
        <img src={P5} alt="p1"/>
        </div>
      </div>
    </div>
  );
};

export default Footer;
