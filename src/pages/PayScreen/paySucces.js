import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';
import { getAuth } from 'firebase/auth';
import { deleteDoc } from 'firebase/firestore';
import { useRef } from 'react';
import lottie from 'lottie-web';
import './style/paySucces.css'
import { getAnalytics, logEvent } from "firebase/analytics";
import gtag from 'ga-gtag';



const PaySucces = () => {




  const logo = useRef(null)
  const [count, setCount] = useState(7);



 useEffect(() => {

 


 },[])
   
  
  useEffect(() => {

        
   
    const interval = setInterval(() => {
     
      setCount(count - 1);
    }, 1000);
   

    return () => clearInterval(interval);
  }, [count]);


  useEffect(() => {
     
     lottie.loadAnimation({
      container: logo.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      animationData: require('./assets/anim2.json')
    })
    return () => { lottie.destroy() }
  },[])

  
  let navigate = useNavigate();
  
     setTimeout(() => {
     true ?  navigate("/user-panel") : navigate("/pay-succes") 
    }, 7);

  return (
    
    <>
    
      
    <div className='pay-succes bg-sec'> 
            <p className='pay-succes__text'>Checkout</p>
            <p className='pay-succes__text2'>Thanks!</p>
            <p className='pay-succes__text3 relative bottom-8'>{count}</p>
       

        <div className='pay-succes__bottom'>
            <div className='pay-succes__bottom__animation' ref={logo} ></div>
            <p className='pay-succes__bottom__text'>We got your recheck request and payment.</p>
            <p className='pay-succes__bottom__text2'>You are now being directed to your user portal.</p>
        </div>

              
              
             
      
    </div>
    
    </>
  )
}

export default PaySucces