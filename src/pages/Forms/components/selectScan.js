import * as React from "react";
import { useState } from "react";


const names = [
 "Mammogram",
  "MRI",
  "CT Scan",
  "Ultrasound",
  "X-Ray",


];



export default function SelectScan() {

  const [isDropdown, setDropdown] = useState(false)

   const[bodyParts, setBodyParts] = useState([])
  



  return (
   
    <div className="flex flex-col gap-3 ">
           
         
     
           <div className="  lg:w-[16vw] w-[77vw] h-auto gap-4 lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
           
     
             <div
               onClick={() => {
                 setDropdown(!isDropdown);
               }}
               className="h-auto py-3 w-[120%] relative text-[#142b6f] flex-wrap  gap-2 bg-white flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
             >
                {/* Default Place Holder */}
                { bodyParts.length == 0 && <p className="font-bold">Scan Type</p>}

                {/* All User Selected Body Parts */}
                {bodyParts.map((bodyPart, idx) => (
                 <div className="flex gap-1 items-center justify-between bg-[#142b6f] text-white px-3 py-[6px] rounded-2xl animate-fadeIn ">
                   <p className="text-[12px] tracking-wider "> {bodyPart} </p>
                   <p onClick={()=>{ setBodyParts(prevBodyParts => prevBodyParts.filter(part => part !== bodyPart)); setDropdown(false)}} className="text-[11px] font-bold relative left-1">X</p>
                 </div>
                ))}

              
              
               <p className={`absolute right-4 text-[13px] ${isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} >{"▼"}</p>
             </div>
             
            {/* Dropdown White Area */}
            { isDropdown && 
            
               <div className="absolute z-40 flex flex-col gap-3 items-start py-2  text-[#142b6f] w-full h-[30vh] overflow-y-auto bg-white top-[9vh] animate-fadeIn rounded-2xl shadow-xl">
               {names.map((name, idx) => (
                  <p 
                  className={` ${bodyParts.includes(name) && "border-l-[3px] border-[#142b6f]" } py-[3px] px-3  `}
                  onClick={()=>{setDropdown(false); !bodyParts.includes(name) && setBodyParts(prevBodyParts => [...prevBodyParts, name]);  }  }>
                    
                    {name}
                 
                  </p>
               ))}
               
               </div>}


         
           </div>
         
          </div>

  );
}
