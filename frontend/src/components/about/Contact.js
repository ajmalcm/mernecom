import React from 'react'
import one from "../../imgs/people/1.png";
import two from "../../imgs/people/2.png";
import three from "../../imgs/people/3.png";

const Contact = () => {
  return (
    <div className='addinfo'>
       <section id="shophero" className="contacthero">
        <h1>#Lets_Talk</h1>
        <p>LEAVE A MESSAGE.we love to hear from you</p>
    </section>
    <section id="contactdetails" className="psect">
        <div className="details">
            <span>GET IN TOUCH</span>
            <h2>Visit one of our agency location or contact us today</h2>
            <h3>HEAD OFFICE</h3>
            <div>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" fill="currentColor"
                        className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                        <path
                            d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    <p>CCG gonikoppal 571213</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" fill="currentColor"
                        className="bi bi-telephone-fill" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                    </svg>
                    <p>White Field Bnglore INDIA</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" fill="currentColor"
                        className="bi bi-phone-fill" viewBox="0 0 16 16">
                        <path
                            d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                    </svg>
                    <p>Silicon Valley USA</p>
                </li>
                <li>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="37" fill="currentColor"
                        className="bi bi-envelope-fill" viewBox="0 0 16 16">
                        <path
                            d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                    </svg>
                    <p>ajmalcm22@gmail.com</p>
                </li>
            </div>
        </div>
        <div className="map">
            <iframe
            title='mylocation'
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.9513243585943!2d75.91435121429762!3d12.183715334973192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5ba1398fa8f11%3A0x931ecd16c3e0bc40!2sCauvery%20College%20Gonikoppal!5e0!3m2!1sen!2sin!4v1648970161538!5m2!1sen!2sin"
                width="600" height="450" style={{border:"0"}} allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

    </section>
    <section id="formdetails">
        <form action="">
            <span>LEAVE A MESSAGE</span>
            <h2>We Love To Hear From You</h2>
            <input type="text" placeholder="YOUR NAME"/>
            <input type="text" placeholder="EMAIL"/>
            <input type="text" placeholder="SUBJECT"/>
            <textarea name="" id="" cols="30" rows="10" placeholder="YOUR MESSAGE"></textarea>
            <button className="normal">submit</button>

        </form>
        <div className="people">
            <div>
                <img src={one} alt=""/>
                <p><span>John marco</span>Marketing manager<br/>Phone :+000111222<br/>E-mail :john@gmail.com</p>
            </div>
            <div>
                <img src={two} alt=""/>
                <p><span>Jacob joe</span>Analyst<br/>Phone :+000888222<br/>E-mail :jacobn@gmail.com</p>
            </div>
            <div>
                <img src={three} alt=""/>
                <p><span>Jonathan Joestar</span>Sales executive<br/>Phone :+000444222<br/>E-mail :jonathan@gmail.com</p>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Contact