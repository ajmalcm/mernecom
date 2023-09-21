import React from 'react'
import b1 from "../../imgs/blog/b1.jpg";
import b2 from "../../imgs/blog/b2.jpg";
import b3 from "../../imgs/blog/b3.jpg";
import b4 from "../../imgs/blog/b4.jpg";
import b5 from "../../imgs/blog/b5.jpg";

const Blog = () => {
  return (
    <div className='addinfo'>
    <section id="shophero" className="bloghero">
        <h2>#Read More About My Website</h2>
        <p>Read in detail about all of our products and about this site</p>
    </section>
    {/* <!-- for blog section --> */}
    <section id="blog">
        <div className="blogbox">
            <div className="blogimg">
                <img src={b1} alt="b1"/>
            </div>
            <div className="blogdetails">
                <h4>The full sleeved pull-overs</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum inventore impedit ex at hic, aliquam repudiandae distinctio saepe quaerat maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, minus?</p>
                {/* <a href="#">READ MORE</a> */}
            </div>
            <h1>10/02</h1>
        </div>
        <div className="blogbox">
            <div className="blogimg">
                <img src={b2} alt="b2"/>
            </div>
            <div className="blogdetails">
                <h4>The sarees and kurtas</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum inventore impedit ex at hic, aliquam repudiandae distinctio saepe quaerat maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, minus?</p>
                {/* <a href="#">READ MORE</a> */}
            </div>
            <h1>11/02</h1>
        </div>
        <div className="blogbox">
            <div className="blogimg">
                <img src={b3} alt="b3"/>
            </div>
            <div className="blogdetails">
                <h4>Aesthetic Winter wear</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum inventore impedit ex at hic, aliquam repudiandae distinctio saepe quaerat maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, minus?</p>
                {/* <a href="#">READ MORE</a> */}
            </div>
            <h1>12/02</h1>
        </div>
        <div className="blogbox">
            <div className="blogimg">
                <img src={b4} alt="b4"/>
            </div>
            <div className="blogdetails">
                <h4>The best of Streets</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum inventore impedit ex at hic, aliquam repudiandae distinctio saepe quaerat maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, minus?</p>
                {/* <a href="#">READ MORE</a> */}
            </div>
            <h1>13/02</h1>
        </div>
        <div className="blogbox">
            <div className="blogimg">
                <img src={b5} alt="b5"/>
            </div>
            <div className="blogdetails">
                <h4>The Old School Gems</h4>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum inventore impedit ex at hic, aliquam repudiandae distinctio saepe quaerat maiores?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, minus?</p>
                {/* <a href="#">READ MORE</a> */}
            </div>
            <h1>14/02</h1>
        </div>
    </section>
    {/* <!-- for pagination --> */}
    {/* <section id="pagination" className="psect">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg></a>
    </section> */}
    </div>
  )
}

export default Blog