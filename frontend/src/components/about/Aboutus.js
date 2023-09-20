import React from 'react'
import A6 from "../../imgs/about/a6.jpg"
import Mp4 from "../../imgs/about/1.mp4"
import F1 from "../../imgs/features/f1.png"
import F2 from "../../imgs/features/f2.png"
import F3 from "../../imgs/features/f3.png"
import F4 from "../../imgs/features/f4.png"
import F5 from "../../imgs/features/f5.png"
import F6 from "../../imgs/features/f6.png"
import "./Aboutus.css";

const Aboutus = () => {
  return (
    <section className='addinfo'>
     {/* <!-- hero section --> */}
    <section id="shophero" className="abouthero">
        <h1>#About Us</h1>
        <p>Know More About Developer and About Us</p>
    </section>
    <section id="aboutbox" className="psect">
        <div className="aboutimg">
            <img src={A6} alt=""/>
        </div>
        <div className="aboutdetails">
            <h2>Who We Are ?</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, error placeat. Sit, minima repudiandae! Saepe qui et voluptates beatae fuga quis quo culpa nam minima. Itaque aliquid aut delectus ullam magnam similique placeat repellendus nulla, molestias eaque omnis harum sunt quam? Fugit modi error est sapiente iure aliquam, officia mollitia. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id, fuga rerum itaque harum pariatur tempora vitae architecto ex vero modi eos aliquam eaque doloremque rem hic dignissimos? Expedita, officiis mollitia!</p>
            <abbr title="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque dicta laudantium, veritatis libero ratione a magnam itaque voluptates ducimus repudiandae.</abbr>
            <br/>
            <br/>
            <marquee behavior="" direction="" >Developed and Maintained by Ajmal</marquee>
        </div>
    </section>
    <section id="applink">
        <h1>Download Our <span>App</span></h1>
        <div className="video psect msect">
            <video src={Mp4} autoplay loop muted></video>
        </div>
    </section>
    {/* <!-- feature section --> */}
    <section id="feature" className="psect">
        <div className="fbox1">
            <img src={F1} alt="no"/>
            <h6>Free shipping</h6>
        </div>
        <div className="fbox1">
            <img src={F2} alt="no"/>
            <h6>Order online</h6>
        </div>
        <div className="fbox1">
            <img src={F3} alt="no"/>
            <h6>Save money</h6>
        </div>
        <div className="fbox1">
            <img src={F4} alt="no"/>
            <h6>Promotion</h6>
        </div>
        <div className="fbox1">
            <img src={F5} alt="no "/>
            <h6>Happy sell</h6>
        </div>
        <div className="fbox1">
            <img src={F6} alt="nn"/>
            <h6>F24/7 Support</h6>
        </div>

    </section>
    </section>
  )
}

export default Aboutus