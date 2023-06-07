import * as React from "react";
import { useState } from "react";


const names = [
 "Brain/Head",
 "Lumbar Spine",
 "Knee - Right",
  "Knee - Left",
  "Shoulder - Right",
  "Shoulder - Left",
  "Cervical Spine",
  "Thoracic Spine",
  "Lumbar Spine",
  "Hip - Right",
  "Hip - Left",
  "Elbow - Right",
  "Elbow - Left",
  "Wrist - Right",
  "Wrist - Left",
  "Ankle - Right",
  "Ankle - Left",
  "Foot - Right",
  "Foot - Left",
  "Hand - Right",
  "Hand - Left",
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
  "Lower Leg",
  "Ankle",
  "Foot",
  "Spine",
 
  "Lumbar Spine",
  "Sacrum",
  "Coccyx",
  "Hip",

];



export default function SelectScan() {

  const [isDropdown, setDropdown] = useState(false)
  const [dropdownText, setDropdownText] = useState("Choose your answer.")

  return (

    <div className="flex flex-col gap-3 z-0">
           
         
     
           <div className="  lg:w-[16vw] w-[77vw] h-[7.4vh] gap-4 lg:h-[6vh] rounded-2xl flex items-center relative cursor-pointer">
           
     
             <div
               onClick={() => {
                 setDropdown(!isDropdown);
               }}
               className="h-[96%] w-[120%] text-[#142b6f] justify-between bg-white flex items-center px-4 rounded-full z-10 duration-200 ease-in-out "
             >
               <p className="font-bold"> Scan Type</p>
               <p >{"v"}</p>
             </div>

            { isDropdown && 
               <div className="absolute z-90 flex flex-col justify-around  text-[#142b6f] w-full h-[20vh] bg-white top-[8vh] animate-fadeIn rounded-3xl shadow-xl">
                   <p onClick={()=>{setDropdownText("I can upload the images now or later."); setDropdown(false)}} className="border-b px-5 py-1 ">I can upload the images now or later.</p>
                   <p onClick={()=>{setDropdownText("I prefer to ship the CD or USB stick."); setDropdown(false)}} className="border-b px-5 py-1 ">I prefer to ship the CD or USB stick.</p>
                   <p onClick={()=>{setDropdownText("I will share an access code."); setDropdown(false)}} className="border-b px-5 py-1 ">I will share an access code. </p>
                   <p onClick={()=>{setDropdownText("I authorize you to acquire my images."); setDropdown(false)}} className="px-5 py-1 ">I authorize you to acquire my images.</p>
               
               </div>}


         
           </div>
          </div>

  );
}
