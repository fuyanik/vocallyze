import React from 'react'

import {Link} from 'react-router-dom';
import { useState } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";


import { RiFacebookFill } from "react-icons/ri";
import {AiOutlineInstagram} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {RiLinkedinFill} from "react-icons/ri";
import gV from "../../gV";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";

const FooterGen = () => {

    const [isHover , setIsHover] = useState(false);
  
  
    return (
    <div className='w-screen flex items-center relative h-[600px] -mt-20 border  '>
         <img className='w-full absolute  h-full ' src='https://vitamu.imgix.net/svg-4.png' alt='vawe'/>

         <div className=" relative">
          <img src='https://vitamu.imgix.net/MEDIFYRE-6.png?w=6400&h=3600&ar=6400%3A3600' className="w-40" alt="medifyre logo" />
          <p className="footer-main-left__title">
            Terms of Service · Privacy Policy
          </p>

         

         
        <div  className=" flex relative text-sm font-product "> 

        {isHover && (
          <BiRadsDropdown
             top={gV.mq.matches ? "-0%" : "0%"}
             left={gV.mq.matches ? "-0%" : "-0%"}
             onMouseLeave={() => setIsHover(false)}
             onClick={() => setIsHover(false)}
          />
        )}

       <Link onMouseMove={()=>{setIsHover(true)}} to={"/"}> <div className='items-center  justify-center animate-fadeIn   bg-second hover:bg-prim text-white hover:text-white duration-500 rounded-lg px-12 py-[9px] cursor-pointer border border-primTrans'>Get Started</div> </Link> 
    
     </div>

       

          <p className="footer-main-left__text">
            These statements have not been evaluated by the FDA or NHS. This
            service is not intended to treat or cure any disease
          </p>
          <img  className="footer-main-left__payment-logo" />
          <p className="footer-main-left__text">
            Medifyre© 2024 All Rights Reserved
          </p>
        </div>


       
    </div>
  )
}

export default FooterGen
