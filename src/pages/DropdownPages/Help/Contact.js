import React from 'react'

import { useEffect, useRef } from 'react';

import { Helmet } from 'react-helmet';
import "../humanError.css"
import Navbar from '../../../admino/Navbar';
import lottie from 'lottie-web';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FooterGen from '../../../homeComponents/FooterGen/FooterGen';
import vocallyzeBg from '../../../assets/images/vocallyze-bg.png';

const Contact = () => {
  AOS.init();

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
    <title>Vocallyze - Contact</title>
     <meta name="description" content="Contact the Vocallyze team for questions about call auditing and compliance." />
  </Helmet>


   <Navbar/>

   <section className={` text-black  pb-10  h-auto   lg:w-screen w-[100vw] self-center  rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center font-product`}>
      
       
      {/*  Header */}   
       <div className={`flex flex-col gap-4 relative py-32   lg:w-[100vw]  w-[100vw] px-7 items-center justify-center  z-10 `}>
        <img      
                alt=''
                className=" absolute w-[100%] rounded-sm h-full object-cover -z-10 "
                src={vocallyzeBg}
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
        <div data-aos-duration="600" data-aos="fade-up"  className=" flex-col gap-4  hidden"> 
         <h2 className="text-lg border-b w-fit border-second font-bold">Connect with Us via Live Chat</h2>
         <p className="text-base opacity-80">You can reach out to us anytime through the chat window located at the bottom right of the page. We're here to assist you and typically respond in less than 2 minutes.</p>
        </div>
       
        <div data-aos-duration="600" data-aos="fade-up" className="flex flex-col gap-4 "> 
         <h2 className="text-lg border-b w-fit border-second font-bold">Connect with Us via Email</h2>
         <p className="text-base opacity-80">You can also reach us by email for any inquiries or support. Simply send a message to info@vocallyze.com, and we'll respond to you promptly.</p>
         <p className="px-12 py-2 bg-second text-white rounded-full w-fit cursor-pointer"> <a className="style-none"  href="mailto:info@vocallyze.com"> <span>E-Mail Us</span> </a></p>
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

     
      
         <FooterGen/> 
     
       </>
  )
}

export default Contact;