import "./style/hero.css";
import React, { useEffect } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import { Link, useNavigate } from "react-router-dom";
import IconsMobile from "../Icons/Icons_mobile";
import Navbar from "../1.Navbar/navbar";
import vocallyzeBg from "../../assets/images/vocallyze-bg.png"
import AllOneService from "../5.AllOneService/allOneService";
import WaitlistButton from "../../admino/WaitlistButton";
import Informational from "../Informational/Informational";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { Helmet } from "react-helmet";


const Hero = ({isOutside = false}) => {


  const navigate = useNavigate();


  const searchIcon =  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
  <circle cx="10" cy="10" r="7"></circle>
<line x1="21" y1="21" x2="15" y2="15"></line>

</svg>  

 const costIcon = <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
<path d="M16.7 8a3 3 0 0 0 -2.7 -2h-4a3 3 0 0 0 0 6h4a3 3 0 0 1 0 6h-4a3 3 0 0 1 -2.7 -2"></path>
<path d="M12 3v3m0 12v3"></path>

</svg>

const customerIcon = <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current w-6 h-6 stroke-2" fill="none" viewBox="0 0 24 24">
<path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>

</svg>

const starIcon = <img className="w-6 h-6" src="https://scan.com/assets/review-star-b69e09e438f36badb1d27701ae8f32e6aa6499e50a2c579926d96bc1326bb973.png"/>

  const icons = [
    
 
   
    {
        id:2,

        text:"100% call coverage"
    },
    {
        id:3,
        text:"Starting at 0.75 TL/call"
    },
    {
        id:4,
        text:"Works with your telephony"
    },
   
   ]

   AOS.init();

  return (
    <>

       <Helmet>
        {/* Preload the image */}
        <link
          rel="preload"
          as="image"
          href={vocallyzeBg}
          alt="bg image"
        />
      </Helmet>
     

     
      
      <div className="w-screen h-auto lg:pb-96 pb-60 lg:pt-20 pt-12 relative text-black font-product tracking-wide flex sm:items-start justify-center sm:justify-center">
        
        {/* get background image all div */}
         
        {/* mobil bg — same web background image, just cropped for the narrow viewport */}
        <img className="absolute sm:hidden flex sm:top-[2%] top-[1%] sm:h-[97%] h-[98%]   sm:left-[1%] left-[2%] sm:w-[98%] w-[96%]  object-cover -z-10" src={vocallyzeBg} alt=""/>
       
        {/* web bg */}
        <img className="absolute sm:flex hidden sm:top-[6px] top-[0%] sm:h-[97%] h-[98%]   sm:left-[1%] left-[2%] sm:w-[98%] w-[96%]  object-cover -z-10" src={vocallyzeBg} alt=""/>
       
        <div className="flex lg:mt-4 mt-6 flex-col lg:gap-10 gap-6 lg:items-center items-center text-center">
         
         <div data-aos-duration="600" data-aos="fade-up" className="flex flex-col items-center gap-4">
          <h1 data-aos-duration="600" data-aos="fade-up" className="lg:text-[52px] text-[34px] self-center tracking-wide lg:leading-[58px] leading-[42px] text-center text-black font-bold">Track the Entire Process</h1>
          <p data-aos-duration="600" data-aos="fade-up" className="lg:block hidden w-[90vw] lg:w-[60vw] font-product text-center text-black">
            Keep track of every call flowing through your center from your personal dashboard. It provides real-time updates—no sampling required—from the moment a call ends to the delivery of its full audit report, ensuring you're always informed and in control.
          </p>
          <p data-aos-duration="600" data-aos="fade-up" className="text-sm lg:hidden w-[90vw] font-product text-center text-black">Keep an eye on every call <i className="text-second">—no need to sample anything—</i> across your center through your personal dashboard.</p>

          {/* desktop: two-button row, unchanged */}
          <div className="lg:flex hidden items-center justify-center gap-4">
            <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-right" onClick={()=>{navigate("/form-new")}} className="px-10 py-2 rounded-full bg-second hover:bg-prim duration-300 self-center text-white w-fit shadow-lg cursor-pointer"> Get Early Access </div>
            <Link to={"/why-second-opinion"}> <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-left" className="px-10 py-2 rounded-full text-second border border-second self-center w-fit shadow-lg cursor-pointer"> Why Audit Calls? </div> </Link>
          </div>

          {/* mobile: single centered CTA, same pill/gradient/icon UI as the navbar's button */}
          <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-up" className="lg:hidden flex items-center justify-center">
            <WaitlistButton size="md" />
          </div>
        </div>

        <div   className="lg:flex lg:flex-row  flex flex-col items-center justify-center lg:gap-10 gap-2 text-black px-2"> 
           
           <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-right" className="lg:flex hidden gap-2"> {searchIcon} <p>100% Call Coverage</p> </div> 
           
           <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-up"  className="lg:flex hidden gap-2"> {costIcon} <p>KVKK-Compliant By Design</p> </div> 
         
           <div data-aos-delay="500" data-aos-duration="800" data-aos="fade-up"  className="lg:flex hidden gap-2 items-center justify-center"> <div className="w-2 h-2 rounded-full bg-teal-700 animate-ping"></div> <p>Live Compliance Monitoring</p> </div> 
        
           <div data-aos-delay="600" data-aos-duration="800" data-aos="fade-left"  className="lg:flex hidden gap-2"> {customerIcon} <p>Works With Your Telephony</p> </div> 
           
         
        </div>

       
     
       </div>

    
       
      </div>
    </>
  );
};

export default Hero;

/* 
*KVKK-Compliant By Design
*Personal Audit Dashboard
*100% Call Coverage
*Live Compliance Monitoring

*/