import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc, arrayUnion, updateDoc   } from "firebase/firestore"; 
import { db } from '../../firebase';

import { deleteDoc } from 'firebase/firestore';
import { useRef } from 'react';
import lottie from 'lottie-web';
import './style/paySucces.css'
import { getAnalytics, logEvent } from "firebase/analytics";
import gtag from 'ga-gtag';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const user =  auth.currentUser;

const PaySucces = () => {

  const auth = getAuth();
  const user =  auth.currentUser;


  

  const logo = useRef(null)
  const [count, setCount] = useState(6);

 
  const updatePay = async ()  => {

    const auth = getAuth();
    const user =  auth.currentUser;

     if (user) {
       //fetch firebase data firestore
       const userRef = doc(db, "Mitrua", `${user.email}`);
       const docSnap = await getDoc(userRef);
       const data = docSnap.data();

       const rechecks = data.Rechecks;

       console.log(data)

       const returnRecheckNumber = async () => {

        
          const lastIndex = rechecks.length - 1;

          rechecks[0].activeStep = 2;
          rechecks[0].isPay = true
        

          await updateDoc(userRef, { Rechecks: rechecks})


      }


       //Control user is have images or not for detect active step
       //...
       returnRecheckNumber();
   

      } 

      else {
       console.log("NO USER");
   
      }

  }
  const updatePay2 =  ()  => {

    const auth = getAuth();
    const user =  auth.currentUser;

     if (user) {
       //fetch firebase data firestore
       const userRef = doc(db, "Mitrua", `${user.email}`);
       const docSnap =  getDoc(userRef);
       const data = docSnap.data();

       const rechecks = data.Rechecks;

       console.log(data)

       const returnRecheckNumber =  () => {

        
          const lastIndex = rechecks.length - 1;

          rechecks[0].activeStep = 2;
          rechecks[0].isPay = true
        

           updateDoc(userRef, { Rechecks: rechecks})


      }


       //Control user is have images or not for detect active step
       //...
       returnRecheckNumber();
   

      } 

      else {
       console.log("NO USER");
   
      }

  }

   
  
  useEffect(() => {

        
    updatePay();
    updatePay2();



    const interval = setInterval(() => {
      updatePay();
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
     user ?   navigate("/user-panel")  :  navigate("/login") 
    }, 6000);


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