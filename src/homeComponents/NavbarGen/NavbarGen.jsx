import React, { useState } from 'react'


const NavbarGen = () => {

    const [isScroll, setIsScroll] = useState(false);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
    });


    

  return (
    <nav  className= {`flex fixed items-center justify-between  py-4 pl-2 pr-4 text-sm ${ isScroll ? "w-[630px]" : "w-[580px]"} ${ isScroll ? "bg-white/60" : "bg-white/20"} h-[56px] shadow-sm  rounded-lg top-8 self-center   duration-700   border-t border-white z-40  backdrop-filter backdrop-blur-md  `}>
   
    
    <div className='flex items-center justify-center gap-4  '> 
    
   
         <img className='w-36' src='https://vitamu.imgix.net/MEDIFYRE-2.png'/> 
      
    
     <div className='w-[1px] h-7 bg-gray-500 opacity-25'></div>
    
     <div className='flex gap-7 justify-center items-center text-black '>
        <p className='cursor-pointer hover:opacity-60 duration-300'> Sample Reports</p>
        <p className='cursor-pointer hover:opacity-60 duration-300'>About</p>
        <p className='cursor-pointer hover:opacity-60 duration-300'>Help</p>
     </div>
    </div>
 
   <div className='flex items-center justify-center gap-4 text-black'>
   { !isScroll && <div className='items-center justify-center  bg-white hover:bg-second hover:text-white duration-500 rounded-lg px-4 py-[6px] cursor-pointer border border-primTrans'>Log in </div>}
   { isScroll && <div className='items-center justify-center cursor-pointer animate-rightToLeft hover:opacity-60 duration-300 border-b border-gray '>Log in</div>}
   { isScroll && <div className='items-center justify-center  bg-white hover:bg-second hover:text-white duration-500 rounded-lg px-4 py-[6px] cursor-pointer border border-primTrans animate-fadeIn'>Get Start</div>}
   </div>

    </nav>
  )
}

export default NavbarGen
