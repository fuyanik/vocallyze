import React, { useEffect, useRef, useState } from 'react'
import gV from '../../gV'
import Navbar from '../../admino/Navbar'
import { Helmet } from 'react-helmet'
import { useSpring, animated } from 'react-spring';
import lottie from 'lottie-web';
import AOS from 'aos';
import 'aos/dist/aos.css';
import FooterGen from '../../homeComponents/FooterGen/FooterGen'
import vocallyzeBg from '../../assets/images/vocallyze-bg.png'

const WhySecondOpinion = ({isOutside = false}) => {

  AOS.init();

  const logo = useRef(null)

  !isOutside && window.scrollTo(0, 0);



  const DonutChart = ({ perc, bg, bgTrans }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
  
    // Intersection Observer
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Start animation only once
          }
        },
        {
          threshold: 0.5, // Adjust this threshold as needed
        }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);
  
    const percentage = perc;
    const radius = gV.mq.matches ? 40 : 64;
    const circumference = 2 * Math.PI * radius;
  
    const { animatedValue } = useSpring({
      from: { animatedValue: 0 },
      animatedValue: isVisible ? percentage : 0,
      config: { duration: 2200 },
    });
  
    return (
      <div className="flex w-full justify-center" ref={ref}>
        <svg className="w-44">
          <circle
            className={bgTrans}
            strokeWidth="19"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <animated.circle
            className={bg}
            strokeWidth="19"
            strokeDasharray={circumference}
            strokeDashoffset={animatedValue.to(val => circumference - (val / 100) * circumference)}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <animated.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            className="text-2xl font-bold text-blue-600"
          >
            {animatedValue.to(val => `${Math.floor(val)}%`)}
          </animated.text>
        </svg>
      </div>
    );
  };
  

  
  
  const HorizontalBarChart = ({ perc, bg, bgTrans }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
  
    // Intersection Observer
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Animasyonu yalnızca bir kez başlat
          }
        },
        {
          threshold: 0.5, // Bu değeri ihtiyacınıza göre ayarlayın
        }
      );
  
      if (ref.current) {
        observer.observe(ref.current);
      }
  
      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }, []);
  
    const percentage = perc;
  
    const { width } = useSpring({
      from: { width: '0%' },
      to: { width: isVisible ? `${percentage}%` : '0%' },
      config: { duration: 1200 },
    });
  
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: isVisible ? percentage : 0 },
      config: { duration: 1200 },
    });
  
    return (
      <div
        ref={ref}
        className={`flex items-center h-10 w-full ${bgTrans} bg-gray-200 rounded-full overflow-hidden shadow-xl`}
      >
        <animated.div
          style={{ width }}
          className={` ${bg} h-full flex items-center justify-end pr-2 rounded-full`}
        >
          <animated.span className="text-white text-lg font-bold">
            {number.to(val => `${Math.floor(val)}%`)}
          </animated.span>
        </animated.div>
      </div>
    );
  };

  
    
  useEffect(() => {
     
    lottie.loadAnimation({
     container: logo.current,
     renderer: 'svg',
     loop: true,
     autoplay: true,
     animationData: require('./assets/anim7.json')
   })
   return () => { lottie.destroy() }
 },[])

  
  

   

   
 
    return (
      <>
     
       {!isOutside &&  <Navbar/> }
     
     { !isOutside && <Helmet>
   <title>Vocallyze - Why Audit Calls | Full Call Center Audit Coverage</title>
   <meta name="description" content="Discover why auditing every call with Vocallyze's compliance engine is essential for your call center's risk and quality." />
   <meta name="keywords" content="Vocallyze, call audit, call center compliance, call quality analytics, conversation intelligence, call center automation" />
   <meta property="og:title" content="Vocallyze - Why Audit Calls?" />
   <meta property="og:description" content="Learn why auditing every recorded call is critical and how Vocallyze's engine surfaces every violation with proof." />
   <meta property="og:image" content="https://vitamu.imgix.net/Why%20Second%20Opinion.png" />
   <meta property="og:url" content="https://medifyre.com/why-second-opinion" />
   <meta property="og:type" content="website" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
  </Helmet>}

   
      
      
      
   
     <section className={`font-product text-black ${!isOutside ? "py-0" : "py-[vh]"} pb-10  h-auto   lg:w-screen w-[100vw] self-center  rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center font-product`}>
      
       
       {/*  Header */}
       
        <div className={`flex flex-col gap-4 relative ${isOutside ? "py-10" : "py-32"}   lg:w-[100vw]  w-[100vw] px-7 items-center justify-center  z-10 `}>
         <img      
                 alt=''
                 className=" absolute w-[100%] rounded-sm h-full object-cover -z-10 "
                 src={vocallyzeBg}
               />
           
             <h1 data-aos-duration="600" data-aos="fade-up"  className='lg:text-[42px] text-[32px] self-center tracking-wide leading-[38px] text-center  text-black font-bold'>  Why Audit Calls</h1>
               <p data-aos-duration="600" data-aos="fade-up"  className="w-[90vw] lg:w-[70vw] text-center lg:text-base text-sm  text-black">
               Auditing every recorded call helps you catch violations and protect your customers before complaints happen.
               </p>
               
        </div>
       
        {/*  Main - Left & Right Side */}
        <div className='lg:flex lg:flex-row flex-col gap-16 w-full lg:text-start text-center  lg:px-28 px-8 '>

          {/* Left Side */}
          <div className='flex flex-col items-center justify-center lg:w-[50%] w-[100%] gap-5 '>
             <p data-aos-duration="600" data-aos="fade-up" className='lg:text-[40px] lg:leading-[51px] text-[25px] leading-10 '> <span className='text-second'> 3.4 billion </span> calls go unaudited every year.</p>
             <p data-aos-duration="600" data-aos="fade-up" className='lg:text-[40px] lg:leading-[51px] text-[25px] leading-10'> Of those calls,  <span className='text-second'> 4-5% </span> get manual quality review today.</p>
             <p data-aos-duration="600" data-aos="fade-up" className='lg:inline hidden text-[40px] leading-[51px] mt-20'> <span className='text-second'> 40% </span>  of total call volume qualifies for full autonomous resolution today.</p>
          
          </div>
           
           {/* Right Side */}
          <div className='flex flex-col lg:w-[50%] w-[100%]  lg:gap-16 gap-0 '>
             <div data-aos-duration="600" data-aos="fade-up" className='w-full lg:mt-0 mt-6' ref={logo} ></div>
             <p data-aos-duration="600" data-aos="fade-up" className='lg:hidden inline text-[25px] leading-10 mt-10'> <span className='text-second'> 40% </span>  of total call volume qualifies for full autonomous resolution today.</p>

             <div className='flex gap-1 w-full'>
                <div data-aos-duration="600" data-aos="fade-right" className='flex flex-col w-1/3  items-center justify-center lg:gap-4 gap-0 '>
                    <DonutChart perc={61} bg={"text-teal-600"} bgTrans={"text-teal-100"} />
                   <p className='font-bold text-sm '>MINOR VIOLATIONS</p>
                </div>
                <div data-aos-duration="600" data-aos="fade-up" className='flex flex-col w-1/3  items-center justify-center lg:gap-4 gap-0'>
                    <DonutChart perc={27} bg={"text-sky-800"} bgTrans={"text-sky-100"}/>
                   <p className='font-bold text-sm '>MAJOR VIOLATIONS</p>
                </div>
                <div data-aos-duration="600" data-aos="fade-left" className='flex flex-col w-1/3  items-center justify-center lg:gap-4 gap-0 '>
                    <DonutChart perc={12} bg={"text-violet-800"} bgTrans={"text-violet-100"}/>
                   <p className='font-bold text-sm '>CRITICAL VIOLATIONS</p>
                </div>



             </div>
          </div>


        </div>


        {/*  Bottom Horizantol Bars */}
        <div className='lg:flex lg:flex-row lg:gap-0 lg:mt-0 gap-5 mt-10    flex flex-col  w-full lg:px-28 px-8 justify-around items-center '>

            <div data-aos-duration="600" data-aos="fade-up" className='flex flex-col lg:w-1/4 w-full items-center justify-center  gap-4  '>
                <HorizontalBarChart perc={71} bg={"bg-teal-600"} bgTrans={"bg-teal-100"}/>
                <p className='font-bold text-sm text-center '>OF LEGAL COLLECTION CALLS REVEAL AT LEAST ONE COMPLIANCE GAP</p>
            </div>
       
            <div data-aos-duration="600" data-aos="fade-up" className='flex flex-col lg:w-1/4 w-full items-center justify-center gap-4  '>
                <HorizontalBarChart perc={54} bg={"bg-sky-800"} bgTrans={"bg-sky-100"}/>
                <p className='font-bold text-sm text-center '>OF E-COMMERCE SUPPORT CALLS RESULT IN A MISHANDLED REFUND OR RETURN REQUEST</p>
            </div>
       
            <div data-aos-duration="600" data-aos="fade-up" className='flex flex-col lg:w-1/4 w-full items-center justify-center gap-4  '>
                <HorizontalBarChart perc={87} bg={"bg-violet-800"} bgTrans={"bg-violet-100"} />
                <p className='font-bold text-sm text-center '>OF COLLECTIONS & LEGAL ENFORCEMENT CALLS RESULT IN A MORE ACCURATE RISK SCORE </p>
            </div>
       

        </div>
   
   
   
   
     
       
        </section>

        {!isOutside &&  <FooterGen/> }
        
      </>
     );
}

export default WhySecondOpinion



/* 
Seeking a second opinion for radiology has key advantages for patients and individuals in general. Here are some reasons why everyone should consider seeking a second opinion for radiological findings:
1.	Error Detection: Radiology is a complex field, and even the most experienced radiologists can make errors or miss subtle findings. Getting a second opinion can help detect potential diagnostic errors and ensure accuracy in the initial diagnosis.
2.	Confirmation of Diagnosis: A second opinion can provide confirmation of the initial diagnosis, offering peace of mind to patients and helping them make informed decisions about their treatment options.
3.	Exploration of Alternatives: Different radiologists may have varying interpretations of the same imaging data. Seeking a second opinion can help individuals explore alternative diagnoses or treatment options, which can be especially important in serious or complex medical cases.
4.	Avoiding Overdiagnosis and Overtreatment: Overdiagnosis can lead to unnecessary medical tests and treatments, which can be costly and carry potential risks. A second opinion can help prevent overdiagnosis and overtreatment by providing an independent assessment of the condition.
5.	Specialized Expertise: Radiologists often have specialized areas of expertise. Seeking a second opinion from a radiologist with specific knowledge in a particular field can provide valuable insights and ensure a comprehensive evaluation.
6.	Patient Empowerment: Seeking a second opinion empowers patients to take an active role in their healthcare. It encourages them to ask questions, seek clarification, and become more informed about their condition and treatment options.
7.	Medicolegal Considerations: In some cases, having a second opinion can provide a level of medicolegal protection for both patients and healthcare providers. It demonstrates due diligence and a commitment to ensuring the accuracy of the diagnosis.

At Medifyre.com, you can get a radiology second opinion by two U.S. board-certified radiologists. Super detailed reports delivered in 24 hours – starting at $20.

*/