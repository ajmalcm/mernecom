import React from 'react'
import { CCarousel, CImage } from '@coreui/react';
import { CCarouselItem } from '@coreui/react'
import Cimg1 from "../../imgs/cimg1.jpg";
import Cimg2 from "../../imgs/cimg2.jpg";
import Cimg3 from "../../imgs/product1.jpg";
import Cimg4 from "../../imgs/product2.jpg";
import Cimg5 from "../../imgs/product3.jpg";
import Cimg6 from "../../imgs/p11.jpg";
import Cimg7 from "../../imgs/p15_hover.jpg";
import Cimg8 from "../../imgs/p6.jpg";



import '@coreui/coreui/dist/css/coreui.min.css';
const Carousel = () => {

  const lageCarouselItems=[{
    cr1:"SPRING 2023",
    cr2:"Womens Fashion",
    cr3:"Latest collections from the Best brands.",
    cr4:"SHOP NOW",
    cr5:Cimg1
  },
  {
  cr1:"TOP BRANDS",
  cr2:"New Collections",
  cr3:"Latest collections from the Best brands.",
  cr4:"SHOP NOW",
  cr5:Cimg2
},
]


  return (
    <CCarousel controls  dark interval={3000} transition='crossfade'>
    {
      lageCarouselItems.map((item,i)=>(
        <CCarouselItem className='crItem' key={i}>
    <h3 className='cr1'>{item.cr1}</h3>
    <h1 className='cr2'>{item.cr2}</h1>
    <p className='cr3'>{item.cr3}</p>
    <button className='cr4'>{item.cr4}</button>
      <CImage className=" w-100 object-contain " src={item.cr5} alt={`slide ${i}`} />

    </CCarouselItem>
      ))
    }
  </CCarousel>
  )
}

export default Carousel

export const SmCarousel=()=>{
  const smallCarouselItems=[ 
    {cr1:"SPRING 2023",
  cr2:"Womens Fashion",
  cr3:"Latest collections from the Best brands.",
  cr4:"SHOP NOW",
  cr5:Cimg3
},
{
cr1:"TOP BRANDS",
cr2:"New Collections",
cr3:"Latest collections from the Best brands.",
cr4:"SHOP NOW",
cr5:Cimg4
},
{cr1:"SPRING 2023",
cr2:"Womens Fashion",
cr3:"Latest collections from the Best brands.",
cr4:"SHOP NOW",
cr5:Cimg5
},
{
cr1:"TOP BRANDS",
cr2:"New Collections",
cr3:"Latest collections from the Best brands.",
cr4:"SHOP NOW",
cr5:Cimg6
},
{cr1:"SPRING 2023",
cr2:"Womens Fashion",
cr3:"Latest collections from the Best brands.",
cr4:"SHOP NOW",
cr5:Cimg7
},
{
cr1:"TOP BRANDS",
cr2:"New Collections",
cr3:"Latest collections from the Best brands.",
cr4:"SHOP NOW",
cr5:Cimg8
},

]

  return(
    <CCarousel controls  dark interval={3000} transition='crossfade'>
{
  smallCarouselItems.map((item,i)=>(
        <CCarouselItem className='crItem' key={i}>
    <h3 className='cr1'>{item.cr1}</h3>
    <h1 className='cr2'>{item.cr2}</h1>
    <p className='cr3'>{item.cr3}</p>
    <button className='cr4'>{item.cr4}</button>
      <CImage className=" w-100 object-contain " src={item.cr5} alt={`slide ${i}`} />

    </CCarouselItem>
      ))
    }
    </CCarousel>
  )
}