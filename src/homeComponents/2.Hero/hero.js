import "./style/hero.css";
import React, { useEffect } from "react";
import PrimaryButton from "../microComponents/primaryButton/primaryButton";
import gV from "../../gV"
import { useState } from "react";
import BiRadsDropdown from "../BiRadsDropdown/biRadsDropdown";
import { Link } from "react-router-dom";
import SelectBodyParts from "../../pages/Forms/components/selectBodyParts";
import ScanType from "../../pages/Forms/components/selectScan";
import IconsMobile from "../Icons/Icons_mobile";




const Hero = () => {



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
      <div className="w-screen h-[106vh] relative text-[#142b6f] font-product tracking-wide  flex flex-col items-center px-[4vw]   ">
      
      <img src="https://vitamu.imgix.net/codioful-formerly-gradienta-rKv4HduvzIE-unsplash.jpg" className="w-screen h-full absolute -z-20 opacity-20"  alt="vitamu"/>
        
       
       
        <div className="flex  mt-20 flex-col gap-8 items-center text-center">
         
         <p className=" text-[36px] text-center leading-[42px] font-bold ">Get your online mammogram second opinion </p>
         <p>Radiology second opinions from U.S. board-certified radiologists. Results in 24 hours.</p>
   
        <div className="flex flex-col gap-3">
          <SelectBodyParts/>
          <ScanType/>
         <div className=" flex items-center justify-center  bg-[#ff4949]  hover:bg-[#ff595990] duration-300 cursor-pointer text-white  w-[320px] h-[48px]  rounded-3xl">Get Started</div>
        </div>

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
      </div>

        
        

     
       </div>
       
      </div>
    </>
  );
};

export default Hero;
