import React, { useState } from 'react'
import Logos from '../3.Logos/logos'
import UserPanelMobileHero from '../../pages/UserPanel/UserPanelMobileHero'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import trackWeb from '../../assets/images/track-web.png'
import trackMobile from '../../assets/images/track-mobile.png'

const PanelHero = () => {

  const [showNum, setShowNum] = useState(0)

  const Ping = ({title,left,top,num,text}) => {
    return (
    <>

     <div  className={`lg:absolute lg:flex hidden   ${left}  ${top}   items-center w-[300px] h-[120px]`}>
      
        {/* Explanation Area */} 
         <div onMouseMove={()=>{setShowNum(num)}} className={`z-20 font-product absolute lg:w-[250px] w-[235px] lg:ml-[5vw] lg:bottom-4 ml-[16vw] overflow-hidden rounded-2xl border border-white/15 shadow-[0_16px_44px_rgba(0,16,26,0.4)] backdrop-blur-xl transition-opacity duration-300 ${showNum == num ? "animate-fadeIn" : "hidden"}`} style={{ background: "linear-gradient(155deg, rgba(6,20,28,0.92) 0%, rgba(0,104,143,0.62) 100%)" }}>
          <div className='absolute inset-x-0 top-0 h-[2px]' style={{ background: "linear-gradient(90deg, #93CEF9, #00688F)" }}></div>

          <div className='flex items-center justify-between gap-2 px-4 pt-3.5 pb-2.5 border-b border-white/10'>
            <div className='flex items-center gap-2.5 min-w-0'>
              <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white' style={{ background: "linear-gradient(135deg, #93CEF9 0%, #00688F 100%)" }}>
                {String(num).padStart(2, "0")}
              </span>
              <p className='truncate text-[13.5px] font-semibold text-white'>{title}</p>
            </div>
            <button type='button' onClick={(e)=>{e.stopPropagation(); setShowNum(0)}} aria-label='Close' className='flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/15 hover:text-white'>
              <svg width='9' height='9' viewBox='0 0 10 10' fill='none' stroke='currentColor' strokeWidth='1.6' strokeLinecap='round'><path d='M1 1l8 8M9 1L1 9'/></svg>
            </button>
          </div>

          <p className='px-4 py-3 text-[12.5px] font-light leading-relaxed text-white/80'>{text}</p>
         </div>
      
         {/* Ping */}
         <div  onClick={()=>{setShowNum(num)}}>
          <span  class="relative flex h-11 w-11">
            <span  class="animate-ping absolute inline-flex h-full w-full rounded-full bg-prim "></span>
            <span class=" h-11 w-11 relative inline-flex items-center justify-center rounded-full  bg-second  pb-1 pl-[1px] cursor-pointer hover:rotate-90  duration-700 "  onMouseLeave={()=>{setShowNum(0)}} onMouseMove={()=>{setShowNum(num)} }  >
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
    <div data-aos-delay="700" data-aos-duration="1100" data-aos="fade-up"   className='w-screen h-auto     gap-2 flex flex-col justify-center items-center lg:-mt-[23rem] -mt-[13.4rem] '>
       
         <div  className='bg-[#ffffff68]  lg:pb-5 pb-6   sm:w-[82%] w-[98%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white flex flex-col sm:w-[94%] w-[96%] h-[96%] lg:px-0 items-center justify-center relative shadow-sm rounded-xl sm:mt-6 mt-3 overflow-visible'>

             <div className='lg:hidden hidden '>
              <UserPanelMobileHero/>
             </div>

              <img className='w-full self-center lg:flex hidden object-contain' data-aos-duration="1200" data-aos="fade-up" src={trackWeb} alt='tracking your process' />
              <img className='w-[106%] max-w-none self-center lg:hidden flex object-contain' data-aos-duration="1200" data-aos="fade-up" src={trackMobile} alt='tracking your process' />
          
              <Ping title={"Weekly Trend"} left={"left-[25%]"} top={"top-[41.9%]"} text={"See how each team's quality score moves week over week, so coaching decisions are backed by data, not guesswork."}  num={1}  />
              <Ping title={"Quality Scores"} left={"left-[45%]"} top={"top-[24.3%]"}  text={"Every team gets a live quality score — updated automatically as their calls are transcribed and audited."}  num={2} />
              <Ping title={"Violation Tracking"} left={"left-[68%]" } top={"top-[15.9%]"} text={"Calls are checked against your rulebook automatically, flagging violations the moment they happen — no manual sampling required."} num={3} />
              <Ping title={"Call Volume"} left={"left-[83.5%]"} top={"top-[43.9%]"} text={"Track daily call volume and see at a glance how much has been reviewed vs. escalated."} num={4} />
       
         </div>
        </div>
       
    </div>
  )
}

export default PanelHero
