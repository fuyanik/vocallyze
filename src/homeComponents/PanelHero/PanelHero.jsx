import React from 'react'
import Logos from '../3.Logos/logos'
import UserPanelMobileHero from '../../pages/UserPanel/UserPanelMobileHero'

const PanelHero = () => {
  return (
    <div   className='w-screen h-auto  gap-8 flex flex-col justify-center items-center -mt-[23rem]'>
       
       
         <div className='bg-[#ffffff68]  sm:w-[82%] w-[94%] h-full rounded-lg flex justify-center items-center '>
       
         <div className='bg-white w-[95%] h-[96%] rounded-lg z'>

             <UserPanelMobileHero/>
       
       
         </div>
        </div>
        <div className='sm:flex hidden'> <Logos/> </div> 
    </div>
  )
}

export default PanelHero
