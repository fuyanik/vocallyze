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



  const [isHover, setIsHover] = useState(false);
  
  const hero_bg = window.innerWidth > 1080 ? "https://vitamu.imgix.net/banner.png?auto=undefined%2Ccompress": "https://vitamu.imgix.net/bg_mob.png?auto=undefined%2Ccompress";




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
      <div className="w-screen h-auto py-3 relative text-[#142b6f] font-product tracking-wide  flex flex-col items-center px-[4vw]   ">
      
      <img src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg" className="w-screen h-full absolute -z-20 opacity-20"  alt="vitamu"/>
        
       
       
        <div className="flex lg:mt-32  mt-20 flex-col gap-8 items-center text-center">
         
         <p className=" lg:text-[76px] lg:w-[40vw] lg:leading-[76px]  leading-[42px]  text-[36px] text-center  font-bold ">Get your online mammogram second opinion </p>
         <p className="lg:text-[20px]" >Radiology second opinions from U.S. board-certified radiologists. Results in 24 hours.</p>
   
      {  

      gV.mq.matches ? 
        <div className="flex flex-col gap-3">
          <SelectBodyParts/>
          <ScanType/>
         <div onClick={()=>{navigate("/form-new")}} className=" flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[320px] h-[48px]   rounded-3xl">Get Started</div>
        </div>
        :

        <div className=" flex w-[65vw] cursor-pointer  h-[56px] ">
          
          
          <div className=" flex items-center px-5 w-[44%] h-full  border-[#142b6f] rounded-tl-[44px] rounded-bl-[44px] bg-white "> 
            <div className="flex w-full  items-center justify-between "> 
             
             <div className="flex gap-2 items-center justify-center">
               <img width="20" src="https://img.icons8.com/ios-filled/50/ff4949/search--v1.png" alt="search--v1"/>
               <p> Choose Body Part </p>
             </div>
             
              <img className="rotate-180" width="20" height="20" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>
              
           </div>    
          </div>
         
          <div className=" flex items-center px-5 w-[36%] h-full  bg-white  "> 
          <div className="flex w-full  items-center justify-between "> 
             
             <div className="flex gap-2 items-center justify-center">
               <img width="20" src="https://img.icons8.com/ios-filled/50/ff4949/search--v1.png" alt="search--v1"/>
               <p> Scan Type </p>
             </div>
             
              <img  className="rotate-180 relative right-6" width="20" height="20" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>
              
           </div>  
          </div>
        
        
          <div onClick={()=>{ navigate("/form") }} className=" flex items-center justify-center gap-3 w-[22%] h-full   bg-[#ff4949f4] text-white rounded-[44px] relative right-6  "> 
            <p>Get Started</p>
            <p>➔</p>
           </div>
          
         </div>

} 

 
  {
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
