import React from 'react'

import {Link, useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import PrimaryButton from "../microComponents/primaryButton/primaryButton";


import { RiFacebookFill } from "react-icons/ri";
import {AiOutlineInstagram} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {RiLinkedinFill} from "react-icons/ri";
import gV from "../../gV";
import { getNavbarContent } from "../../admino/content";
import footerWaveDesktop from "../../assets/images/footer-wave-desktop.png";
import footerWaveMobile from "../../assets/images/footer-wave-mobile.png";
import logoWhite from "../../assets/images/logos-white.png";

// same wave PNGs, used purely as an alpha mask so the flat single-color
// fill can become a subtle brand-blue gradient instead — dark end sits
// under the logo/text column (bottom-left) for contrast, and only a
// faint lighter-blue tint (no real white) shows near the empty arch peak.
const waveGradient = "linear-gradient(50deg, #01526f 0%, #00688F 60%, #0180ad 90%, #bfe0f5 100%)";
const waveMaskStyle = (src) => ({
    background: waveGradient,
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
});

const FooterGen = () => {

    const navigate = useNavigate();
    const nav = getNavbarContent();
  
  
    return (
    <div className='w-screen flex items-end h-[570px] relative  -mt-20  font-product   '>
       
         <div className='w-full lg:flex hidden absolute  h-full ' style={waveMaskStyle(footerWaveDesktop)}/>
         <div className='w-full lg:hidden flex absolute  h-full ' style={waveMaskStyle(footerWaveMobile)}/>
          
          <div className='w-full flex lg:h-[80%]  z-30 lg:pl-40 lg:pr-20 pl-0 pr-0 lg:pb-0 pb-16  '>  
          
             <div className='lg:w-[50%] w-full flex flex-col lg:gap-6 gap-4 h-full lg:pt-16 pt-0 px-8   '>
              <img className='w-40'  src={logoWhite} alt='vocallyze logo'/>
              <p className='text-white  cursor-pointer'>Terms of Service · Privacy Policy</p>

                 <div className="flex relative text-sm font-product">
                   <motion.button
                     onClick={() => navigate("/form-new")}
                     whileHover={{ scale: 1.03, boxShadow: "0 6px 20px rgba(255,255,255,0.45)" }}
                     whileTap={{ scale: 0.97 }}
                     style={{
                       width: 154,
                       height: 36,
                       flexShrink: 0,
                       background: "linear-gradient(135deg, #ffffff 0%, #eaf4fb 100%)",
                       boxShadow: "0 4px 14px rgba(255,255,255,0.3), inset 0 1px 0 rgba(255,255,255,0.6)",
                     }}
                     className="relative flex min-w-0 cursor-pointer items-center overflow-hidden rounded-full select-none px-1.5"
                   >
                     <div className="relative z-10 flex-1 overflow-hidden whitespace-nowrap text-center text-[9.5px] font-bold uppercase tracking-wide text-second" style={{ minWidth: 0 }}>
                       {nav.waitlistCta}
                     </div>
                     <div className="relative z-10 ml-auto h-7 w-7 shrink-0 rounded-full bg-second/10 flex items-center justify-center">
                       <svg className="h-3.5 w-3.5 text-second" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                         <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                         <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                       </svg>
                     </div>
                   </motion.button>
                 </div>

              <p className='text-white opacity-75 text-sm lg:w-[70%] w-full'>Sample reports shown on this site are illustrative and do not reflect an actual customer's calls or data. Every live audit runs entirely on your own institution's infrastructure.</p>
              <p className='text-white'>Vocallyze© 2026 All Rights Reserved</p>
             </div>








             <div className='w-[50%]  lg:flex hidden  pb-7 h-[70%] self-end text-white   items-center px-10'>
              
             <div className='flex flex-col gap-10 w-full  '> 
             
               <div className='flex flex-col'>
                <h1 className=' w-full text-lg font-bold  ' >About</h1>
                <div className='flex flex-wrap gap-5 mt-2'>
                
                 <Link to="/sample-reports">  <div className='flex gap-1 items-center justify-center hover:opacity-60 duration-500 cursor-pointer'> <p>•</p> <p> Sample Audit Reports</p> </div> </Link> 
                 <Link to="/why-second-opinion"> <div className='flex gap-1 items-center justify-center hover:opacity-60 duration-500 cursor-pointer'> <p>•</p> <p>Why Audit Calls</p> </div> </Link> 
                 <Link to="/how-works"> <div className='flex gap-1 items-center justify-center hover:opacity-60 duration-500 cursor-pointer'> <p>•</p> <p>How It Works</p> </div>  </Link> 
                 <Link to="/contact"><div className='flex gap-1 items-center justify-center hover:opacity-60 duration-500 cursor-pointer'> <p>•</p><p>Contact</p> </div>  </Link> 
                 <Link to="/faq"><div className='flex gap-1 items-center justify-center hover:opacity-60 duration-500 cursor-pointer'> <p>•</p><p>FAQ</p> </div> </Link> 
              
                </div>

               </div>
             
             
              </div>
             
            
             </div>
             

          </div>
      


       
    </div>
  )
}

export default FooterGen
