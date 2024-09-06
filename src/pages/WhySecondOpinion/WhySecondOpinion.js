import React, { useEffect, useRef, useState } from 'react'
import gV from '../../gV'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import Footer from '../../homeComponents/11.Footer/footer'
import MobileFooter from '../../homeComponents/22.MobileFooter/mobileFooter'
import BiRadsDropdown from '../../homeComponents/BiRadsDropdown/biRadsDropdown'
import PrimaryButton from '../../homeComponents/microComponents/primaryButton/primaryButton'
import NavbarGen from '../../homeComponents/NavbarGen/NavbarGen'
import { Helmet } from 'react-helmet'
import { useSpring, animated } from 'react-spring';
import lottie from 'lottie-web';

const WhySecondOpinion = ({isOutside = false}) => {

  const logo = useRef(null)

  window.scrollTo(0, 0);



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
    const radius = 64;
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
     
       {!isOutside &&  <NavbarGen/> }
     
     { !isOutside && <Helmet>
   <title>Medifyre - Why Second Opinion | Get Expert Medical Insights Online</title>
   <meta name="description" content="Discover why getting a second opinion from Medifyre's expert radiologists is essential for your medical decisions." />
   <meta name="keywords" content="Medifyre, second opinion, medical opinions, radiologist insights, medical second opinion, healthcare services online" />
   <meta property="og:title" content="Medifyre - Why Second Opinion?" />
   <meta property="og:description" content="Learn why seeking a second medical opinion is crucial and how Medifyre's experts can provide detailed insights." />
   <meta property="og:image" content="https://vitamu.imgix.net/Why%20Second%20Opinion.png" />
   <meta property="og:url" content="https://medifyre.com/why-second-opinion" />
   <meta property="og:type" content="website" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
</Helmet>}

   
      
      
      
   
     <section className={`font-product text-black ${!isOutside ? "py-0" : "py-[vh]"} pb-10  h-auto   lg:w-screen w-[100vw] self-center  rounded-md overflow-hidden   relative flex flex-col items-center gap-3 lg:gap-10 justify-center font-product`}>
      
       
       {/*  Header */}
       
        <div className={`flex flex-col gap-4 relative ${isOutside ? "py-10" : "py-32"}   lg:w-[100vw]  w-[100vw] px-7 items-center justify-center  z-10 `}>
         <img
                 className=" absolute w-[100%] rounded-sm h-full object-cover -z-10 "
                 src='https://vitamu.imgix.net/Ads%C4%B1z%20tasar%C4%B1m-10.png?w=6400&h=3371&rect=0%2C0%2C6400%2C3371&auto=compress" alt="groupPng'
               />
           
             <h1 data-aos-duration="600" data-aos="fade-up"  className='lg:text-[42px] text-[32px] self-center tracking-wide leading-[38px] text-center  text-black font-bold'>  Why Second Opinion</h1>
               <p data-aos-duration="600" data-aos="fade-up"  className="w-[90vw] lg:w-[70vw] text-center lg:text-base text-sm  text-black">
               Obtaining a second medical opinion helps you make confident decisions about your diagnosis and treatment. Medifyre's expert physicians provide you with the most accurate diagnosis and the best treatment options available.
               </p>
               
        </div>
       
        {/*  Main - Left & Right Side */}
        <div className='flex gap-16 w-full  px-28 '>

          {/* Left Side */}
          <div className='flex flex-col items-center justify-center w-[50%] gap-5 '>
             <p className='text-[40px] leading-[51px]'> <span className='text-second'> 12 million </span> patients are misdiagnosed every year.</p>
             <p className='text-[40px] leading-[51px]'> Of those misdiagnosed  <span className='text-second'> 10-20% </span> are patients with serious conditions.</p>
             <p className='text-[40px] leading-[51px] mt-20'> <span className='text-second'> 88% </span>  of second opinions result in a changed or refined diagnosis.</p>
          
          </div>
           
           {/* Right Side */}
          <div className='flex flex-col w-[50%]  gap-16 '>
            <img className='w-full hidden object-contain' src='https://www.docpanel.com/wp-content/uploads/12-million-patients-graphic.svg'/>
            <div className='w-full ' ref={logo} ></div>


             <div className='flex gap-1  w-full'>
                <div className='flex flex-col w-1/3 items-center justify-center gap-4 '>
                    <DonutChart perc={67} bg={"text-teal-600"} bgTrans={"text-teal-100"} />
                   <p className='font-bold text-sm '>REFINED DIAGNOSIS</p>
                </div>
                <div className='flex flex-col w-1/3 items-center justify-center gap-4 '>
                    <DonutChart perc={21} bg={"text-sky-800"} bgTrans={"text-sky-100"}/>
                   <p className='font-bold text-sm '>CHANGED DIAGNOSIS</p>
                </div>
                <div className='flex flex-col w-1/3 items-center justify-center gap-4 '>
                    <DonutChart perc={12} bg={"text-violet-800"} bgTrans={"text-violet-100"}/>
                   <p className='font-bold text-sm '>CONFIRMED DIAGNOSIS</p>
                </div>



             </div>
          </div>


        </div>

        {/*  Bottom Horizantol Bars */}
        <div className='flex   w-full px-28 justify-around items-center '>

            <div className='flex flex-col w-1/4 items-center justify-center  gap-4  '>
                <HorizontalBarChart perc={69} bg={"bg-teal-600"} bgTrans={"bg-teal-100"}/>
                <p className='font-bold text-sm text-center '>OF BODY MRI SECOND OPINIONS REVEAL AT LEAST ONE DISCREPANCY</p>
            </div>
       
            <div className='flex flex-col w-1/4 items-center justify-center gap-4  '>
                <HorizontalBarChart perc={51} bg={"bg-sky-800"} bgTrans={"bg-sky-100"}/>
                <p className='font-bold text-sm text-center '>OF BODY MRI SECOND OPINIONS REVEAL AT LEAST ONE DISCREPANCY</p>
            </div>
       
            <div className='flex flex-col w-1/4 items-center justify-center gap-4  '>
                <HorizontalBarChart perc={82} bg={"bg-violet-800"} bgTrans={"bg-violet-100"} />
                <p className='font-bold text-sm text-center '>OF BODY MRI SECOND OPINIONS REVEAL AT LEAST ONE DISCREPANCY</p>
            </div>
       

        </div>
   
   
   
   
     
       
        </section>
        
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