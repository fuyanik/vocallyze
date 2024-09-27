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
       <p className="lg:text-[32px] text-[22px] font-bold text-pri">
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
  { isDropdownSet && (gV.mq.matches ? <div className='relative right-[23px] iphone7:mt-0 mt-10' > <SwiperPage/> </div>  : <PayPlans/>) }
  </div>

   { !isDropdownSet &&
    <div className='w-full h-full lg:mt-2 flex items-center lg:justify-start justify-start'> 

    <img className='w-[90%] lg:w-[85%] lg:mt-4 mt-0 rounded-lg ' src='https://vitamu.imgix.net/22HRS%20(1920%20x%201080%20piksel)-2-min.png?w=7680&h=4320&ar=7680%3A4320&auto=compress' alt='monthly numbers'/>
    
    </div>}
   
   </section>
  )
}

export default Insurance