import { getValue } from "@testing-library/user-event/dist/utils";
import * as React from "react";
import { useState, useEffect } from "react";
import gV from "../../../gV";
import { setGlobalState } from "../../../hookState";


const names = [
 "Mammogram",
  "MRI",
  "CT Scan",
  "Ultrasound",
  "X-Ray",


];



export default function SelectScan() {

  const [isDropdown, setDropdown] = useState(false)
  const [scanType, setScanType] = useState([])




  


  return (
   
 
           
         
     
    <div className={` ${gV.mq.matches ?  "w-[77vw] h-auto gap-4 lg:h-[6vh] rounded-full flex items-center relative cursor-pointer bg-[#f2f2f2] " :  " relative flex items-center px-5 w-[32%] h-full  border border-black" } z-0`}>
           
     
             <div
               onClick={() => {
                 setDropdown(!isDropdown);
               }}
               className="h-auto py-3 w-[190%] lg:w-[95%] relative text-pri flex-wrap  gap-2  flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
             >
                 {/* Default Place Holder */}
                 <div className="flex gap-2 h-8 items-center justify-center">
                 <img width="20" height="20" src="https://img.icons8.com/ios-filled/70/ff4949/search--v1.png" alt="search--v1"/>
                  { scanType.length == 0 && <p className="font-bold lg:font-normal">Scan Type(s)</p>}
                </div>

                {/* All User Selected Body Parts */}
                {scanType.map((bodyPart, idx) => (
                 <div className="flex gap-1 items-center justify-between bg-pri text-white px-3 py-[6px] rounded-2xl animate-fadeIn ">
                   <p className="text-[12px] tracking-wider "> {bodyPart} </p>
                   <p onClick={()=>{ setScanType(prevBodyParts => prevBodyParts.filter(part => part !== bodyPart) );  setDropdown(false)}} className="text-[11px] font-bold relative left-1">X</p>
                 </div>
                ))}

              
              
               <img  className={`absolute   right-6 text-[13px] ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" alt="collapse-arrow"/>
             </div>
             
            {/* Dropdown White Area */}
            { isDropdown && 
            
               <div className="absolute z-40  flex flex-col gap-3 items-start py-2  text-pri w-full h-auto overflow-y-auto top-16 lg:top-[9vh] animate-fadeIn rounded-2xl shadow-xl bg-white ">
               {names.map((name, idx) => (
                  <p 
                  className={` ${scanType.includes(name) && "border-l-[3px] border-pri" } py-[3px] px-3  w-full text-left  `}
                  onClick={()=>{setDropdown(false); !scanType.includes(name) && setScanType(prevBodyParts => [...prevBodyParts, name]); gV.scanType.push(name)  }  }>
                    
                    {name}
                 
                  </p>
               ))}
               
               </div>}


         
           </div>
         
          

  );
}
