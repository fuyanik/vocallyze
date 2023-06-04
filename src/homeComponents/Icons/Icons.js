import React from "react";
import "../../style/index.css";

const Icons = () => {

   const icons = [
    {  
        id:1,
        img:"https://img.icons8.com/ios/50/142b6f/delivery-time--v1.png",
        text:"Results in 24 hours"
    },
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
        text:"Major insurance plans accepted"
    },
    {
        id:5,
        img:"https://img.icons8.com/pastel-glyph/64/142b6f/internet.png",
        text:"Fully online process"
    },
   ]

   

   




  return (

    <div className="text-[#142b6f] mt-10 gap-6 font-product self-center items-center justify-center flex flex-col ">

      <p className="text-[32px]">A hassle-free experience, centered around you.</p>
   
      <div className=" flex gap-12 self-center ">
        
        {icons.map((company,idx) => (
          <div key={idx} className="flex  w-[138px] flex-col gap-2  items-center">
          <img
            className="w-7"
            src={company.img}
          />
          <p className="text-center">{company.text}</p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Icons;
