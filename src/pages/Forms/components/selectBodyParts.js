import * as React from "react";
import { useState } from "react";
import gV from "../../../gV";


const names = [
  "Abdomen",
  "Adrenal Glands",
  "Angiography",
  "Biliary System",
  "Bone",
  "Brain & Head",
  "Breast",
  "Calf",
  "Cardiac",
  "Cervical Spine",
  "Chest (Thorax)",
  "Coccyx",
  "Ear",
  "Elbow",
  "Female Genitalia (Ovaries, endometrium, uterus, cervix)",
  "Foot and Ankle",
  "Full Body Scan",
  "Gall Bladder",
  "Hand",
  "Hip",
  "Kidney",
  "Knee",
  "Large Bowel",
  "Liver",
  "Lumbar Spine",
  "MRCP",
  "Male Genitalia(Testicles)",
  "Neck",
  "Orbits",
  "Pancreas",
  "Paranasal",
  "Pelvis",
  "Perianal",
  "Pituitary Gland",
  "Prostate",
  "Shoulder",
  "Small Bowel",
  "Temporomandibular Joints",
  "Thyroid Gland",
  "Urinary System",
  "Wrist"
];





export default function SelectBodyParts({isOutside = false}) {

  const [isDropdown, setDropdown] = useState(false)
  const [bodyParts, setBodyParts] = useState([])




  return (
   

           
         
           
           
           <>
            { !isOutside ? 
            
            <div className={` ${gV.mq.matches ?  "w-[77vw] h-auto gap-4 lg:h-[6vh] rounded-full flex items-center relative cursor-pointer bg-slate-50" :   "relative bg-slate-50 flex items-center px-5 w-[44%] h-auto   rounded-tl-[44px] rounded-bl-[44px]  border border-second" }`}>
            
            
              <div
                onClick={() => {
                  setDropdown(!isDropdown);
                }}
                className="h-auto py-3 w-[120%]   relative text-pri flex-wrap  gap-2 flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
              >
                 {/* Default Place Holder */}
                 <div className="flex gap-2 h-8 items-center justify-center">
                <img width="20" height="20" src="https://img.icons8.com/ios-filled/70/00688F/search--v1.png" alt="search--v1"/>
            
                   { bodyParts.length == 0 && <p className="font-bold lg:font-normal">Body Part(s)</p>}
                 </div>
            
                 {/* All User Selected Body Parts */}
                 {bodyParts.map((bodyPart, idx) => (
                  <div className="flex gap-1 items-center justify-between bg-pri text-white px-3 py-[6px] rounded-2xl animate-fadeIn ">
                    <p className="text-[12px] tracking-wider "> {bodyPart} </p>
                    <p onClick={()=>{ setBodyParts(prevBodyParts => prevBodyParts.filter(part => part !== bodyPart)); setDropdown(false)}} className="text-[11px] font-bold relative left-1">X</p>
                  </div>
                 ))}
            
            
                <img  className={`absolute   right-6 lg:right-4 text-[13px] ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" alt="collapse-arrow"/>
              </div>
              
             {/* Dropdown White Area */}
             { isDropdown && 
             
                <div className="absolute z-40 flex flex-col gap-3 items-start py-2 lg:px-12 px-8  text-pri w-full h-48 lg:right-0 overflow-y-scroll bg-white top-[9vh] animate-fadeIn rounded-[30px] shadow-xl">
                {names.map((name, idx) => (
                   <p 
                   className={` ${bodyParts.includes(name) && "border-l-[3px] border-second" } py-[3px] px-3   w-full text-left `}
                   onClick={()=>{setDropdown(false); !bodyParts.includes(name) && setBodyParts(prevBodyParts => [...prevBodyParts, name]); gV.bodyParts.push(name)  }  }>
                     
                     {name}
                  
                   </p>
                ))}
                
                </div>}
            
            
            
            </div> 


           :

           <div className={` ${true ?  "w-[77vw] lg:w-[21vw] h-auto gap-4 lg:h-[6vh] rounded-full flex items-center relative cursor-pointer bg-[#f2f2f2]" :  "relative flex items-center px-5 w-[44%] h-auto   rounded-tl-[44px] rounded-bl-[44px]  border border-second" }`}>
            
            
           <div
             onClick={() => {
               setDropdown(!isDropdown);
             }}
             className="h-auto py-3 w-[120%]  relative text-pri flex-wrap  gap-2 flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
           >
              {/* Default Place Holder */}
              <div className="flex gap-2 h-8 items-center justify-center">
             <img width="20" height="20" src="https://img.icons8.com/ios-filled/70/00688F/search--v1.png" alt="search--v1"/>
         
                { bodyParts.length == 0 && <p className="font-normal lg:font-normal">Body Part(s)</p>}
              </div>
         
              {/* All User Selected Body Parts */}
              {bodyParts.map((bodyPart, idx) => (
               <div className="flex gap-1 items-center justify-between bg-pri text-white px-3 py-[6px] rounded-2xl animate-fadeIn ">
                 <p className="text-[12px] tracking-wider "> {bodyPart} </p>
                 <p onClick={()=>{ setBodyParts(prevBodyParts => prevBodyParts.filter(part => part !== bodyPart)); setDropdown(false)}} className="text-[11px] font-bold relative left-1">X</p>
               </div>
              ))}
         
             <img  className={`absolute   right-6 lg:right-4 text-[13px] ${!isDropdown ? "rotate-180" : "rotate-270 "} duration-500`} width="18" height="18" src="https://img.icons8.com/ios-filled/50/000000/collapse-arrow.png" alt="collapse-arrow"/>
         
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
            
          
          }
           </>
         
        

  );
}
