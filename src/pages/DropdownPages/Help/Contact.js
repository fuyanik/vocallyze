import React from 'react'
import Navbar from "../../../homeComponents/1.Navbar/navbar";

import { useEffect, useRef } from 'react';
import Footer from "../../../homeComponents/11.Footer/footer";
import MobileFooter from '../../../homeComponents/22.MobileFooter/mobileFooter';
import gV from '../../../gV';

import { Helmet } from 'react-helmet';
import "../humanError.css"
import NavbarGen from '../../../homeComponents/NavbarGen/NavbarGen';
import lottie from 'lottie-web';

const Contact = () => {
  useEffect(() => {  window.scrollTo(0, 0); }, []);

  
  const logo = useRef(null)
  useEffect(() => {
     
    lottie.loadAnimation({
     container: logo.current,
     renderer: 'svg',
     loop: true,
     autoplay: true,
     animationData: require('./assets/anim6.json')
   })
   return () => { lottie.destroy() }
 },[])




  return (
      <> 


  <Helmet>
    <title>Medifyre - Contact</title>
     <meta name="description" content="Contact" />
  </Helmet>


   <NavbarGen/>

   <section className={` text-black  pb-10  h-auto   lg:w-screen w-[100vw] self-center  rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center font-product`}>
      
       
      {/*  Header */}   
       <div className={`flex flex-col gap-4 relative py-32   lg:w-[100vw]  w-[100vw] px-7 items-center justify-center  z-10 `}>
        <img      
                alt='why second opinion bg'
                className=" absolute w-[100%] rounded-sm h-full object-cover -z-10 "
                src='https://vitamu.imgix.net/Ads%C4%B1z%20tasar%C4%B1m-10.png?w=6400&h=3371&rect=0%2C0%2C6400%2C3371&auto=compress" alt="groupPng'
              />
          
            <h1 data-aos-duration="600" data-aos="fade-up"  className='lg:text-[42px] text-[32px] self-center tracking-wide leading-[38px] text-center  text-black font-bold'> Have questions? We have answers.</h1>
              <p data-aos-duration="600" data-aos="fade-up"  className="w-[90vw] lg:w-[70vw] text-center lg:text-base text-sm  text-black">
              Our team of experts is here to provide clear answers and helpful solutions to any queries you might have. 
              </p>
              
       </div>

      {/*  Main */}  
       <div className={"w-[90vw] self-center lg:flex lg:flex-row flex flex-col-reverse h-full rounded-lg bg-white shadow-xl -mt-32 z-30"}>
       
       <div className="lg:w-1/2 w-full lg:p-20 px-4 pt-4 pb-10  flex flex-col text-second lg:gap-14 gap-10">

         <h1 data-aos-duration="600" data-aos="fade-up" className="lg:flex hidden text-3xl w-full border-b border-second pb-1">We’d Love to Connect</h1>
      
      <div className="flex flex-col gap-6"> 
        <div data-aos-duration="600" data-aos="fade-up"  className="flex flex-col gap-4 "> 
         <h2 className="text-lg border-b w-fit border-second font-bold">Connect with Us via Live Chat</h2>
         <p className="text-base opacity-80">You can reach out to us anytime through the chat window located at the bottom right of the page. We're here to assist you and typically respond in less than 2 minutes.</p>
        </div>
       
        <div data-aos-duration="600" data-aos="fade-up" className="flex flex-col gap-4 "> 
         <h2 className="text-lg border-b w-fit border-second font-bold">Connect with Us via Email</h2>
         <p className="text-base opacity-80">You can also reach us by email for any inquiries or support. Simply send a message to hello@medifyre.com, and we'll respond to you promptly.</p>
         <p className="px-12 py-2 bg-second text-white rounded-full w-fit cursor-pointer"> <a className="style-none"  href="mailto:hello@medifyre.com"> <span>E-Mail Us</span> </a></p>
        </div>
       
        <div data-aos-duration="600" data-aos="fade-up" className="flex flex-col gap-4 "> 
         <h2 className="text-lg border-b w-fit border-second font-bold">Visit Us at Our Location</h2>
         <p className="text-base opacity-80">We’d love to meet you in person! You can visit us at our office located at 21 Irving Pl, New York, NY 10323. We’re here to help and welcome visitors during business hours.</p>
        </div>
    </div>
       
       </div>

      

        <div data-aos-duration="600" data-aos="fade-left" className="lg:w-1/2 w-full  ">  <div data-aos-duration="600" data-aos="fade-up" className='w-full' ref={logo} ></div></div>



       </div>

      

       </section>

     
      
       {gV.mq.matches ? <MobileFooter/> : <div><Footer/></div>} 
     
       </>
  )
}

export default Contact;