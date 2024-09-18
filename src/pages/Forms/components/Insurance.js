import React from 'react'
import { useState } from 'react'
import DropdownMenu from '../../../formComponents/components/DropdownMenu/dropdownMenu'
import gV from '../../../gV'
import { useGlobalState } from '../../../hookState'
import PayPlans from '../../PayPlans/payPlans'
import SwiperPage from '../../Swiper/swiper'

const Insurance = () => {

    const [activeStep] = useGlobalState("activeStep")
    const [isDropdownSet] = useGlobalState("isDropdownSet")
 
 
    return (
    <section className="w-[92vw] lg:w-full animate-fadeIn flex flex-col h-[58%] pt-0 px-2 ">
        
    <header className="flex flex-col gap-2">
     <header className="gap-2 flex pb-1 items-center justify-between border-b border-dashed border-[#1a0707] ">
       <p className="text-[32px] font-bold text-pri">
         Insurance
       </p>

       <p className="text-[16px] mt-1 font-bold text-pri">
         {" "}
         Step {activeStep + 1} of 4
       </p>
     </header>

   
    </header>

   {/* What is Insurance */}
   <div className="flex flex-col gap-1 mt-0">
     <p className="text-lg text-pri font-bold mt-4">
       {" "}
       What is your insurance?
     </p>

     
     <DropdownMenu
              right={gV.mq.matches ? "110px" : "0px"}  />
    
   </div>

  <div className=" ">
  { isDropdownSet && (gV.mq.matches ?  <SwiperPage/> : <PayPlans/>) }
  </div>
   
   </section>
  )
}

export default Insurance