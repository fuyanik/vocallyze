import React, { useState } from 'react'
import gV from '../../gV'
import Navbar from '../../homeComponents/1.Navbar/navbar'
import Footer from '../../homeComponents/11.Footer/footer'
import MobileFooter from '../../homeComponents/22.MobileFooter/mobileFooter'
import BiRadsDropdown from '../../homeComponents/BiRadsDropdown/biRadsDropdown'
import PrimaryButton from '../../homeComponents/microComponents/primaryButton/primaryButton'

const WhySecondOpinion = () => {

    const [isHover, setIsHover] = useState(false)

    window.scrollTo(0, 0);
 
  return (
    <>

<Navbar
      mobileMenuText={"Menu"}
      mobileMenuTo={"/mobileNavMenu"}
      />

      <div className='lg:px-28 lg:pt-28 px-2 mt-14 flex flex-col font-product lg:w-[100%] w-full gap-10 items-center  '>

        <div className='flex flex-col gap-2 bg-gray-100 items-center justify-center p-10 rounded-md w-full'>
            <h1 className='text-[42px] font-bold'>Why Second Opinion ?</h1>
        </div>


        <div className='flex flex-col pl-4 lg:w-[70%] w-full  text-[17px] text-[#000000ad] '>

        <p className='0   px-6 py-4 '>Seeking a second opinion for radiology has key advantages for patients and individuals in general. Here are some reasons why everyone should consider seeking a second opinion for radiological findings:</p>
            

            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4  '>
                <p className='text-[20px] font-bold'>  Error Detection:</p>
                <p>  Radiology is a complex field, and even the most experienced radiologists can make errors or miss subtle findings. Getting a second opinion can help detect potential diagnostic errors and ensure accuracy in the initial diagnosis.</p>
            </div>

            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'>  Confirmation of Diagnosis:</p>
                <p>  A second opinion can provide confirmation of the initial diagnosis, offering peace of mind to patients and helping them make informed decisions about their treatment options.</p>
            </div>
           
            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'>Exploration of Alternatives: </p>
                <p>Different radiologists may have varying interpretations of the same imaging data. Seeking a second opinion can help individuals explore alternative diagnoses or treatment options, which can be especially important in serious or complex medical cases.</p>
            </div>
           
            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'>Avoiding Overdiagnosis and Overtreatment: </p>
                <p> Overdiagnosis can lead to unnecessary medical tests and treatments, which can be costly and carry potential risks. A second opinion can help prevent overdiagnosis and overtreatment by providing an independent assessment of the condition.</p>
            </div>

            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'>Specialized Expertise: </p>
                <p> Radiologists often have specialized areas of expertise. Seeking a second opinion from a radiologist with specific knowledge in a particular field can provide valuable insights and ensure a comprehensive evaluation.</p>
            </div>
           
            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'> Patient Empowerment:</p>
                <p>Seeking a second opinion empowers patients to take an active role in their healthcare. It encourages them to ask questions, seek clarification, and become more informed about their condition and treatment options.</p>
            </div>
           
            <div className='flex flex-col gap-2 rounded-lg  px-6 py-4 '>
                <p className='text-[20px] font-bold'> Medicolegal Considerations:  </p>
                <p> In some cases, having a second opinion can provide a level of medicolegal protection for both patients and healthcare providers. It demonstrates due diligence and a commitment to ensuring the accuracy of the diagnosis.</p>
            </div>

           
            <div className='flex flex-col gap-2 rounded-lg relative  px-6 py-4 '> 
             At Mitrua.com,  Super detailed reports delivered in 24 hours – starting at $20. 
              </div>


            <div className='flex flex-col gap-2 rounded-lg relative  px-6 py-4 '>

            {isHover && (
          <BiRadsDropdown
             top={gV.mq.matches ? "-200%" : "-90%"}
             left={gV.mq.matches ? "-0%" : "00%"}

          
             onMouseLeave={() => setIsHover(false)}
           
          />
        )}

        <PrimaryButton  onMouse={() => setIsHover(true)} />
            </div>


           
      
           
           
           



        </div>




      
      </div>

       { gV.mq.matches ? <MobileFooter/> : <Footer/> }
    
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

At Mitrua.com, you can get a radiology second opinion by two U.S. board-certified radiologists. Super detailed reports delivered in 24 hours – starting at $20.

*/