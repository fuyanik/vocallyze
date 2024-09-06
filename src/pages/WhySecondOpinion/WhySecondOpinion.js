import React, { useState } from 'react'
import gV from '../../gV'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import Footer from '../../homeComponents/11.Footer/footer'
import MobileFooter from '../../homeComponents/22.MobileFooter/mobileFooter'
import BiRadsDropdown from '../../homeComponents/BiRadsDropdown/biRadsDropdown'
import PrimaryButton from '../../homeComponents/microComponents/primaryButton/primaryButton'
import NavbarGen from '../../homeComponents/NavbarGen/NavbarGen'
import { Helmet } from 'react-helmet'
import { useSpring, animated } from 'react-spring';
//asd

const WhySecondOpinion = () => {

  const DonutChart = () => {
    const percentage = 67;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
  
    const { animatedValue } = useSpring({
      from: { animatedValue: 0 },
      animatedValue: percentage,
      config: { duration: 1500 },
    });
  
    return (
      <div className="flex justify-center ">
        <svg className="w-32 h-32">
          <circle
            className="text-gray-300"
            strokeWidth="10"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <animated.circle
            className="text-blue-600"
            strokeWidth="10"
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
  
  const HorizontalBarChart = () => {
    const percentage = 67;
  
    const { width } = useSpring({
      from: { width: '0%' },
      to: { width: `${percentage}%` },
      config: { duration: 1500 },
    });
  
    const { number } = useSpring({
      from: { number: 0 },
      to: { number: percentage },
      config: { duration: 1500 },
    });
  
    return (
      <div className="flex items-center h-10 w-60 bg-gray-200 rounded-full overflow-hidden shadow-xl" >
        <animated.div
          style={{ width }}
          className="bg-blue-600 h-full flex items-center justify-end pr-2 rounded-full"
        >
          <animated.span className="text-white text-lg font-bold">
            {number.to(val => `${Math.floor(val)}%`)}
          </animated.span>
        </animated.div>
      </div>
    );
  };
  
  

   

    window.scrollTo(0, 0);
 
  return (
    <>
 <NavbarGen />
   <Helmet>
        <title>Medifyre - Why Get a Second Opinion? </title>
        <meta
          name="description"
          content="Discover the benefits of seeking a second opinion in radiology. Ensure accuracy, explore alternatives, avoid overdiagnosis, and empower yourself with Medifyre."
        />
        <meta
          name="keywords"
          content="second opinion, radiology second opinion, medical imaging, diagnostic accuracy, Medifyre, patient empowerment, healthcare decisions"
        />
        <meta property="og:title" content="Why Get a Second Opinion? - Medifyre" />
        <meta
          property="og:description"
          content="Learn why a second opinion is crucial in radiology for accurate diagnosis, alternative options, and patient empowerment."
        />
        <meta property="og:image" content="%PUBLIC_URL%/path/to/your-image.png" />
        <meta property="og:url" content="https://medifyre.com/why-second-opinion" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Why Get a Second Opinion? - Medifyre" />
        <meta
          name="twitter:description"
          content="Find out the advantages of getting a second opinion in radiology with Medifyre. Ensure accurate diagnosis and explore all your options."
        />
        <meta name="twitter:image" content="%PUBLIC_URL%/path/to/your-image.png" />
      </Helmet>

      <div className=' flex flex-col font-product lg:w-[100%] py-40 w-full gap-10 items-center  '>

       <DonutChart/>
       <HorizontalBarChart/>
      </div>

     
     
    
    </>
  )
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