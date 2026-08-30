import React from 'react'
import { useState } from 'react'
import { MdArrowDropDown } from "react-icons/md";
import "../../../formComponents/components/DropdownMenu/dropdownMenu.css"
import gV from '../../../gV'
import { setGlobalState, useGlobalState } from '../../../hookState'
import PayPlans from '../../PayPlans/payPlans'
import SwiperPage from '../../Swiper/swiper'
import trackWeb from '../../../assets/images/track-web.png'
import StepHeader from './StepHeader'

const callVolumeOptions = [
    "Up to 1,000 calls / month",
    "1,000 - 5,000 calls / month",
    "5,000 - 20,000 calls / month",
    "20,000+ calls / month",
    "Not sure yet",
]

const Insurance = () => {

    const [activeStep] = useGlobalState("activeStep")
    const [isDropdownSet] = useGlobalState("isDropdownSet")

    const [isActive, setIsActive] = useState(false);
    const [selected, setIsSelected] = useState("Choose one");

    return (
    <section className="w-[92vw] lg:w-full animate-fadeIn flex flex-col h-[58%] pt-0 px-2 ">

    <header className="flex flex-col gap-2">
     <StepHeader title="Call Volume" step={activeStep + 1} />
    </header>

   {/* What is your monthly call volume */}
   <div className="flex flex-col gap-1 mt-0">
     <p className="text-lg text-pri font-bold mt-4">
       {" "}
       What is your expected monthly call volume?
     </p>

     <div className="dropdown bg-slate-100 rounded-full -z-10" style={{
        top: undefined,
        marginRight: gV.mq.matches ? "110px" : "0px",
     }}>

       <div
         onClick={() => setIsActive(!isActive)}
         className="dropdown-btn">

         {selected}
        <MdArrowDropDown className="down-button"/>
       </div>

       <div
         className="dropdown-content duration-500"
         style={{ display: isActive ? "block" : "none" }}
       >

       {callVolumeOptions.map((option, idx) => (

            <div
            key={idx}
            className="item duration-500"
            onClick={(e) => {

              gV.mq.matches && setGlobalState("isDropdownSet", true);

              setIsSelected(e.target.textContent);
              gV.callVolume = e.target.textContent;

              setGlobalState("callVolume", e.target.textContent);
              setIsActive(!isActive); }}

              >
            {option}
            </div>

                   ))}

       </div>
     </div>

   </div>

  <div className=" ">
  { isDropdownSet && (gV.mq.matches ? <div className='relative right-[23px] iphone7:mt-0 mt-10' > <SwiperPage/> </div>  : <PayPlans/>) }
  </div>

    { !isDropdownSet &&
    <div className='w-full h-full lg:mt-2 flex items-center lg:justify-start justify-start'>

    <img className='w-[90%] lg:w-[85%] lg:mt-4 mt-0 rounded-lg lg:flex hidden ' src={trackWeb} alt='call volume overview'/>

    </div>}

   </section>
  )
}

export default Insurance
