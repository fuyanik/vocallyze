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

     <div className={`lg:absolute lg:flex hidden   ${left}  ${top}  items-center w-[300px] h-[120px]`}>
      
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
    <div data-aos-delay="700" data-aos-duration="1100" data-aos="fade-up"   className='w-screen h-auto     gap-2 flex flex-col justify-center items-center lg:-mt-[24rem] -mt-[13.4rem] '>
       
         <div  className='bg-[#ffffff68]  lg:pb-5 pb-6   sm:w-[82%] w-[98%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white flex flex-col gap-4 sm:w-[94%] w-[96%] h-[96%]  lg:pt-8 lg:px-0  pt-3 items-center justify-center relative shadow-sm rounded-xl sm:mt-6 mt-3 '>

             <div className='lg:hidden hidden '>
              <UserPanelMobileHero/>
             </div>

          <div className='lg:flex flex items-center flex-col gap-4  font-product '> 
            <img data-aos-duration="600" data-aos="fade-up"   className='w-48 self-center ' src='https://vitamu.imgix.net/Screenshot%202024-09-01%20at%2002.41.09.png'/>
            <h1 data-aos-duration="600" data-aos="fade-up"  className='lg:text-[42px] text-[28px] self-center tracking-wide leading-[38px] text-center  text-black font-bold'>  Track the Entire Process </h1>
            <p data-aos-duration="600" data-aos="fade-up"  className=" lg:block hidden w-[90vw] lg:w-[70vw] font-product text-center  text-black">
            Keep an eye on every step of your second opinion request through your personal dashboard. It offers real-time updates <i className='text-second'>  —no need to download anything—  </i>from the submission of your medical records to the receipt of your final report, ensuring you're always informed and in control.
            </p>
            <p data-aos-duration="600" data-aos="fade-up"  className=" text-sm lg:hidden w-[90vw] lg:w-[70vw] font-product text-center  text-black">Keep an eye on every step  <i className='text-second'>  —no need to download anything—  </i> of your second opinion request through your personal dashboard. </p>
            
            <div className='lg:flex hidden items-center justify-center gap-4'>
              <div onClick={()=>{ window.scrollTo(0, 0);}} data-aos-duration="600" data-aos="fade-right" className='px-10 py-2 rounded-full bg-second self-center text-white w-fit shadow-lg cursor-pointer'> Get Started </div>
              <div  data-aos-duration="600" data-aos="fade-left" className='px-10 py-2 rounded-full text-second border border-second self-center  w-fit shadow-lg cursor-pointer'> Why Second Opinion?</div>
            </div>
          </div>
            
              <img  className='w-[90%] self-center  lg:flex  hidden object-contain 'data-aos-duration="600" data-aos="fade-up"    src='https://vitamu.imgix.net/Ads%C4%B1z%20(1920%20x%201080%20piksel)-2.png?w=4954&h=2516&rect=526%2C494%2C4954%2C2516' />
              <img  className='w-[100%]  self-center  lg:hidden flex  object-contain 'data-aos-duration="600" data-aos="fade-up"    src='https://vitamu.imgix.net/Adsız%20(1920%20x%201080%20piksel)%20Kopyası.png' />
          
              <Ping title={"Follow-up Consultations"} left={"left-[18%]"} top={"top-[55.4%]"} text={"Additional appointments are used to discuss and evaluate a patient's need for a second opinion."}  num={2}  />
              <Ping title={"How It Works"} left={"left-[51%]"} top={"top-[52.2%]"}  text={"Discover the steps involved in obtaining a second opinion and how our service guides you."}  num={1} />
              <Ping title={"Download Result"} left={"left-[82%]" } top={"top-[81.4%]"} text={"Easily access and save your second opinion report, making it simple to review and share with others."}   num={3} />
       
         </div>
        </div>
       
    </div>
  )
}

export default PanelHero
