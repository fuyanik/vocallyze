import React from 'react'
import "./splashPage.css"
import  { useEffect, useRef,useState } from 'react';
import lottie from 'lottie-web';
import { useNavigate } from "react-router-dom";

const SplashPage = () => {

    const water = useRef(null)

    useEffect(() => {

        lottie.loadAnimation({
          container: water.current,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          animationData: require("./water-anim3.json"),
    
        })
   
    
        return () => { lottie.destroy() }
    
      },[])
    

  return (
    <div  className='splash-page'>
      <div style={{width:"30vw"}} ref={water}></div> 
    </div>
  )
}

export default SplashPage