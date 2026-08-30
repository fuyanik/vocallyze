import React from 'react'
import Navbar from "../../../homeComponents/1.Navbar/navbar";

import Footer from "../../../homeComponents/11.Footer/footer";

import AccordionRecheck from './accordionRecheck';
import AccordionRedFlags from './accordionRedFlags';
import AccordionPrivacy from './accordionPrivacy';

import { useEffect } from 'react';
import gV from '../../../gV';
import MobileFooter from '../../../homeComponents/22.MobileFooter/mobileFooter';
import DropdownHeader from '../components/Header';

import { SideInformation } from '../../BiRads/biRads3';
import { Helmet } from 'react-helmet';
import NavbarGen from '../../../homeComponents/NavbarGen/NavbarGen';
import FooterGen from '../../../homeComponents/FooterGen/FooterGen';
import vocallyzeBg from '../../../assets/images/vocallyze-bg.png';

const Faq = ({isOutside = false}) => {
  useEffect(() => {  window.scrollTo(0, 0); }, []);



  return (
    <>
  


  <Helmet>
  <title>Vocallyze - FAQ</title>
   <meta name="description" content="Answers to common questions about call auditing, pricing, data residency, and KVKK compliance with Vocallyze." />
</Helmet>

 <NavbarGen/>

  
      
      <section className={` text-black  pb-10  h-auto   lg:w-screen w-[100vw] self-center  rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center font-product`}>
      
       
      {/*  Header */}   
       <div className={`flex flex-col gap-4 relative py-32   lg:w-[100vw]  w-[100vw] px-7 items-center justify-center  z-10 `}>
        <img
                alt=""
                className=" absolute w-[100%] rounded-sm h-full object-cover -z-10 "
                src={vocallyzeBg}
              />
          
            <h1 data-aos-duration="600" data-aos="fade-up"  className='lg:text-[42px] text-[32px] self-center tracking-wide leading-[38px] text-center  text-black font-bold'> Have questions? We have answers.</h1>
              <p data-aos-duration="600" data-aos="fade-up"  className="w-[90vw] lg:w-[70vw] text-center lg:text-base text-sm  text-black">
              Find answers to common questions about connecting your calls, pricing, and how Vocallyze keeps your data under your own control.
              </p>
              
       </div>

      {/*  Main */}  
       <div className={"lg:w-[90vw] w-[95vw] justify-center self-center lg:flex lg:flex-row flex flex-col-reverse  rounded-lg bg-white shadow-xl -mt-32 z-30"}>

         <div className='lg:w-[80%] w-full lg:py-10 pb-5 flex  justify-center'>
          <AccordionRecheck/>
          </div>
       
      



       </div>

      

       </section>

      <FooterGen/> 




    </>
  );
}


export default  Faq;