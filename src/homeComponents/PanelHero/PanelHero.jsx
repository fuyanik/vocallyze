import React from 'react'
import Logos from '../3.Logos/logos'

const PanelHero = () => {
  return (
    <div data-aos-delay="600" data-aos-duration="800" data-aos="fade-up"  className='w-screen h-[80vh]  gap-8 flex flex-col justify-center items-center -mt-60'>
       
       
         <div className='bg-[#ffffff68]  w-[82%] h-full rounded-lg flex justify-center items-center '>
         <div className='bg-white w-[98%] h-[96%] rounded-lg z'>

            <img src='https://vitamu.imgix.net/Screenshot%202024-08-23%20at%2014.50.56.png' className='w-full h-full object-contain '/>
       
       
         </div>
        </div>
        <Logos/>
    </div>
  )
}

export default PanelHero
