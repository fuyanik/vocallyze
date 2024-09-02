import React from 'react'
import Logos from '../3.Logos/logos'
import UserPanelMobileHero from '../../pages/UserPanel/UserPanelMobileHero'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const PanelHero = () => {

  AOS.init();
  return (
    <div data-aos-delay="700" data-aos-duration="1100" data-aos="fade-up"   className='w-screen h-auto     gap-2 flex flex-col justify-center items-center lg:-mt-[22rem] -mt-[13.4rem] '>
       
         <div className='bg-[#ffffff68]   sm:w-[82%] w-[93%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white w-[94%] h-[96%] rounded-lg sm:mt-6 mt-3 '>

             <div className='lg:hidden flex '>
              <UserPanelMobileHero/>
             </div>
             <img   src='https://vitamu.imgix.net/Screenshot%202024-09-02%20at%2017.20.05.png?w=2222&h=1376&ar=2222%3A1376&auto=compress' className='w-full lg:flex hidden h-full object-contain '/>
       
       
         </div>
        </div>
        <div className='md:flex hidden'> <Logos/> </div> 
    </div>
  )
}

export default PanelHero
