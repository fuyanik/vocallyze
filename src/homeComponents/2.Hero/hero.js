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
    {
        id:5,
        text:"Fully online process"
    },
   ]



  return (
    <>
     {isOutside && 
     
     <Navbar
      mobileMenuText={'Menu'}
      mobileMenuTo ={"/mobileNavMenu"}
      />}

      {isOutside && <div className="h-20"> </div>}
      
      <div className="w-screen h-auto pb-28 relative text-black font-product tracking-wide  flex  items-center  px-[4vw] lg:px-[7.8vw]   ">
        
       
       
        <div className="flex lg:mt-32  mt-16 flex-col gap-5 lg:items-start items-center text-center">
         
         <div className=" lg:text-[76px] lg:w-[40vw] lg:leading-[78px]  leading-[42px]  text-[36px] lg:text-start text-center items-center justify-left   font-bold ">
           <p>Get your online</p>
         
           <div  className="hero__main__header__fade-in text-black flex   justify-center lg:justify-start  relative">
              <p className="text-black">ultrasound</p>
              <p>MRI</p>
              <p>mammogram</p>
              <p>CT scan</p>
              <p>PET scan</p>
              <p>X-ray</p>
             
            </div>
         
           <p className="mt-10 lg:mt-[72px]">second opinion </p>
        </div>
         <p className="lg:text-[20px]" >Radiology second opinions from U.S. board-certified radiologists. Results in 24 hours.</p>
   
      {  


      /* Hero Dropdowns Buttons */

      /*  Mobile */
      gV.mq.matches ? 
        <div className="flex flex-col items-center  gap-3 rounded-full ">
          <SelectBodyParts/>
          <ScanType/>
         <div onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>
        </div>
      
      
      :
      /* Desktop */
        <div className=" flex w-[65vw] cursor-pointer  h-[54px]  ">
          
          
          <SelectBodyParts/>
          <ScanType/>
          
        
        
          <div onClick={()=>{ navigate("/form-new") }} className=" flex items-center justify-center gap-3 w-[22%] h-full   bg-[#ff4949] text-white rounded-[44px] relative right-6 z-10  "> 
            <p>Get Started</p>
            <p>➔</p>
           </div>
          
         </div>

} 

 
  {

    /* Hero Bottom Icons */
    gV.mq.matches ? 
    
     <div className="flex flex-col gap-2 items-center text-center">
    {icons.map((company,idx) => (
      <div key={idx} className="flex w-[full]  gap-2  items-center">
   
   {idx === 0 &&  searchIcon}
    {idx === 1 &&  costIcon}
    {idx === 2 &&  customerIcon}
    {idx === 3 &&  starIcon}

      <p className="text-center text-[16px]">{company.text}</p>
    </div>
    ))}

    </div>  : 



<div className=" flex mt-10 gap-12 self-start ">
        
{icons.map((company,idx) => (
  <div key={idx} className="flex  w-auto  gap-3  items-center">
 
    {idx === 0 &&  searchIcon}
    {idx === 1 &&  costIcon}
    {idx === 2 &&  customerIcon}
    {idx === 3 &&  starIcon}
  
  <p className="text-center">{company.text}</p>
</div>
))}
</div>
  }
     

        
        

     
       </div>



      <div className="absolute  lg:flex hidden right-0 mr-10">
        <img src={groupPng}/>
      </div>
       
      </div>
    </>
  );
};

export default Hero;
