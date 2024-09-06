import "./style/hero.css";
import React, { useEffect } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import { Link, useNavigate } from "react-router-dom";
import SelectBodyParts from "../../pages/Forms/components/selectBodyParts";
import ScanType from "../../pages/Forms/components/selectScan";
import IconsMobile from "../Icons/Icons_mobile";
import Navbar from "../1.Navbar/navbar";
import groupPng from "../../assets/images/group.png"
import AllOneService from "../5.AllOneService/allOneService";
import Informational from "../Informational/Informational";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles


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

        text:"60+ radiologists"
    },
    {
        id:3,
        text:"Starting at $20"
    },
    {
        id:4,
        text:"Insurance accepted"
    },
   
   ]

   AOS.init();

  return (
    <>
     

     
      
      <div className="w-screen h-auto   lg:pb-96 pb-60 lg:pt-12   relative text-black font-product tracking-wide  flex  sm:items-start  justify-center sm:justify-center   ">
        
        {/* get background image all div */}
         
        {/* mobil bg */}
        <img className="absolute sm:hidden flex sm:top-[2%] top-[1%] sm:h-[97%] h-[98%]   sm:left-[1%] left-[2%] sm:w-[98%] w-[96%]  object-cover -z-10" src="https://vitamu.imgix.net/background916.png?w=864&h=1536&ar=864%3A1536&auto=compress" alt="groupPng"/>
       
        {/* web bg */}
        <img className="absolute sm:flex hidden sm:top-[6px] top-[0%] sm:h-[97%] h-[98%]   sm:left-[1%] left-[2%] sm:w-[98%] w-[96%]  object-cover -z-10" src="https://vitamu.imgix.net/Ads%C4%B1z%20tasar%C4%B1m-10.png?w=6400&h=3371&rect=0%2C0%2C6400%2C3371&auto=compress" alt="groupPng"/>
       
        <div className="flex lg:mt-12  mt-28-iphone7 mt-36 flex-col lg:gap-10 gap-6 lg:items-center items-center  text-center">
         
         <div data-aos-delay="150" data-aos-duration="400" data-aos="fade-up"    className="    lg:text-[60px] text-[36px] lg:w-[40vw] lg:leading-[78px]  leading-[42px]   lg:text-center text-center items-center justify-left font-bold ">
           <p  >Get your online</p>
         
           <div  className="hero__main__header__fade-in  flex  justify-center lg:justify-center relative">
              <p className="">ultrasound</p>
              <p>MRI</p>
              <p>mammogram</p>
              <p>CT scan</p>
              <p>PET scan</p>
              <p>X-ray</p>
             
            </div>
         
           <p data-aos="fade-up" className="mt-10 lg:mt-[72px]">second opinion </p>
        </div>
        
   
      {  


      /* Hero Dropdowns Buttons */

      /*  Mobile */
      gV.mq.matches ? 
        <div  className="flex flex-col items-center  gap-3 rounded-full ">
          <div data-aos-delay="300" data-aos-duration="300" data-aos="fade-up" >
            <SelectBodyParts/>
          </div>
          <div data-aos-delay="400" data-aos-duration="300" data-aos="fade-up" >
            <ScanType/>
          </div>
         <div data-aos-delay="500" data-aos-duration="300" data-aos="fade-up"  onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-second hover:bg-prim duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>
        </div>
      
      
      :
      /* Desktop */
        <div  data-aos-delay="300" data-aos-duration="400" data-aos="fade-up"  className="  flex w-[65vw] cursor-pointer  h-[58px]  ">
          <SelectBodyParts/>
          <ScanType/>
          
          <div onClick={()=>{ navigate("/form-new") }} className=" flex items-center justify-center gap-3 w-[22%] h-full   bg-second hover:bg-prim duration-500 text-white rounded-[44px] relative right-6 z-10  "> 
            <p>Get Started</p>
            <p>➔</p>
           </div>
          
         </div>

} 

        <div   className="lg:flex lg:flex-row  flex flex-col items-center justify-center lg:gap-10 gap-2 text-black px-2"> 
           
           <div data-aos-delay="500" data-aos-duration="300" data-aos="fade-right" className="lg:flex hidden gap-2"> {searchIcon} <p>60+ Radiologists</p> </div> 
           
           <div data-aos-delay="500" data-aos-duration="300" data-aos="fade-up"  className="lg:flex hidden gap-2"> {costIcon} <p>Full Refund Guarantee</p> </div> 
           <div  data-aos-delay="500" data-aos-duration="300" data-aos="fade-left"  className="lg:hidden flex gap-2"> {costIcon} <p>Full Refund Guarantee</p> </div> 
         
           <div data-aos-delay="500" data-aos-duration="300" data-aos="fade-up"  className="lg:flex hidden gap-2 items-center justify-center"> <div className="w-2 h-2 rounded-full bg-teal-700 animate-ping"></div> <p>Follow-up Consultations</p> </div> 
        
           <div data-aos-delay="600" data-aos-duration="300" data-aos="fade-left"  className="lg:flex hidden gap-2"> {customerIcon} <p>Insurance Accepted</p> </div> 
           <div data-aos-delay="500" data-aos-duration="300" data-aos="fade-right"   className="lg:hidden  flex gap-2"> {customerIcon} <p>Insurance Accepted</p> </div> 
         
         
           <div data-aos-delay="700" data-aos-duration="300" data-aos="fade-left"  className="flex lg:hidden gap-2 items-center justify-center  "> {searchIcon} <p>Personal Dashboard</p> </div> 
           
         
        </div>

       
     
       </div>

    
       
      </div>
    </>
  );
};

export default Hero;

/* 
*Full Refund Guarantee
*Personalized Dashboard
*Largest Specialist Network in the USA
*Follow-up Consultations Available

*/