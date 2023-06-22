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




const Hero = () => {


  const navigate = useNavigate();



  const icons = [
   
    {
        id:2,
        img:"https://img.icons8.com/external-kmg-design-detailed-outline-kmg-design/64/142b6f/external-telephone-contact-us-kmg-design-detailed-outline-kmg-design.png",
        text:"Phone consultation"
    },
    {
        id:3,
        img:"https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/142b6f/external-file-home-office-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
        text:"Detailed recheck report"
    },
    {
        id:4,
        img:"https://img.icons8.com/ios/50/142b6f/medical-insurance--v1.png",
        text:"Insurance accepted"
    },
    {
        id:5,
        img:"https://img.icons8.com/pastel-glyph/64/142b6f/internet.png",
        text:"Fully online process"
    },
   ]



  return (
    <>
      <div className="w-screen  pt-3 pb-28 relative text-[#142b6f] font-product tracking-wide  flex flex-col items-center px-[4vw]   ">
      
      <img src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg" className="w-screen h-full absolute -z-20 opacity-20"  alt="vitamu"/>
        
       
       
        <div className="flex lg:mt-32  mt-16 flex-col gap-5 items-center text-center">
         
         <div className=" lg:text-[76px] lg:w-[40vw] lg:leading-[76px]  leading-[42px]  text-[36px] text-center items-center justify-center   font-bold ">
           <p>Get your online</p>
         
           <div  className="hero__main__header__fade-in flex justify-center relative">
              <p>ultrasound</p>
              <p>MRI</p>
              <p>mammogram</p>
            </div>
         
           <p className="mt-10 lg:mt-[72px]">second opinion </p>
        </div>
         <p className="lg:text-[20px]" >Radiology second opinions from U.S. board-certified radiologists. Results in 24 hours.</p>
   
      {  


      /* Hero Dropdowns Buttons */

      /*  Mobile */
      gV.mq.matches ? 
        <div className="flex flex-col items-center gap-3">
          <SelectBodyParts/>
          <ScanType/>
         <div onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[290px] h-[48px]  rounded-3xl">Get Started</div>
        </div>
      
      
      :
      /* Desktop */
        <div className=" flex w-[65vw] cursor-pointer  h-[56px] ">
          
          
          <SelectBodyParts/>
          <ScanType/>
          
        
        
          <div onClick={()=>{ navigate("/form-new") }} className=" flex items-center justify-center gap-3 w-[22%] h-full   bg-[#ff4949f4] text-white rounded-[44px] relative right-6 z-10  "> 
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
      <img
        className="w-5"
        src={company.img}
      />
      <p className="text-center text-[16px]">{company.text}</p>
    </div>
    ))}

    </div>  : 



<div className=" flex mt-10 gap-20 self-center ">
        
{icons.map((company,idx) => (
  <div key={idx} className="flex  w-auto  gap-4  items-center">
  <img
    className="w-7"
    src={company.img}
  />
  <p className="text-center">{company.text}</p>
</div>
))}
</div>
  }
     

        
        

     
       </div>
       
      </div>
    </>
  );
};

export default Hero;
