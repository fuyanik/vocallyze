import * as React from "react";
import { useState } from "react";
import gV from "../../../gV";


const names = [
  "Brain/Head",
  "Lumbar ",
  "Knee ",
  "Shoulder ",
  "Cervical ",
  "Thoracic ",
  "Hip",
  "Wrist" ,
  "Foot",
  "Hand",
  "Chest",
  "Abdomen",
  "Pelvis",
  "Neck",
  "Shoulder",
  "Arm",
  "Forearm",
  "Wrist",
  "Hand",
  "Thigh",
  "Knee",
  "Ankle",
  "Foot",
  "Spine",
 
 

];



export default function SelectBodyParts() {

  const [isDropdown, setDropdown] = useState(false)
  const [bodyParts, setBodyParts] = useState([])




  return (
   

           
         
           
           
           <div className={` ${gV.mq.matches ?  "w-[77vw] h-auto gap-4 lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer" :  "relative flex items-center px-5 w-[44%] h-auto  border-[#142b6f] rounded-tl-[44px] rounded-bl-[44px] bg-slate-200" }`}>
           
     
             <div
               onClick={() => {
                 setDropdown(!isDropdown);
               }}
               className="h-auto py-3 w-[120%]  relative text-pri flex-wrap  gap-2 bg-slate-200 flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
             >
                {/* Default Place Holder */}
                <div className="flex gap-2 h-8 items-center justify-center">
               <img width="20" height="20" src="https://img.icons8.com/ios-filled/70/ff4949/search--v1.png" alt="search--v1"/>

                  { bodyParts.length == 0 && <p className="font-bold lg:font-normal">Body Part(s)</p>}
                </div>

                {/* All User Selected Body Parts */}
                {bodyParts.map((bodyPart, idx) => (
                 <div className="flex gap-1 items-center justify-between bg-pri text-white px-3 py-[6px] rounded-2xl animate-fadeIn ">
                   <p className="text-[12px] tracking-wider "> {bodyPart} </p>
                   <p onClick={()=>{ setBodyParts(prevBodyParts => prevBodyParts.filter(part => part !== bodyPart)); setDropdown(false)}} className="text-[11px] font-bold relative left-1">X</p>
                 </div>
                ))}


               <img  className={`absolute   right-6 lg:right-4 text-[13px] ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/142b6f/collapse-arrow.png" alt="collapse-arrow"/>
             </div>
             
            {/* Dropdown White Area */}
            { isDropdown && 
            
               <div className="absolute z-40 flex flex-col gap-3 items-start py-2  text-pri w-full h-48 lg:right-0 overflow-y-scroll bg-white top-[9vh] animate-fadeIn rounded-2xl shadow-xl">
               {names.map((name, idx) => (
                  <p 
                  className={` ${bodyParts.includes(name) && "border-l-[3px] border-pri" } py-[3px] px-3   w-full text-left `}
                  onClick={()=>{setDropdown(false); !bodyParts.includes(name) && setBodyParts(prevBodyParts => [...prevBodyParts, name]); gV.bodyParts.push(name)  }  }>
                    
                    {name}
                 
                  </p>
               ))}
               
               </div>}


         
           </div>
         
        

  );
}
