import React from 'react'
import Logos from '../3.Logos/logos'
import UserPanelMobileHero from '../../pages/UserPanel/UserPanelMobileHero'

const PanelHero = () => {
  return (
    <div   className='w-screen h-auto border    gap-2 flex flex-col justify-center items-center lg:-mt-[26rem] -mt-[9rem] '>
          
       
         <div className='bg-[#ffffff68]   sm:w-[82%] w-[94%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white w-[95%] h-[96%] rounded-lg sm:mt-6 mt-3 '>

             <div className='lg:hidden flex '>
              <UserPanelMobileHero/>
             </div>
             <img src='https://vitamu.imgix.net/Screenshot%202024-08-23%20at%2014.50.56.png' className='w-full lg:flex hidden h-full object-contain '/>
       
       
         </div>
        </div>
        <div className='md:flex hidden'> <Logos/> </div> 
    </div>
  )
}

export default PanelHero
