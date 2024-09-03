import React, { useState } from 'react'
import Logos from '../3.Logos/logos'
import UserPanelMobileHero from '../../pages/UserPanel/UserPanelMobileHero'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const PanelHero = () => {

  const [showNum, setShowNum] = useState(0)

  const Ping = ({title,left,top,num,text}) => {
    return (
    <>

     <div className={`lg:absolute  hidden ${left}  ${top}  items-center w-[300px] h-[120px]`}>
      
        {/* Explanation Area */} 
         <div className={` font-product text-slate-50 px-4 py-2 font-extralight flex flex-col   absolute lg:w-[245px]  lg:h-[120px] w-[235px] h-[120px] lg:ml-[5vw] lg:bottom-4  ml-[16vw] rounded-2xl bg-black/80 backdrop-filter backdrop-blur-md  ${showNum == num ?  "animate-fadeIn" : "hidden" }` }>
          <div className='flex justify-between items-center pb-1 w-full border-b border-dashed border-gray-400'>
            <p className=''>{title}</p>
            <p  className='hover:bg-white hidden hover:border-[#000000] hover:text-[#000000]  h-6 px-4 pb-1 items-center justify-center border border-[#fff] rounded-md'>x</p>
          </div>
          
          <p className='text-[13px] mt-2'>{text} </p>
        
         </div>
      
         {/* Ping */}
         <div onClick={()=>{setShowNum(num)}}>
          <span  class="relative flex h-11 w-11">
            <span  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-second "></span>
            <span class=" h-11 w-11 relative inline-flex items-center justify-center rounded-full  bg-black  pb-1 pl-[1px] cursor-pointer hover:rotate-90  duration-700 "  onMouseLeave={()=>{setShowNum(0)}} onMouseMove={()=>{setShowNum(num)} }  >
              <p className="text-[#fff] text-[28px] "> + </p>
            </span>
          </span>
        </div>
     </div>
    </>
    )
  }

  AOS.init();
  return (
    <div data-aos-delay="700" data-aos-duration="1100" data-aos="fade-up"   className='w-screen h-auto     gap-2 flex flex-col justify-center items-center lg:-mt-[22rem] -mt-[13.4rem] '>
       
         <div className='bg-[#ffffff68]  lg:pb-5 pb-0   sm:w-[82%] w-[93%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white relative shadow-sm w-[94%] h-[96%] rounded-xl sm:mt-6 mt-3 '>

             <div className='lg:hidden flex '>
              <UserPanelMobileHero/>
             </div>
             <img   src='https://vitamu.imgix.net/upscale%20tasar%C4%B1m-13.png?w=6400&h=3959&ar=6400%3A3959&auto=compress' className='w-full lg:flex hidden h-full object-contain '/>
          
              <Ping title={"Follow-up Consultations"} left={"left-[30%]"} top={"top-[25.4%]"} text={"Additional appointments are used to discuss and evaluate a patient's need for a second opinion."}  num={2}  />
              <Ping title={"How It Works"} left={"left-[51%]"} top={"top-[52.2%]"}  text={"Discover the steps involved in obtaining a second opinion and how our service guides you."}  num={1} />
              <Ping title={"Download Result"} left={"left-[32%]" } top={"top-[85.4%]"} text={"Easily access and save your second opinion report, making it simple to review and share with others."}   num={3} />
       
         </div>
        </div>
       
    </div>
  )
}

export default PanelHero
