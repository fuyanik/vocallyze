import React, { useState } from 'react'
import { Link } from 'react-router-dom';


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
    <nav  className= {`flex fixed items-center justify-between  py-4 pl-2 pr-4 text-sm self-center w-[90vw]  ${ isScroll ? "sm:w-[630px]" : "sm:w-[580px]"} ${ isScroll ? "bg-white/60" : "bg-white/20"} h-[56px] shadow-sm  rounded-lg top-8 self-center   duration-700   border-t border-white z-40  backdrop-filter backdrop-blur-md  `}>
   
    
    <div className='flex items-center justify-center gap-4  '> 
    
   
        <Link to={"/"}> <img className='w-36' src='https://vitamu.imgix.net/MEDIFYRE-2.png?w=6000&h=3375&ar=6000%3A3375&auto=compress'/>  </Link> 
      
    
     <div className='w-[1px] h-7 bg-gray-500 opacity-25'></div>
    
     <div className='sm:flex hidden gap-7 justify-center items-center text-black '>
       <Link to={"/sample-reports"}>  <p className='cursor-pointer hover:opacity-60 duration-300'> Sample Reports</p> </Link> 
       <Link to={"/why-second-opinion"}><p className='cursor-pointer hover:opacity-60 duration-300'>About</p> </Link>
        <Link to={"/faq"}> <p className='cursor-pointer hover:opacity-60 duration-300'>Help</p>  </Link>
     </div>
    </div>
 
   <div className='flex items-center justify-center gap-4 text-black'>
   { !isScroll && <Link to={"/login"}>  <div className='items-center justify-center  bg-white hover:bg-second hover:text-white duration-500 rounded-lg px-4 py-[6px] cursor-pointer border border-primTrans'>Log in </div> </Link>}
   { isScroll && <Link to={"/login"}>  <div className='items-center justify-center cursor-pointer animate-rightToLeft hover:opacity-60 duration-300 border-b border-gray '>Log in</div> </Link>}
   { isScroll && <Link to={"/"}> <div className='items-center justify-center  bg-white hover:bg-second hover:text-white duration-500 rounded-lg px-4 py-[6px] cursor-pointer border border-primTrans animate-fadeIn'>Get Start</div> </Link>}
   </div>

    </nav>
  )
}

export default NavbarGen
